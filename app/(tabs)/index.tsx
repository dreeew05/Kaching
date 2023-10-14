import React from 'react';
import { Alert, Pressable, Text, View, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

// COMPONENTS
import CategoryList from '../../components/CategoryList';

// TEST DATA
import testData from '../../utils/testCategoryData';

export default function TabOneScreen() {
  
  const showAlert = () => {
    Alert.alert('Show Alert Action', 'This is a dummy action.');
  };

  // GO TO MODIFY CATEGORIES PAGE
  const router = useRouter();
  const editCategories = () => {
    router.push('/(tabs)/modifyCategories');
  }

  return (
    <View className="flex-1 self-stretch bg-white dark:bg-black">
      <Text className="text-5xl ml-2 font-semibold text-green">Store Name</Text>

      <Pressable className="bg-transparent w-1/4 
        border-2 border-green rounded-md py-2 px-4 mt-2 mb-5 ml-2" 
        onPress={showAlert}>

        <Text className="text-green font-bold inset-0">Start Day</Text>

      </Pressable>

      <View className="flex flex-row items-end">
        <Text className="text-3xl ml-2">Categories</Text>
        <Pressable className="bg-transparent w-9 h-7 
          border-2 border-green rounded-md py-1 mb-1 ml-2" 
          onPress={editCategories}>

          <Text className="text-green font-bold self-center">Edit</Text>

        </Pressable>
      </View>

      {/* Generate Categories */}
      <CategoryList 
        cardType={'clickable'}
        categoryIDs={testData}
      />
      
    </View>
  );
}
