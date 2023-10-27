import React, { useEffect, useState } from 'react';
import { Alert, Image, View, Text, Pressable } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/build/FontAwesome5';

// INTERFACE
import { CartProps } from './interfaces/CartProps';
import IncrementDecrementProvider from '../context/IncrementDecrementContext';
import IncrementDecrement from './IncrementDecrement';

// COMPONENT
import Stepper from './Stepper';

export default function CartItemCard(item: CartProps) {

  const removeFromCart = () => {
    Alert.alert('Show Alert Action', 'This is a dummy action.');
  };

  const [quantity, setQuantity] = useState(0);
  const [subtotalPrice, setSubtotalPrice] = useState(item.price);

  const updateQuantity = (quantity : number) => {
    setQuantity(quantity);
  }

  useEffect(() => {
    setSubtotalPrice(() => item.price * quantity);
    console.log(item.price * quantity)
  }, [quantity])

  return (
    <View className="marker:flex-1 self-stretch bg-white dark:bg-black">
      <View className="flex-row py-5 px-5 justify-between">
        <View>
            <Image source={item.image} 
              className='w-36 h-36 rounded-md'
            />
        </View>
        <View className='flex-1 ml-5'>
          <Text className="text-lg text-green"
            style={{fontFamily: 'Poppins-Medium'}}>
            {item.name}
          </Text>
          <Text className="text-md text-gray "
            style={{fontFamily: 'Poppins-Regular'}}>
            {item.category}
          </Text>
          <Text className='text-md text-black'>
            {subtotalPrice}
          </Text>
          <View className='mt-12'>
            <Stepper updateQuantity={updateQuantity}/>
          </View>
        </View>

        <Pressable onPress={removeFromCart}>
          <FontAwesome5 name="trash" size={20} color="gray" />
        </Pressable>
      </View>
    </View>
  );
}
