import { useState } from 'react';
import { Text, View, Image, Alert } from 'react-native';
import { DetailedItemProps } from '../__utils__/interfaces/DetailedItemProps';
import { useDispatch, useSelector } from 'react-redux';
import { Pressable } from 'react-native';
import Stepper from '../Common/Stepper';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { addToCartEvent } from './AddToCartEvent';
import { AddToCartModals } from './AddToCartModals';
import ParamsToInteger from '../__utils__/helper/ParamsToInteger';

// Unused imports
// import { RootState } from '../../redux/Store';
// import { selectCartItem } from '../../redux/CartRedux/CartSelectors';

export default function DetailedItemScreen(item: DetailedItemProps) {
  const dispatch = useDispatch();

  // Unused [For searching the item in the cart]
  // const itemState = useSelector((state: RootState) =>
  //   selectCartItem(state, item.id),
  // );

  const param = useLocalSearchParams();
  const categoryID: number = ParamsToInteger(param.category_id);

  console.log(categoryID);

  const [quantity, setQuantity] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddQuantityModal, setShowAddQuantityModal] =
    useState(false);
  const [showItemInCartModal, setShowItemInCartModal] =
    useState(false);

  const updateQuantity = (quantity: number) => {
    setQuantity(quantity);
  };

  const addToCart = () => {
    // Reset quantity to 0
    updateQuantity(0);

    addToCartEvent({
      quantity: quantity,
      // itemState: itemState,
      product: item,
      dispatch: dispatch,
      showAddModal: setShowAddModal,
      showAddQuantityModal: setShowAddQuantityModal,
      showItemInCartModal: setShowItemInCartModal,
    });
  };

  const goBackAction = () => {
    router.push('//');
  };

  return (
    <View
      className="flex-1 h-full relative z-0"
      style={{
        marginTop: 60,
      }}
    >
      <Link
        href={{
          pathname: '/(tabs)/categoryView',
          params: {
            id: categoryID,
          },
        }}
        asChild
      >
        <Pressable onPress={() => goBackAction()} className="ml-3">
          <Ionicons name="chevron-back" size={30} color="green" />
        </Pressable>
      </Link>

      <View className="h-96 px-3 mt-5">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full rounded-3xl"
        />
        <Text className="text-center text-3xl pt-3 text-green">
          {item.price} PHP
        </Text>
        <Text className="text-center text-4xl pt-3">{item.name}</Text>
        <View className="h-36 justify-center items-center">
          <Text
            className="text-center text-base text-gray 
                        font-light px-3"
          >
            {item.description}
          </Text>
        </View>
      </View>

      <View
        className="flex flex-row h-16 absolute inset-x-0
                bottom-0 w-full border-t-[0.5px] space-x-12 border-gray-300 items-left
                py-2 pl-3 "
      >
        <View className="w-4/12">
          <Stepper
            id={item.id}
            quantity={quantity}
            caseType="product"
            updateQuantity={updateQuantity}
          />
        </View>

        <View className="w-6/12">
          <Pressable
            className="w-full h-10 rounded-lg
                        items-center justify-center bg-green shadow-md 
                        shadow-neutral-600"
            onPress={addToCart}
          >
            <Text
              className="text-center text-lg font-semibold 
                            text-white"
            >
              Add to Cart
            </Text>
          </Pressable>
        </View>
      </View>

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
