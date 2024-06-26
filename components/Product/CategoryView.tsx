import { AddToCartModals } from './AddToCartModals';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Link, useLocalSearchParams } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
} from '../../redux/CartRedux/CartSlice';
import {
  selectIsCategoryViewLoading,
  selectProductModifiedActions,
} from '../../redux/GlobalStateRedux/GlobalStateSelectors';
import { setIsCategoryViewProductLoading } from '../../redux/GlobalStateRedux/GlobalStateSlice';
import {
  selectData,
  softDeleteData,
} from '../DatabaseUtils/CoreFunctions';
import CustomModal from '../Modals/CustomModal';
import { PopUpModal } from '../Modals/PopUpModal';
import ParamsToInteger from '../__utils__/helper/ParamsToInteger';
import { BaseItemProps } from '../__utils__/interfaces/BaseItemProps';
import { CartItemProps } from '../__utils__/interfaces/CartItemProps';
import ItemCard from './ItemCard';
import ItemClickable from './ItemClickable';
import { selectHasStartDay } from '../../redux/GlobalStateRedux/GlobalStateSelectors';
import { getStartDayStatus } from '../DatabaseUtils/FetchInstructions/GetStartDayStatus';

export default function CategoryView() {
  const param = useLocalSearchParams();
  const categoryID: number = ParamsToInteger(param.id);
  const isEditComponent = param.isEditComponent;
  const [categoryName, setCategoryName] = useState<string>('');
  const db = SQLite.openDatabase('kaching_db.db');
  const isLoading = useSelector(selectIsCategoryViewLoading);

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
  const [addModalVisble, setAddModalVisible] = useState(false);
  const [addFailedModalVisible, setAddFailedModalVisible] =
    useState(false);
  const [isAddAllPressed, setIsAddAllPressed] = useState(false);
  const [temporaryCart, setTemporaryCart] = useState<CartItemProps[]>(
    [],
  );
  const hasStartDay = getStartDayStatus();
  const [addNeedStartDayModal, setNeedStartDayModal] =
    useState(false);

  // Unused [When this shit gets fucked up used this redux shit!!!]
  // const isEditButton = useSelector(selectIsEditComponent);

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
  const [outOfStockProducts, setOutOfStockProducts] = useState<
    BaseItemProps[]
  >([]);

  const [quantity, setQuantity] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddQuantityModal, setShowAddQuantityModal] =
    useState(false);
  const [showItemInCartModal, setShowItemInCartModal] =
    useState(false);
  const [isNotChecked, setIsNotChecked] = useState(false);

  // Todo: Interface database
  const getProductData = async () => {
    const readOnly = true;
    await db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync(
        `SELECT item.id, item.name, item.price, item.image,
        category.name AS 'category'
        FROM item
        INNER JOIN category ON item.category_id = category.id
        WHERE category.id = ? AND item.is_available = 1 AND item.is_deleted = 0
        ORDER BY item.name ASC`,
        [categoryID],
      );
      setProducts(result.rows as BaseItemProps[]);
      // Uncomment if needed
      // dispatch(setIsCategoryViewProductLoading(false));
    }, readOnly);
  };

  // Todo: Interface database
  // Out of Stock Product
  const getOutOfStockProductData = async () => {
    const readOnly = true;
    await db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync(
        `SELECT item.id, item.name, item.price, item.image,
        category.name AS 'category'
        FROM item
        INNER JOIN category ON item.category_id = category.id
        WHERE category.id = ? AND item.is_available = 0 AND item.is_deleted = 0
        ORDER BY item.name ASC`,
        [categoryID],
      );
      setOutOfStockProducts(result.rows as BaseItemProps[]);
      dispatch(setIsCategoryViewProductLoading(false));
    }, readOnly);
  };

  const deleteAllProducts = () => {
    // soft delete Items from database
    // Reset checkedItems

    setDeleteModalVisible(false);

    if (checkedItems.length > 0) {
      const tableName: string = 'item';
      const refAttribute: string = 'id';

      checkedItems.forEach((id) => {
        softDeleteData(tableName, refAttribute, id).then((_) => {});
        dispatch(removeFromCart(id));
      });

      setCheckedItems([]);
      setDeleteSuccessModalVisible(true);
    } else {
      // Throw error message
      setDeleteFailedModalVisible(true);
    }
  };

  const checkAddedProducts = () => {
    temporaryCart.length > 0
      ? addAllProducts()
      : setAddFailedModalVisible(true);
  };

  const addAllProducts = () => {
    if (!hasStartDay) {
      setNeedStartDayModal(true);
      return;
    }

    temporaryCart.forEach((item) => {
      dispatch(
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          category: item.category,
        }),
      );
    });
    clearTemporaryCart();
    setAddModalVisible(true);
    setIsAddAllPressed(true);
  };

  const clearTemporaryCart = () => {
    setTemporaryCart([]);
  };

  useEffect(() => {
    getCategoryName();
    getProductData();
    getOutOfStockProductData();
  }, [param, productDataModifiedActions]);

  const showOverallComponent = () => {
    if (isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size={75} color="green" />
        </View>
      );
    } else {
      return (
        <View className="bg-white flex flex-1">
          {/* {showModifyProductHeader()} */}
          <View className="flex flex-row mb-3 mt-2 items-center">
            <View className="flex-1 ">
              <Text
                numberOfLines={1}
                // to fit the text in the container
                adjustsFontSizeToFit
                className="text-green ml-3 text-4xl p-2 font-bold"
                style={{ fontFamily: 'Poppins-Bold' }}
              >
                {categoryName}
              </Text>
            </View>
            {showModifyProductsComponent()}
          </View>
          {products.length === 0 &&
          outOfStockProducts.length === 0 ? (
            <View className="flex-1  w-5/6 justify-center items-center self-center">
              <Text className="text-gray text-base text-center">
                No products available in this category.
              </Text>
              <Text className="text-gray text-sm mt-2">
                Tap the '+' button to add a new product.
              </Text>
            </View>
          ) : (
            <ScrollView className="p-2">
              {products.map((product) => {
                return (
                  <ItemCard
                    key={product.id}
                    item={product}
                    isEditComponent={
                      isEditComponent == 'true' ? true : false
                    }
                    categoryID={categoryID}
                    checkedItems={checkedItems}
                    setCurrentCheckedItems={setCheckedItems}
                    tempCart={temporaryCart}
                    setTempCart={setTemporaryCart}
                    isAddAllPressed={isAddAllPressed}
                    setIsAddAllPressed={setIsAddAllPressed}
                  />
                );
              })}
              {/* Divider */}
              {outOfStockProducts.length > 0 &&
                products.length > 0 && (
                  <View
                    style={{
                      borderTopWidth: 4,
                      borderTopColor: 'lightgray',
                      marginVertical: 10,
                    }}
                  />
                )}
              {outOfStockProducts.length > 0 ? (
                <>
                  <View className="items-center mb-3">
                    <Text
                      className="text-black ml-3 text-2xl p-2 font-bold"
                      style={{ fontFamily: 'Poppins-Bold' }}
                    >
                      Out of Stock
                    </Text>
                  </View>
                  <View className="ml-3 mr-3 mb-5 flex">
                    {outOfStockProducts.map((product) => {
                      return (
                        <ItemClickable
                          key={product.id}
                          id={product.id}
                          category_id={categoryID}
                          image={product.image}
                          name={product.name}
                          price={product.price}
                          isEditComponent={
                            isEditComponent == 'true' ? true : false
                          }
                          checkedItems={checkedItems}
                          setCurrentCheckedItems={setCheckedItems}
                        />
                      );
                    })}
                  </View>
                </>
              ) : null}
            </ScrollView>
          )}
        </View>
      );
    }
  };

  const showModifyProductsComponent = () => {
    if (isEditComponent == 'true' && products.length > 0) {
      return (
        <>
          {/* <Pressable
            className="mr-3 "
            onPress={() => dispatch(setIsEditButton(false))}
          >
            <FontAwesome5 name="edit" size={25} color="darkgreen" />
          </Pressable> */}
          <Link
            href={{
              pathname: '/(tabs)/categoryView',
              params: {
                id: categoryID,
                isEditComponent: 'false',
              },
            }}
            asChild
          >
            <Pressable className="mr-3">
              <FontAwesome5 name="edit" size={25} color="darkgreen" />
            </Pressable>
          </Link>
          <View
            className="mr-5 bg-green items-center
              justify-center rounded-full h-10"
          >
            <TouchableOpacity onPress={() => checkAddedProducts()}>
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
              className="mr-10"
              // onPress={() => dispatch(setIsEditButton(true))}
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

  // Unused
  // const headerEventHandler = () => {
  //   if (isEditComponent == 'true') {
  //     return (
  //       <Link
  //         href={{
  //           pathname: '/',
  //         }}
  //         asChild
  //       >
  //         <Pressable className="ml-3">
  //           <Ionicons name="chevron-back" size={30} color="green" />
  //         </Pressable>
  //       </Link>
  //     );
  //   } else {
  //     {
  //       return (
  //         // <Pressable
  //         //   className="ml-3"
  //         //   onPress={() => dispatch(setIsEditButton(true))}
  //         // >
  //         //   <Ionicons name="chevron-back" size={30} color="green" />
  //         // </Pressable>
  //         <Link
  //           href={{
  //             pathname: '/(tabs)/categoryView',
  //             params: {
  //               id: categoryID,
  //               isEditComponent: 'true',
  //             },
  //           }}
  //           asChild
  //         >
  //           <Pressable className="ml-3">
  //             <Ionicons name="chevron-back" size={30} color="green" />
  //           </Pressable>
  //         </Link>
  //       );
  //     }
  //   }
  // };

  return (
    <>
      {/* Header [START] */}
      {/* <View style={{ marginTop: '7.5%' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {headerEventHandler()}
        </View>
      </View> */}
      {/* Header [END]*/}

      {showOverallComponent()}

      {/* MODALS */}
      <CustomModal
        visible={deleteModalVisible}
        message="Are you sure you want to remove the selected items?"
        optionOneText="Remove"
        optionTwoText="Cancel"
        optionOnePressed={() => deleteAllProducts()}
        optionTwoPressed={() => setDeleteModalVisible(false)}
        optionOneColor="red"
        optionTwoColor="blue"
        closeModal={() => setDeleteModalVisible(false)}
      />
      <PopUpModal
        visible={deleteFailedModalVisible}
        message="Please select item/s to remove"
        text={'Dismiss'}
        link={null}
        id={0}
        color="red"
        closeModal={() => setDeleteFailedModalVisible(false)}
      />
      <PopUpModal
        visible={deleteSuccessModalVisible}
        message="Item/s removed successfully"
        text={'Done'}
        link={'dispatchProduct'}
        id={0}
        color="green"
        closeModal={() => setDeleteSuccessModalVisible(false)}
      />
      <PopUpModal
        visible={addModalVisble}
        message="Item/s added to cart successfully"
        text={'Done'}
        link={null}
        id={0}
        color="green"
        closeModal={() => setAddModalVisible(false)}
      />
      <PopUpModal
        visible={addFailedModalVisible}
        message="Please input quantity for item/s to add"
        text={'Dismiss'}
        link={null}
        id={0}
        color="red"
        closeModal={() => setAddFailedModalVisible(false)}
      />
      <PopUpModal
        visible={addNeedStartDayModal}
        message="Please tap on Start Day in home page."
        text={'Dismiss'}
        link={null}
        id={0}
        color="red"
        closeModal={() => setNeedStartDayModal(false)}
      />
    </>
  );
}
