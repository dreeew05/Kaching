import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { selectData } from '../DatabaseUtils/CoreFunctions';
import { BaseItemProps } from '../__utils__/interfaces/BaseItemProps';
import { Link, useLocalSearchParams } from 'expo-router';
import ParamsToInteger from '../__utils__/helper/ParamsToInteger';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsCategoryViewLoading,
  selectIsEditComponent,
  selectProductModifiedActions,
} from '../../redux/GlobalStateRedux/GlobalStateSelectors';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import ItemCard from './ItemCard';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import {
  setIsCategoryViewProductLoading,
  setIsEditButton,
} from '../../redux/GlobalStateRedux/GlobalStateSlice';

export default function CategoryView() {
  const param = useLocalSearchParams();
  const id: number = ParamsToInteger(param.id);
  const [categoryName, setCategoryName] = useState<string>('');
  const db = SQLite.openDatabase('kaching_db.db');
  const isLoading = useSelector(selectIsCategoryViewLoading);
  const isEditButton = useSelector(selectIsEditComponent);
  const productDataModifiedActions = useSelector(
    selectProductModifiedActions,
  );
  const dispatch = useDispatch();

  const getCategoryName = () => {
    const tableName = 'category',
      column = ['name'],
      targetAttrib = 'id',
      targetValue = id;

    selectData(tableName, column, targetAttrib, targetValue)
      .then((result) => {
        setCategoryName(result[0].name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Product Data Setter
  const [products, setProducts] = useState<BaseItemProps[]>([]);

  const getProductData = async () => {
    const readOnly = true;
    await db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync(
        `SELECT item.id, item.name, item.price, item.image,
        category.name AS 'category'
        FROM item
        LEFT JOIN category ON item.category_id = category.id
        WHERE category.id = ?
        ORDER BY item.name ASC`,
        [id],
      );
      setProducts(result.rows as BaseItemProps[]);
      dispatch(setIsCategoryViewProductLoading(false));
    }, readOnly);
  };

  useEffect(() => {
    console.log(param);
    console.log(productDataModifiedActions);
    getCategoryName();
    getProductData();
  }, [param, productDataModifiedActions]);

  const showOverallComponent = () => {
    if (isLoading) {
      return (
        <View
          style={{
            marginTop: 350,
          }}
        >
          <ActivityIndicator size={75} color="green" />
        </View>
      );
    } else {
      return (
        <View>
          {/* {showModifyProductHeader()} */}
          <View className="flex flex-row mt-2">
            <Text
              className="text-4xl text-green ml-5 mb-5"
              style={{ fontFamily: 'Poppins-Bold' }}
            >
              {categoryName}
            </Text>
            {showModifyProductsComponent()}
          </View>
          <ScrollView className="p-2 mb-32">
            {products.map((product) => {
              return (
                <ItemCard
                  key={product.id}
                  item={product}
                  isEditComponent={isEditButton}
                />
              );
            })}
          </ScrollView>
        </View>
      );
    }
  };

  const showModifyProductsComponent = () => {
    if (isEditButton && products.length > 0) {
      return (
        <Pressable
          className="ml-3"
          onPress={() => dispatch(setIsEditButton(false))}
        >
          <FontAwesome5 name="edit" size={25} color="darkgreen" />
        </Pressable>
      );
    } else if (!isEditButton || products.length == 0) {
      return (
        <Link
          href={{
            pathname: '/(tabs)/AddItemScreen',
            params: {
              id: ParamsToInteger(param.id),
            },
          }}
          asChild
        >
          <Pressable
            className="ml-3"
            onPress={() => dispatch(setIsEditButton(true))}
          >
            <FontAwesome5 name="plus" size={25} color="darkgreen" />
          </Pressable>
        </Link>
      );
    }
  };

  const headerEventHandler = () => {
    if (isEditButton) {
      return (
        <Link
          href={{
            pathname: '/',
          }}
          asChild
        >
          <Pressable className="ml-3">
            <Ionicons name="chevron-back" size={30} color="green" />
          </Pressable>
        </Link>
      );
    } else {
      {
        return (
          <Pressable
            className="ml-3"
            onPress={() => dispatch(setIsEditButton(true))}
          >
            <Ionicons name="chevron-back" size={30} color="green" />
          </Pressable>
        );
      }
    }
  };

  return (
    <>
      {/* Header [START] */}
      <View style={{ marginTop: 60 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          {headerEventHandler()}
        </View>
      </View>
      {/* Header [END]*/}

      <View className="flex-1 self-stretch">
        <View>{showOverallComponent()}</View>
      </View>
    </>
  );
}
