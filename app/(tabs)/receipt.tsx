import React from 'react';
import RainbowBackground from '../../components/Rainbow';
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
    }

    return (
        <RainbowBackground>
            <View className="flex-1 self-stretch pt-16">
                <Text className="text-4xl ml-5 font-semibold text-white">Payment</Text>
                <Text className="text-2xl font-semibold text-white ml-5 mt-3">Transaction Recorded!</Text>
                <View className='flex flex-row ml-5'>
                    <Text className="text-2xl font-semibold text-white self-center">Change: </Text>
                    <Text className="text-2xl font-semibold text-white self-center">$3.00</Text>
                </View>


                <ScrollView >
                    <View className="flex flex-collumn items-center mt-5">             
                        <Text className="text-5xl font-semibold text-green">Store Name</Text>
                        <Text className="text-sm ml-5 ">Glen Bulaong</Text>
                        <Text className="text-sm ml-5 ">09123456789</Text>
                        <Text className="text-sm ml-5 mb-5">October 24, 2023</Text>
                    </View>
                    <View>
                        {/* Generate Items */}
                        <ReceiptItemList
                            cart={testData}
                        />
                    </View>
                </ScrollView>

                <View className='flex-row justify-between p-4'>
                </View>
                <Pressable className="bg-transparent w-2/3  bg-white items-center rounded-full py-2 px-4 mb-5 ml-2 self-center" 
                onPress={viewIndex}>
                    <Text className="text-green text-xl font-bold">Done</Text>
                </Pressable>
            </View>
        </RainbowBackground>

);

}