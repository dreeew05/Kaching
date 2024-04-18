import React from 'react';
import { Image, Text, View } from 'react-native';

// INTERFACE
import { CategoryProps } from '../__utils__/interfaces/CategoryProps';

export default function CategoryCard({
  id,
  name,
  image,
}: CategoryProps) {
  return (
    <View>
      <View className="h-40">
        <Image
          source={{ uri: image }}
          resizeMode="cover"
          className="w-full h-full rounded-t-md"
        />
      </View>
      <View className="p-2">
        <Text
          numberOfLines={1}
          className="text-xl mb-1 font-bold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
          // Applying different font sizes based on screen size
        >
          {name}
        </Text>
      </View>
    </View>
  );
}
