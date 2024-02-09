import React, { useState } from 'react';
import { Image, View, Text, Pressable } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/build/FontAwesome5';
import { CartItemProps } from '../__utils__/interfaces/CartItemProps';
import Stepper from '../Common/Stepper';
import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  updateItemQuantity,
} from '../../redux/CartRedux/CartSlice';
import CustomModal from '../Modals/CustomModal';

export default function CartItemCard(item: CartItemProps) {
  const dispatch = useDispatch();
  const [isRemoveModalVisible, setIsRemoveModalVisible] =
    useState(false);
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const [subtotalPrice, setSubtotalPrice] = useState<number>(
    item.price,
  );

  const removeFromCartEvent = () => {
    setIsRemoveModalVisible(false);
    dispatch(removeFromCart(item.id));
  };

  const updateQuantityEvent = (quantity: number) => {
    setQuantity(quantity);
    if (quantity <= 0) {
      setIsRemoveModalVisible(true);
    } else {
      setSubtotalPrice(() => item.price * quantity);
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
            className="text-lg text-darkgreen"
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
            P{subtotalPrice.toFixed(2)}
          </Text>
          <View className="mt-6">
            <Stepper
              id={item.id}
              quantity={quantity}
              caseType="cart"
              updateQuantity={updateQuantityEvent}
            />
          </View>
        </View>

        <Pressable onPress={() => setIsRemoveModalVisible(true)}>
          <FontAwesome5 name="trash" size={20} color="gray" />
        </Pressable>

        <CustomModal
          visible={isRemoveModalVisible}
          message="Are you sure you want to remove this item?"
          optionOneText="Yes"
          optionTwoText="Cancel"
          optionOnePressed={() => removeFromCartEvent()}
          optionTwoPressed={() => setIsRemoveModalVisible(false)}
          optionTwoColor="red"
          closeModal={() => setIsRemoveModalVisible(false)}
        />
      </View>
    </View>
  );
}
