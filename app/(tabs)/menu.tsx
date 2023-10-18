import React, { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import CustomAlert from '../../components/CustomAlert';

export default function MenuSettings() {
  const [alertVisible, setAlertVisible] = useState(false);

  const handleShowAlert = () => {
    setAlertVisible(true);
  };

  const router = useRouter();
  const goToPahuwayBanner = () => {
    router.push('/(tabs)/pahuwayBanner')
  }

  const handleConfirm = () => {
    // Handle the confirmation logic here
    setAlertVisible(false);
    goToPahuwayBanner();
  };

  const handleCancel = () => {
    // Handle the cancel logic here
    setAlertVisible(false);
  };
  
  const showAlert = () => {
    CustomAlert({
      title: 'Are you sure you want to end the day?',
      message: '',
      confirmText: 'Yes',
      cancelText: 'Cancel',
      onConfirm: () => handleConfirm(),
      onCancel: () => Alert.alert('Cancelled'),
    });
  };
  return (
    <View className=" py-10 marker:flex-1 self-stretch bg-white dark:bg-black">
    
      <View className=" flex-row justify-around w-3/4 self-center">
        <Text className="text-white font-bold  bg-green px-2 rounded-lg ">7</Text>
        <Text className="text-green font-bold px-2 rounded-full">October</Text>
        <Text className="text-green font-bold px-2 rounded-full flex items">Wednesday</Text>
      </View>

      <View className="flex items-center ">
        <Text className=" px-16 py-3 self-center bg-green text-center rounded-md  text-white text-4xl font-bold m-3">$123.56</Text>
        <Text className="text-green text-2xl font-bold self-center mb-10 px-2 rounded-full flex items">Total Sales</Text>
      </View>

        <Link href="/(tabs)/currentEOD" asChild>
          <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
              <Text className="text-green text-xl font-bold">View Current EOD</Text>
              <FontAwesome5 name="angle-right" size={24} color="black" style={{opacity: 0.5 }} />
          </Pressable>
        </Link>

        <Link href="/(tabs)/previousEOD" asChild>
          <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
              <Text className="text-green text-xl font-bold">View Previous EOD</Text>
              <FontAwesome5 name="angle-right" size={24} color="black" style={{opacity: 0.5 }} />
          </Pressable>
        </Link>

        <Link href="/(tabs)/termsOfService" asChild>
          <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
              <Text className="text-green text-xl font-bold">Terms of Service</Text>
              <FontAwesome5 name="angle-right" size={24} color="black" style={{opacity: 0.5 }} />
          </Pressable>
        </Link>

        <Link href="/(tabs)/privacyPolicy" asChild>
          <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
              <Text className="text-green text-xl font-bold">Privacy Policy</Text>
              <FontAwesome5 name="angle-right" size={24} color="black" style={{opacity: 0.5 }} />
          </Pressable>
        </Link>

        <Link href="/(tabs)/faqs" asChild>
          <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
              <Text className="text-green text-xl font-bold">FAQs</Text>
              <FontAwesome5 name="angle-right" size={24} color="black" style={{opacity: 0.5 }} />
          </Pressable>
        </Link>

        <Pressable className="bg-transparent w-4/6 self-center mt-10 bg-green items-center rounded-full py-2 px-4 mb-5 ml-2" 
          onPress={showAlert}>

          <Text className="text-white text-xl font-bold">End Day</Text>
        </Pressable>

    </View>

  );
}
