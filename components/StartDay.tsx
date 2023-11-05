import React, { useState } from 'react';
import { Text, TextInput, View, Button, Pressable } from 'react-native';

type StartDayInputProps = {
        onStartDay: (startDayData: {
        cashierName: string;
        contactNumber: string;
        pettyCashAmount: number | undefined;
    }) => void;
};

export default function StartDayInput({ onStartDay }: StartDayInputProps) {
    const [cashierName, setCashierName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [pettyCashAmount, setPettyCashAmount] = useState<string>(''); 

      

    const handleStartDay = () => {
        const parsedPettyCashAmount = pettyCashAmount ? parseFloat(pettyCashAmount) : undefined;

        const startDayData = {
        cashierName,
        contactNumber,
        pettyCashAmount: parsedPettyCashAmount,
        };

        onStartDay(startDayData);
    };

    return (
        <View>
            <View className='ml-8 mr-8 mt-8'>
                <Text className=' text-lg text-gray font-semibold mb-1'>Cashier's Name: </Text>
                <View className=' border-b-gray border-b-2 opacity-50'>
                    <TextInput className='text-lg text-black font-medium mb-1'
                        value={cashierName}
                        onChangeText={setCashierName}
                        placeholder="Enter cashier's name"

                    />
                </View>
            </View>

            <View className='ml-8 mr-8 mt-5'>
                <Text className=' text-lg text-gray font-semibold mb-1'>Contact Number: </Text>
                <View className=' border-b-gray border-b-2 opacity-50'>
                    <TextInput className='text-lg text-black font-medium mb-1'
                        value={contactNumber}
                        onChangeText={setContactNumber}
                        placeholder="Enter contact number"
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                    />
                </View>
            </View>

            <View className='ml-8 mr-8 mt-5'>
                <Text className=' text-lg text-gray font-semibold mb-1'>Petty Cash Amount: </Text>
                <View className=' border-b-gray border-b-2 opacity-50'>
                    <TextInput className='text-lg text-black font-medium mb-1'
                        value={pettyCashAmount}
                        onChangeText={(text) => setPettyCashAmount(text)}
                        placeholder="Enter petty cash amount"
                        placeholderTextColor="gray"
                        keyboardType="decimal-pad"
                    />
                </View>
            </View>


            <Pressable className="bg-transparent w-4/6 self-center mt-10 bg-green items-center rounded-full py-2 px-4 mb-5 ml-2" 
                onPress={handleStartDay}>

                <Text className="text-white text-xl font-bold">Confirm Start Day</Text>
            </Pressable>
        </View>
    );
}
