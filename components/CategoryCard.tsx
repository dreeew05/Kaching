import React from 'react';
import { Image, TouchableOpacity, View, Text, Alert } from 'react-native';

// INTERFACE
import { CategoryProps } from './interfaces/CategoryProps';

export default function CategoryCard({ id, name, image }: CategoryProps) {
  // USE ID TO ACCESS ALL THE ITEMS UNDER THE CATEGORY_ID
  const testButton = (
    id : number,
    category : string) => {
      Alert.alert('The ID of ' + category + ' is ' + id);
  }
  return (
    <TouchableOpacity className="bg-white dark:bg-black shadow-md rounded-md m-2 p-2"
      onPress={() => testButton(id, name)}>
        
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
      
    </TouchableOpacity>
  );
}
