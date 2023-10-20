import DropDownPicker from 'react-native-dropdown-picker'; //https://hossein-zare.github.io/react-native-dropdown-picker-website/docs
import React, { useState } from 'react';

import { useRouter } from 'expo-router';
import { Alert, Pressable, Text, View, Dimensions, TextInput, StyleSheet } from 'react-native';


export default function TabOneScreen() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Cash', value: 'cash'},
        {label: 'Online', value: 'online'}
    ]);

    const showAlert = () => {
        Alert.alert('Show Alert Action', 'This is a dummy action.');
    };
    const router = useRouter();
    const viewOrderSummary = () => {
      router.push('/(tabs)/orderSummary');
    }
    const viewReceipt = () => {
      router.push('/(tabs)/receipt');
    }

    const [number, onChangeNumber] = React.useState<string>('');

    return (
        <View className="flex-1 self-stretch bg-white dark:bg-black">
            <Pressable className="bg-transparent w-1/4" 
            onPress={viewOrderSummary}> 
                <Text className="text-green font-bold inset-0">Back</Text>
            </Pressable>
            <Text className="text-4xl ml-5 font-semibold text-green">Payment</Text>
            <Text className="text-8xl ml-5 font-semibold text-yellow self-center">$117</Text>
            <Text className="text-lg ml-5 font-semibold text-green self-center">Please select a mode of payment</Text>
            
            <DropDownPicker
                containerStyle={{height: 40, width: 300, alignSelf: 'center'}}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />

            <TextInput
                className='border border-gray-300 rounded-md p-2 m-5 mt-20 self-center w-2/3'
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Enter Payment Amount"
                keyboardType="decimal-pad"
            />

            <Pressable className="bg-transparent w-2/3 self-center bg-green items-center rounded-full py-2 px-4 mb-5 ml-2" 
              onPress={viewReceipt}>
              <Text className="text-white text-xl font-bold">Confirm Payment</Text>
            </Pressable>
        </View>

);

}