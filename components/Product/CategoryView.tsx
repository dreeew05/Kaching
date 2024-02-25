import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import {
  deleteData,
  selectData,
} from '../DatabaseUtils/CoreFunctions';
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
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
} from '@expo/vector-icons';
import {
  setIsCategoryViewProductLoading,
  setIsEditButton,
} from '../../redux/GlobalStateRedux/GlobalStateSlice';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomModal from '../Modals/CustomModal';
import { PopUpModal } from '../Modals/PopUpModal';

export default function CategoryView() {
  const param = useLocalSearchParams();
  const categoryID: number = ParamsToInteger(param.id);
  const [categoryName, setCategoryName] = useState<string>('');
  const db = SQLite.openDatabase('kaching_db.db');
  const isLoading = useSelector(selectIsCategoryViewLoading);
  const isEditButton = useSelector(selectIsEditComponent);
  const productDataModifiedActions = useSelector(
    selectProductModifiedActions,
  );
  const dispatch = useDispatch();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteFailedModalVisible, setDeleteFailedModalVisible] =
    useState(false);
  const [deleteSuccessModalVisible, setDeleteSuccessModalVisible] =
    useState(false);

  const getCategoryName = () => {
    const tableName = 'category',
      column = ['name'],
      targetAttrib = 'id',
      targetValue = categoryID;

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

  // Todo: Interface database
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
        [categoryID],
      );
      setProducts(result.rows as BaseItemProps[]);
      dispatch(setIsCategoryViewProductLoading(false));
    }, readOnly);
  };

  const deleteAllProducts = () => {
    // Delete Items from database
    // Reset checkedItems
    setDeleteModalVisible(false);
    if (checkedItems.length > 0) {
      const tableName: string = 'item';
      const refAttribute: string = 'id';

      checkedItems.forEach((id) => {
        deleteData(tableName, refAttribute, id).then((_) => {});
      });

      setCheckedItems([]);
      setDeleteSuccessModalVisible(true);
    } else {
      // Throw error message
      setDeleteFailedModalVisible(true);
    }
  };

  useEffect(() => {
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
            <View className="flex-row flex-1">
              <Text
                className="text-4xl text-green ml-5 mb-5"
                style={{ fontFamily: 'Poppins-Bold' }}
              >
                {categoryName}
              </Text>
              {showModifyProductsComponent()}
            </View>
          </View>
          <ScrollView className="p-2 mb-32">
            {products.map((product) => {
              return (
                <ItemCard
                  key={product.id}
                  item={product}
                  isEditComponent={isEditButton}
                  categoryID={categoryID}
                  checkedItems={checkedItems}
                  setCurrentCheckedItems={setCheckedItems}
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
        <>
          <Pressable
            className="ml-3 flex-1"
            onPress={() => dispatch(setIsEditButton(false))}
          >
            <FontAwesome5 name="edit" size={25} color="darkgreen" />
          </Pressable>
          <View
            className="mr-5 bg-green h-8 items-center 
              justify-center rounded-full h-10"
            style={{ marginTop: -8 }}
          >
            <TouchableOpacity
            // Todo: Add onPress event
            // onPress={}
            >
              <Text
                className="px-5"
                style={{
                  color: 'white',
                  fontFamily: 'Poppins-Bold',
                }}
              >
                Add all
              </Text>
            </TouchableOpacity>
          </View>
        </>
      );
    } else {
      return (
        <>
          <Link
            href={{
              pathname: '/(tabs)/addItemWrapper',
              params: {
                id: 0,
                category_id: categoryID,
              },
            }}
            asChild
          >
            <Pressable
              className="ml-3 flex-1"
              onPress={() => dispatch(setIsEditButton(true))}
            >
              <AntDesign
                name="pluscircle"
                size={30}
                color="#18573a"
              />
            </Pressable>
          </Link>
          {products.length > 0 ? (
            <View className="mr-6">
              <TouchableOpacity
                // Todo: Add onPress event
                onPress={() => setDeleteModalVisible(true)}
              >
                <FontAwesome5 name="trash" size={25} color="red" />
              </TouchableOpacity>
            </View>
          ) : null}
        </>
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

      {/* MODALS */}
      <CustomModal
        visible={deleteModalVisible}
        message="Are you sure you want to delete the selected items?"
        optionOneText="Delete"
        optionTwoText="Cancel"
        optionOnePressed={() => deleteAllProducts()}
        optionTwoPressed={() => setDeleteModalVisible(false)}
        optionOneColor="red"
        optionTwoColor="blue"
        closeModal={() => setDeleteModalVisible(false)}
      />
      <PopUpModal
        visible={deleteFailedModalVisible}
        message="Please select item/s to delete"
        text={'Dismiss'}
        link={null}
        id={0}
        color="red"
        closeModal={() => setDeleteFailedModalVisible(false)}
      />
      <PopUpModal
        visible={deleteSuccessModalVisible}
        message="Item/s deleted successfully"
        text={'Done'}
        link={'dispatchProduct'}
        id={0}
        color="green"
        closeModal={() => setDeleteSuccessModalVisible(false)}
      />
    </>
  );
}
