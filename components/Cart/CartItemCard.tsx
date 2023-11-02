import React, { useEffect, useState } from 'react';
import { Alert, Image, View, Text, Pressable } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/build/FontAwesome5';

// INTERFACE
import { CartItemProps } from '../utils/interfaces/CartItemProps';

// COMPONENT
import Stepper from '../Stepper';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/CartSlice';

export default function CartItemCard(item: CartItemProps) {

  const dispatch = useDispatch();

  const removeFromCartEvent = () => {
    dispatch(
      removeFromCart(item.id)  
    )
  }

  const [quantity, setQuantity] = useState(item.quantity);
  const [subtotalPrice, setSubtotalPrice] = useState(item.price);

  const updateQuantity = (quantity : number) => {
    setQuantity(quantity);
  }

  useEffect(() => {
    setSubtotalPrice(() => item.price * quantity);
  }, [quantity])

  return (
    <View>
      <View className="flex-row py-5 px-5 justify-between">
        <View>
            <Image source={item.image} 
              className='w-36 h-36 rounded-md'
            />
        </View>
        <View className='flex-1 ml-5'>
          <Text className="text-lg text-darkgreen"
            style={{fontFamily: 'Poppins-Medium'}}>
            {item.name}
          </Text>
          <Text className="text-md text-gray "
            style={{fontFamily: 'Poppins-Regular'}}>
            {item.category}
          </Text>
          <Text className='text-md text-black mt-3'>
            ${subtotalPrice}
          </Text>
          <View className='mt-6'>
            <Stepper 
                quantity={quantity}
                updateQuantity={updateQuantity}
            />
          </View>
        </View>

        <Pressable onPress={removeFromCartEvent}>
          <FontAwesome5 name="trash" size={20} color="gray" />
        </Pressable>
      </View>
    </View>
  );
}
