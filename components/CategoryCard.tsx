import React from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import { Link, useRouter } from 'expo-router';

// Define the prop types for CategoryCard
interface CategoryCardProps {
  categoryName: string;
  categoryImage: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ categoryName, categoryImage }) => {
  const router = useRouter();

  const handleCardClick = () => {
    // navigatem to Category View
    router.push('/categoryView');
  };

  return (
    <TouchableOpacity onPress={handleCardClick}>
      <View className="bg-white dark:bg-black shadow-md rounded-md m-2 p-2">
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
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
