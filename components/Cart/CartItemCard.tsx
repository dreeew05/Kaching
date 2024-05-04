import FontAwesome5 from '@expo/vector-icons/build/FontAwesome5';
import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  updateItemQuantity,
} from '../../redux/CartRedux/CartSlice';
import Stepper from '../Common/Stepper';
import CustomModal from '../Modals/CustomModal';
import { CartItemProps } from '../__utils__/interfaces/CartItemProps';

export default function CartItemCard(item: CartItemProps) {
  const dispatch = useDispatch();

  const [isRemoveModalVisible, setIsRemoveModalVisible] =
    useState(false);

  const removeFromCartEvent = () => {
    setIsRemoveModalVisible(false);
    dispatch(removeFromCart(item.id));
  };

  const updateQuantityEvent = (quantity: number) => {
    if (quantity <= 0) {
      setIsRemoveModalVisible(true);
    } else {
      dispatch(
        updateItemQuantity({
          id: item.id,
          quantity: quantity,
        }),
      );
    }
  };

  return (
    <View>
      <View className="flex-row py-5 px-5 justify-between">
        <View>
          <Image
            source={{ uri: item.image }}
            className="w-36 h-36 rounded-md"
          />
        </View>
        <View className="flex-1 ml-5">
          <Text
            numberOfLines={1}
            className="text-lg text-darkgreen overflow-hidden mr-3"
            style={{ fontFamily: 'Poppins-Medium' }}
          >
            {item.name}
          </Text>
          <Text
            className="text-md text-gray "
            style={{ fontFamily: 'Poppins-Regular' }}
          >
            {item.category}
          </Text>
          <Text className="text-md text-black mt-3">
            ₱{(item.price * item.quantity).toFixed(2)}
          </Text>
          <View className="mt-6">
            <Stepper
              id={item.id}
              quantity={item.quantity}
              caseType="cart"
              updateQuantity={updateQuantityEvent}
            />
          </View>
        </View>

        <Pressable onPress={() => setIsRemoveModalVisible(true)}>
          <FontAwesome5
            name="trash"
            size={20}
            color="red"
            // set color opacity
            style={{ opacity: 0.7 }}
          />
        </Pressable>

        <CustomModal
          visible={isRemoveModalVisible}
          message="Are you sure you want to remove this item?"
          optionOneText="Yes"
          optionTwoText="Cancel"
          optionOnePressed={() => removeFromCartEvent()}
          optionTwoPressed={() => setIsRemoveModalVisible(false)}
          optionOneColor="blue"
          optionTwoColor="red"
          closeModal={() => setIsRemoveModalVisible(false)}
        />
      </View>
    </View>
  );
}
