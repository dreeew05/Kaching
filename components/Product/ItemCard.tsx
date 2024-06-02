import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  setIsEditButton,
  setIsModifyProductLoading,
} from '../../redux/GlobalStateRedux/GlobalStateSlice';
import Stepper from '../Common/Stepper';
import { BaseItemProps } from '../__utils__/interfaces/BaseItemProps';
import { CartItemProps } from '../__utils__/interfaces/CartItemProps';
import { addToCartEvent } from './AddToCartEvent';
import { AddToCartModals } from './AddToCartModals';
import ItemClickable from './ItemClickable';

import { useSelector } from 'react-redux';
import { selectHasStartDay } from '../../redux/GlobalStateRedux/GlobalStateSelectors';
import { getStartDayStatus } from '../DatabaseUtils/FetchInstructions/GetStartDayStatus';

// Unused imports
// import { deleteData } from '../DatabaseUtils/CoreFunctions';
// import CustomModal from '../Modals/CustomModal';
// import { PopUpModal } from '../Modals/PopUpModal';
// import { selectCartItem } from '../../redux/CartRedux/CartSelectors';

type itemCardProps = {
  item: BaseItemProps;
  isEditComponent: boolean;
  categoryID: number;
  checkedItems: number[];
  setCurrentCheckedItems: (checkedItems: number[]) => void;
  tempCart: CartItemProps[];
  setTempCart: (tempCart: CartItemProps[]) => void;
  isAddAllPressed: boolean;
  setIsAddAllPressed: (isAddAllPressed: boolean) => void;
};

export default function ItemCard(item: itemCardProps) {
  const dispatch = useDispatch();

  // const hasStartDay = useSelector(selectHasStartDay);
  const hasStartDay = getStartDayStatus();

  // Unused [For searching the item in the cart]
  // const itemState = useSelector((state: RootState) =>
  //   selectCartItem(state, item.item.id),
  // );

  const [quantity, setQuantity] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddQuantityModal, setShowAddQuantityModal] =
    useState(false);
  const [showItemInCartModal, setShowItemInCartModal] =
    useState(false);
  const [isNotChecked, setIsNotChecked] = useState(false);
  const [showNeedStartDayModal, setShowNeedStartDayModal] =
    useState(false);

  // Unused
  // const [isDeleteModalVisible, setIsDeleteModalVisible] =
  //   useState(false);
  // const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Check if add all button is pressed
  useEffect(() => {
    if (item.isAddAllPressed) {
      setQuantity(0);
      return () => {
        item.setIsAddAllPressed(false);
      };
    }
  }, [item.isAddAllPressed]);

  const updateQuantity = (quantity: number) => {
    setQuantity(quantity);

    // Add All properties
    const itemExists = item.tempCart.find(
      (itemInCart) => itemInCart.id === item.item.id,
    );
    item.setTempCart(
      itemExists
        ? quantity === 0
          ? item.tempCart.filter(
              (itemInCart) => itemInCart.id !== item.item.id,
            )
          : item.tempCart.map((itemInCart) =>
              itemInCart.id !== item.item.id
                ? itemInCart
                : { ...itemInCart, quantity },
            )
        : [
            ...item.tempCart,
            {
              id: item.item.id,
              name: item.item.name,
              price: item.item.price,
              quantity: quantity,
              image: item.item.image,
              category: item.item.category,
            },
          ],
    );
  };

  const addToCart = () => {
    // Reset quantity to 0
    setQuantity(0);

    console.log(hasStartDay);

    if (hasStartDay) {
      addToCartEvent({
        quantity: quantity,
        // itemState: itemState,
        product: item.item,
        dispatch: dispatch,
        showAddModal: setShowAddModal,
        showAddQuantityModal: setShowAddQuantityModal,
        showItemInCartModal: setShowItemInCartModal,
      });
      removeFromTempCart();
    } else {
      setShowNeedStartDayModal(true);
    }
  };

  const removeFromTempCart = () => {
    item.setTempCart(
      item.tempCart.filter(
        (itemInCart) => itemInCart.id !== item.item.id,
      ),
    );
  };

  // Unused function
  // const deleteProduct = (id: number) => {
  //   const tableName: string = 'item';
  //   const refAttribute: string = 'id';

  //   setIsDeleteModalVisible(false);

  //   deleteData(tableName, refAttribute, id).then((_) => {
  //     setDeleteModalVisible(true);
  //   });
  //   dispatch(setIsEditButton(true));
  // };

  const editProduct = () => {
    dispatch(setIsEditButton(true));
    dispatch(setIsModifyProductLoading(true));
  };

  return (
    <View className="ml-3 mr-3 mb-5 flex">
      <ItemClickable
        id={item.item.id}
        category_id={item.categoryID}
        image={item.item.image}
        name={item.item.name}
        price={item.item.price}
        isEditComponent={item.isEditComponent}
        checkedItems={item.checkedItems}
        setCurrentCheckedItems={item.setCurrentCheckedItems}
      />

      {item.isEditComponent ? (
        <View className="flex flex-row items-center ">
          <View className=" items-center">
            <Stepper
              id={item.item.id}
              quantity={quantity}
              caseType="product"
              updateQuantity={updateQuantity}
            />
          </View>
          <View className="justify-center">
            <Pressable
              className="bg-green h-10 w-32
                          rounded-full self-center ml-5 flex-1 items-center justify-center"
              onPress={addToCart}
            >
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                className="text-white text-base"
                style={{ fontFamily: 'Poppins-Bold' }}
              >
                Add to Cart
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View className="flex flex-row items-center">
          <View className="flex flex-row justify-center">
            <Link
              href={{
                pathname: '/(tabs)/editItemWrapper',
                params: {
                  id: item.item.id,
                  category_id: item.categoryID,
                },
              }}
              asChild
            >
              <Pressable
                className="bg-green w-40 h-10 border-2 border-green
                              rounded-full self-center items-center justify-center"
                onPress={() => editProduct()}
              >
                <Text
                  className="text-white text-lg"
                  style={{ fontFamily: 'Poppins-Bold' }}
                >
                  Edit Product
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      )}

      <AddToCartModals
        isAddModal={showAddModal}
        isAddQuantityModal={showAddQuantityModal}
        isItemInCartModal={showItemInCartModal}
        isNeedStartDayModal={showNeedStartDayModal}
        showAddModal={setShowAddModal}
        showAddQuantityModal={setShowAddQuantityModal}
        showItemInCartModal={setShowItemInCartModal}
        showNeedStartDayModal={setShowNeedStartDayModal}
      />

      {/* Unused Modal */}
      {/* <CustomModal
        visible={isDeleteModalVisible}
        message="Are you sure you want to delete this product?"
        optionOneText="Yes"
        optionTwoText="Cancel"
        optionOnePressed={() => deleteProduct(item.item.id)}
        optionOneColor="blue"
        optionTwoPressed={() => setIsDeleteModalVisible(false)}
        optionTwoColor="red"
        closeModal={() => setIsDeleteModalVisible(false)}
      /> */}

      {/* Unused Modal */}
      {/* <PopUpModal
        visible={deleteModalVisible}
        message="Product deleted successfully"
        text={'Done'}
        link={'dispatchProduct'}
        id={0}
        color="green"
        closeModal={() => setDeleteModalVisible(false)}
      /> */}
    </View>
  );
}
