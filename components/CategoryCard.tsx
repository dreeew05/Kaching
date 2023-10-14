import React from 'react';
import { Image, View, Text } from 'react-native';

// INTERFACE
import { CategoryProps } from './interfaces/CategoryProps';

export default function CategoryCard({ id, name, image } : CategoryProps) {

  return(
    <View>
      <View className="h-36">
        <Image
          source={image}
          resizeMode="cover"
          className="w-full h-full rounded-t-md"
        />
      </View>
      <View className="p-2">
        <Text className="text-xl font-bold mb-1">{name}</Text>
      </View>
    </View>
  )
}