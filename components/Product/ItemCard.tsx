import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { Link } from 'expo-router';
import { selectCartItem } from '../../redux/CartRedux/CartSelectors';
import Stepper from '../Common/Stepper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import { BaseItemProps } from '../__utils__/interfaces/BaseItemProps';
import {
  setIsDetailedViewLoading,
  setIsEditButton,
  setIsModifyProductLoading,
} from '../../redux/GlobalStateRedux/GlobalStateSlice';
import { deleteData } from '../DatabaseUtils/CoreFunctions';
import { addToCartEvent } from './AddToCartEvent';
import { FontAwesome5 } from '@expo/vector-icons';
import { AddToCartModals } from './AddToCartModals';
import CustomModal from '../Modals/CustomModal';
import { PopUpModal } from '../Modals/PopUpModal';

type itemCardProps = {
  item: BaseItemProps;
  isEditComponent: boolean;
  categoryID: number;
};

export default function ItemCard(item: itemCardProps) {
  const dispatch = useDispatch();
  const itemState = useSelector((state: RootState) =>
    selectCartItem(state, item.item.id),
  );

  const [quantity, setQuantity] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddQuantityModal, setShowAddQuantityModal] =
    useState(false);
  const [showItemInCartModal, setShowItemInCartModal] =
    useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const updateQuantity = (quantity: number) => {
    setQuantity(quantity);
  };

  const addToCart = () => {
    addToCartEvent({
      quantity: quantity,
      itemState: itemState,
      product: item.item,
      dispatch: dispatch,
      showAddModal: setShowAddModal,
      showAddQuantityModal: setShowAddQuantityModal,
      showItemInCartModal: setShowItemInCartModal,
    });
  };

  const deleteProduct = (id: number) => {
    const tableName: string = 'item';
    const refAttribute: string = 'id';

    setIsDeleteModalVisible(false);

    deleteData(tableName, refAttribute, id).then((_) => {
      setDeleteModalVisible(true);
    });
    dispatch(setIsEditButton(true));
  };

  const editProduct = () => {
    dispatch(setIsEditButton(true));
    dispatch(setIsModifyProductLoading(true));
  };

  const toggleDetailedViewLoading = () => {
    dispatch(setIsDetailedViewLoading(true));
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
          <View className="absolute top-1 right-2">
            <Pressable onPress={() => setIsDeleteModalVisible(true)}>
              <FontAwesome5 name="trash" size={24} color="grey" />
            </Pressable>
          </View>
        ) : null}
      </View>

      {item.isEditComponent ? (
        <View className="flex flex-row items-center">
          <View className="flex items-center">
            <Stepper
              id={item.item.id}
              quantity={quantity}
              caseType="product"
              updateQuantity={updateQuantity}
            />
          </View>
          <View className="flex-1 justify-center">
            <Pressable
              className="bg-green w-52 h-10 border-2 border-green 
                          rounded-md self-center ml-6 flex-1 items-center justify-center"
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

      <CustomModal
        visible={isDeleteModalVisible}
        message="Are you sure you want to delete this product?"
        optionOneText="Yes"
        optionTwoText="Cancel"
        optionOnePressed={() => deleteProduct(item.item.id)}
        optionTwoPressed={() => setIsDeleteModalVisible(false)}
        optionTwoColor="red"
        closeModal={() => setIsDeleteModalVisible(false)}
      />

      <PopUpModal
        visible={deleteModalVisible}
        message="Product deleted successfully"
        text={'Done'}
        link={'dispatchProduct'}
        id={0}
        color="green"
        closeModal={() => setDeleteModalVisible(false)}
      />

      <AddToCartModals
        isAddModal={showAddModal}
        isAddQuantityModal={showAddQuantityModal}
        isItemInCartModal={showItemInCartModal}
        showAddModal={setShowAddModal}
        showAddQuantityModal={setShowAddQuantityModal}
        showItemInCartModal={setShowItemInCartModal}
      />
    </View>
  );
}
