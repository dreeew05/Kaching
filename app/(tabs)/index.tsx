import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';


// COMPONENTS
import CategoryList from '../../components/CategoryList';

// TEST DATA
import testData from '../../utils/testCategoryData';
import { ScrollView } from 'react-native-gesture-handler';

export default function TabOneScreen() {
  
  const showAlert = () => {
    Alert.alert('Show Alert Action', 'This is a dummy action.');
  };
  
  // GO TO MODIFY CATEGORIES PAGE
  const router = useRouter();
  const editCategories = () => {
    router.push('/(tabs)/modifyCategories');
  }
  const startDay = () => {
    router.push('/(tabs)/startDayInput');
  };


  return (

    <View className="flex-1 self-stretch bg-white dark:bg-black">
      <ScrollView>
      <Text className="text-5xl ml-5 font-semibold text-green">Store Name</Text>
      <Text className="text-sm ml-5 mb-5">October 24, 2023</Text>

      <Pressable className="bg-transparent w-36 border-2 border-green rounded-xl py-2 px-4 mt-2 mb-5 ml-5" onPress={startDay}>
        <View className="flex-row items-center">
          <FontAwesome5 name="plus" size={20} color="darkgreen" />
          <Text className="text-green text-base ml-3 font-bold mr-3">Start Day</Text>
        </View>
      </Pressable>

      <View className="flex-row mb-5 py-3 px-10 items-center shadow-lg shadow-neutral-600 rounded-lg self-center bg-white">
        <View>
          <Text className=" px-7 self-center text-center text-green text-3xl font-bold">$123.56</Text>
          <Text className=" px-7 self-center text-center text-black text-sm opacity-50 font-base">Total Sales</Text>
        </View>
        <Text className=" self-center text-center text-gray text-5xl font-thin">|</Text>
        <View>
          <Text className=" px-7 self-center text-center text-green text-3xl font-bold">123</Text>
          <Text className=" px-7 self-center text-center text-black text-sm opacity-50 font-base">Orders</Text>
        </View>
      </View>
      <View className="flex flex-row items-end">
        <Text className="text-3xl font-base ml-5 text-darkgreen">Categories</Text>
        <Pressable className='self-center ml-3'
          onPress={editCategories}>
            <FontAwesome5 name="edit" size={25} color="darkgreen" />
        </Pressable>
      </View>

      {/* Generate Categories */}
      <CategoryList 
        cardType={'clickable'}
        categories={testData}
      />
      
      </ScrollView>
    </View>

  );
}
