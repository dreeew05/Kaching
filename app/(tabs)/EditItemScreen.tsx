import React, { useState } from 'react';
import { Text, View } from '../../components/Themed';
import { ItemCard } from '../../components/ItemCard'
import { Image, StyleSheet, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


export default function EditItemScreen(){
    const [quantity, setQuantity] = useState(0);

    const incrementQuantity = () => {
      setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
      if (quantity > 0) {
      setQuantity(quantity - 1);
      }
    };
  return (
  <View className="flex-1 h-full">
    <View 
      className="h-96 px-3"
      >
      <Pressable className="h-8">
        <FontAwesomeIcon icon={faPenToSquare} className="text-9xl" />
      </Pressable>
      <Image
        source={{
          uri: 'https://bump2babynutrition.com/wp-content/uploads/2023/04/Sprite.jpg'
        }}
        className="w-full h-full rounded-3xl"
      />
      <Text className="text-center text-3xl pt-3 text-green">$39</Text>
      <Text className="text-center text-4xl pt-3">Product Name</Text>
      <View className="h-36 justify-center items-center">
        <Text className="text-center text-base text-gray font-light px-3">Just a short product description or maybe nothing at all XD</Text>
      </View>
      </View>
      <View className="flex flex-row h-16 absolute inset-x-0 bottom-0 w-full border-t-[0.5px] border-gray-300 items-left py-2 pl-3">
        <View className="w-2/5">
          <View className="w-32 h-full border-[0.5px] flex flex-row rounded-md items-center justify-center">
            <Pressable className="border-r-[0.5px]" onPress={decrementQuantity}>
            <Text className="text-lg px-4">-</Text>
            </Pressable>
            <Text className="text-lg px-4">{quantity}</Text>
            <Pressable className="border-l-[0.5px]" onPress={incrementQuantity}>
            <Text className="px-4 text-lg">+</Text>
            </Pressable>
            </View>
        </View>
        <View className="w-3/5 pr-3">
          <Pressable className="w-full h-full rounded-md border items-center justify-center bg-green" onPress={decrementQuantity}>
            <Text className="text-center text-lg font-semibold text-white">Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

