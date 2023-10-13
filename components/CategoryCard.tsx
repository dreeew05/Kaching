import React from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
interface CategoryCardProps {
  categoryName: string;
  categoryImage: string;
}

export default function CategoryCard({ categoryName, categoryImage }: CategoryCardProps) {
  return (
    <TouchableOpacity className="bg-white dark:bg-black shadow-md rounded-md m-2 p-2">
      <View className="h-36">
        <Image
          source={{ uri: categoryImage }}
          resizeMode="cover"
          className="w-full h-full rounded-t-md"
        />
      </View>
      <View className="p-2">
        <Text className="text-xl font-bold mb-1">{categoryName}</Text>
      </View>
    </TouchableOpacity>
  );
}
