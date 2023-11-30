import React from 'react';

import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

// COMPONENTS
import ReceiptItemList from '../../components/ReceiptItemList';

// TEST DATA
import testData from '../../utils/testCartData';
import { ScrollView } from 'react-native-gesture-handler';

export default function TabOneScreen() {
  const router = useRouter();
  const viewIndex = () => {
    router.push('../');
  };

  return (
    <View className="flex-1 self-stretch bg-white dark:bg-black">
      <Text className="text-4xl ml-5 font-semibold text-green">Payment</Text>
      <Text className="text-2xl font-semibold text-green self-center">Transaction Recorded!</Text>
      <View className="flex flex-row self-center">
        <Text className="text-2xl font-semibold text-green self-center">Change: </Text>
        <Text className="text-2xl font-semibold text-yellow self-center">$3.00</Text>
      </View>

      <ScrollView>
        <View className="flex flex-collumn items-center mt-5">
          <Text className="text-5xl font-semibold text-green">Store Name</Text>
          <Text className="text-sm ml-5 ">Glen Bulaong</Text>
          <Text className="text-sm ml-5 ">09123456789</Text>
          <Text className="text-sm ml-5 mb-5">October 24, 2023</Text>
        </View>
        <View>
          {/* Generate Items */}
          <ReceiptItemList cart={testData} />
        </View>
      </ScrollView>

      <View className="flex-row justify-between p-4 border-spacing-3 border border-white border-t-gray"></View>
      <Pressable
        className="bg-transparent w-2/3 self-center bg-green items-center rounded-full py-2 px-4 mb-5 ml-2 self-center"
        onPress={viewIndex}
      >
        <Text className="text-white text-xl font-bold">Done</Text>
      </Pressable>
    </View>
  );
}
