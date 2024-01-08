// startDayInput.tsx
import React, { useState } from 'react';
import { Alert, View, Text, TouchableHighlight } from 'react-native';
import CustomPressable from '../../components/CustomPressable';
import { TextInput } from 'react-native-gesture-handler';

export default function EditStoreName() {
  const [storeName, setStoreName] = useState('');

  const test = () => {
    console.log('Store Name Changed');
  };

  return (
    <View>
      <View className="border-b-gray border-b-2 opacity-50 px-10 mt-32 self-center">
        <TextInput
          className="text-lg text-black font-medium mb-1"
          value={storeName}
          onChangeText={setStoreName}
          placeholder="Enter New Store Name"
        />
      </View>

      <TouchableHighlight
        className={`w-64 self-center rounded-full p-3 mb-5 ${
          storeName.trim() === '' ? 'bg-gray' : 'bg-green'
        } mt-6`}
        onPress={test}
        disabled={storeName.trim() === ''} // Disable button if store name is empty
        underlayColor={'#789c8c'} // Change the underlay color when clicked
      >
        <Text className={`text-white text-xl font-bold self-center`}>Confirm</Text>
      </TouchableHighlight>
    </View>
  );
}
