import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { Link } from 'expo-router';
import Stepper from '../Common/Stepper';
import { useDispatch, useSelector } from 'react-redux';
import { BaseItemProps } from '../__utils__/interfaces/BaseItemProps';
import {
  setIsDetailedViewLoading,
  setIsEditButton,
  setIsModifyProductLoading,
} from '../../redux/GlobalStateRedux/GlobalStateSlice';
import { addToCartEvent } from './AddToCartEvent';
import { AddToCartModals } from './AddToCartModals';
import { CheckBox } from '@rneui/base';
import { CartItemProps } from '../__utils__/interfaces/CartItemProps';

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

  const toggleDetailedViewLoading = () => {
    dispatch(setIsDetailedViewLoading(true));
  };

  const toggleCheckBox = () => {
    setIsNotChecked(!isNotChecked);
    if (!isNotChecked) {
      item.setCurrentCheckedItems([
        ...item.checkedItems,
        item.item.id,
      ]);
    } else {
      item.setCurrentCheckedItems(
        item.checkedItems.filter((id) => id !== item.item.id),
      );
    }
  };

  return (
    <View className="ml-3 mr-3 mb-5">
      <View className="flex flex-row mb-3">
        <Link
          href={{
            pathname: '/(tabs)/ItemScreen',
            params: {
              id: item.item.id,
              category_id: item.categoryID,
            },
          }}
          asChild
        >
          <TouchableOpacity
            onPress={() => toggleDetailedViewLoading()}
          >
            <Image
              className="w-40 h-40 mr-1 rounded-md"
              source={{ uri: item.item.image }}
            />
          </TouchableOpacity>
        </Link>

        <View className="flex flex-column ml-5">
          <Text
            className="text-lg font-semibold"
            style={{ fontFamily: 'Poppins-Medium' }}
          >
            {item.item.name}
          </Text>
          <Text
            className="text-gray-500"
            style={{ fontFamily: 'Poppins-Regular' }}
          >
            P{item.item.price}
          </Text>
        </View>

        {/* DELETE BUTTON */}
        {!item.isEditComponent ? (
          <View className="absolute -top-1 -right-1">
            <CheckBox
              checked={isNotChecked}
              onPress={() => toggleCheckBox()}
              size={35}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="grey"
              containerStyle={{
                backgroundColor: 'transparent',
                marginRight: -5,
                marginTop: -5,
              }}
            />
          </View>
        ) : null}
      </View>

      {item.isEditComponent ? (
        <View className="flex flex-row items-center">
          <View className="flex items-center mr-5">
            <Stepper
              id={item.item.id}
              quantity={quantity}
              caseType="product"
              updateQuantity={updateQuantity}
            />
          </View>
          <View className="flex-1 justify-center">
            <Pressable
              className="bg-green w-48 h-10 border-2 border-green 
                          rounded-md self-center ml-5 mr-5 flex-1 items-center justify-center"
              onPress={addToCart}
            >
              <Text
                className="text-white text-lg"
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
                className="bg-green h-10 border-2 border-green
                              rounded-md self-center flex-1 items-center justify-center w"
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
        showAddModal={setShowAddModal}
        showAddQuantityModal={setShowAddQuantityModal}
        showItemInCartModal={setShowItemInCartModal}
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
