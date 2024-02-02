import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import ItemCard from './ItemCard';
import { getDatabase } from '../DatabaseUtils/OpenDatabase';
import { useEffect, useState } from 'react';
import { BaseItemProps } from '../__utils__/interfaces/BaseItemProps';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsCategoryViewLoading,
  selectIsEditComponent,
  selectProduct,
} from '../../redux/GlobalStateRedux/GlobalStateSelectors';
import {
  setIsCategoryViewProductLoading,
  setIsEditButton,
} from '../../redux/GlobalStateRedux/GlobalStateSlice';

interface CategoryViewContentsProps {
  id: number;
  name: string;
  type: string;
}

export default function CategoryViewContents(data: CategoryViewContentsProps) {
  const db = getDatabase();

  const dispatch = useDispatch();

  const actionState = useSelector(selectProduct);
  const isEditButton = useSelector(selectIsEditComponent);

  const isLoading = useSelector(selectIsCategoryViewLoading);

  const [products, setProducts] = useState<BaseItemProps[]>([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT item.id, item.name, item.price, item.image,
                 category.name AS 'category'
                 FROM item
                 LEFT JOIN category ON item.category_id = category.id
                 WHERE category.id = ?
                 ORDER BY item.name ASC`,
        [data.id],
        (_, result) => {
          setProducts(result.rows._array);
          dispatch(setIsCategoryViewProductLoading(false));
        },
      );
    });
  }, [actionState]);

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
              {data.name}
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
              id: data.id,
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
