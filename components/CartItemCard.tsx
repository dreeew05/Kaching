import React, { useState } from 'react';
import { Alert, Image, View, Text, Pressable } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/build/FontAwesome5';

// INTERFACE
import { CartProps } from './interfaces/CartProps';
import IncrementDecrementProvider from '../context/IncrementDecrementContext';
import IncrementDecrement from './IncrementDecrement';


export default function CartItemCard({ price, name, image, category, quantity }: CartProps) {
  // const [currQuantity, setQuantity] = useState(quantity);

  // const incrementQuantity = () => {
  //   setQuantity(currQuantity + 1);
  // };

  // const decrementQuantity = () => {
  //   if (currQuantity > 0) {
  //     setQuantity(currQuantity - 1);
  //   }
  // };

  // const subTotalPrice = price * currQuantity;

  const removeFromCart = () => {
    Alert.alert('Show Alert Action', 'This is a dummy action.');
  };

  return (
    <View className="marker:flex-1 self-stretch bg-white dark:bg-black">
      <View className="flex-row py-5 px-5 justify-between">
        <View>
            <Image source={image} style={{ width: 130, height: 130, borderRadius: 10, borderWidth: 2, borderColor: "lightgray"}} />
        </View>
        <View className='flex-1 ml-5'>
          <Text className="text-lg font-semibold text-green">{name}</Text>
          <Text className="text-md text-gray ">{category}</Text>
          {/* <Text className="text-gray-500">${subTotalPrice}</Text>
          <View className="flex-row">
            <Pressable className="p-2 border border-gray-300 rounded-md" onPress={decrementQuantity}>
              <Text className="text-lg">-</Text>
            </Pressable>
            <Text className="p-2 text-lg">{currQuantity}</Text>
            <Pressable className="p-2 border border-gray-300 rounded-md" onPress={incrementQuantity}>
              <Text className="text-lg">+</Text>
            </Pressable>
          </View> */}
          <IncrementDecrementProvider>
            <IncrementDecrement price={price}/>
          </IncrementDecrementProvider>
        </View>

        <Pressable onPress={removeFromCart}>
          <FontAwesome5 name="trash" size={24} color="gray" />
        </Pressable>
      </View>
    </View>
  );
}
