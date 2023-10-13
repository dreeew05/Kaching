import React from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import { Link, useRouter } from 'expo-router';

// INTERFACE
import { CategoryProps } from './interfaces/CategoryProps';

export default function CategoryCard({ id, name, image } : CategoryProps) {
  const router = useRouter();
  const handleCardClick = () => {
    // Navigate to Category View
    router.push('/categoryView')
  }

  return(
    <TouchableOpacity onPress={handleCardClick}> 
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
  )
}