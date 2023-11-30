import React from 'react';
import { Image, View, Text } from 'react-native';

// INTERFACE
import { CategoryProps } from '../interfaces/CategoryProps';

export default function CategoryCard({ id, name, image }: CategoryProps) {
  return (
    <View>
      <View className="h-40">
        <Image source={image} resizeMode="cover" className="w-full h-full rounded-t-md" />
      </View>
      <View className="p-2">
        <Text className="text-xl mb-1" style={{ fontFamily: 'Poppins-Bold' }}>
          {name}
        </Text>
      </View>
    </View>
  );
}
