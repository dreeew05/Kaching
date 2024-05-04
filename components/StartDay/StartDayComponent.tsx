import { router } from 'expo-router';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { setHasStartDay } from '../../redux/GlobalStateRedux/GlobalStateSlice';
import CustomPressable from '../Common/CustomPressable';
import { insertData } from '../DatabaseUtils/CoreFunctions';
import { Text, View } from '../Themed';

export default function StartDayComponent() {
  const [cashierName, setCashierName] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [pettyCashAmount, setPettyCashAmount] = useState<string>('');
  const dispatch = useDispatch();

  const handleStartDay = () => {
    const parsedPettyCashAmount = parseFloat(pettyCashAmount);

    const tableName = 'eods';
    const data = [
      {
        cashiername: cashierName,
        contactnum: contactNumber,
        pettycash: parsedPettyCashAmount,
      },
    ];

    insertData(tableName, data)
      .then((result) => {
        console.log(result);
        dispatch(
          setHasStartDay({
            isStartDay: true,
            isDisable: false,
          }),
        );
        // Go back to home
        router.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View className="flex-1 justify-center bg-white">
      <View className="ml-8 mr-8 bg-white">
        <Text className="text-lg text-green font-semibold mb-1">
          Cashier's Name:{' '}
        </Text>
        <View className="border-b-gray border-b-2 opacity-50 bg-transparent">
          <TextInput
            className="text-lg text-black font-medium mb-1"
            value={cashierName}
            onChangeText={setCashierName}
            placeholder="Enter cashier's name"
            placeholderTextColor="gray"
          />
        </View>
      </View>

      <View className="ml-8 mr-8 mt-5 bg-transparent">
        <Text className="text-lg text-green font-semibold mb-1">
          Contact Number:{' '}
        </Text>
        <View className="border-b-gray border-b-2 opacity-50 bg-transparent">
          <TextInput
            className="text-lg text-black font-medium mb-1"
            value={contactNumber}
            onChangeText={setContactNumber}
            placeholder="09xxxxxxxxx"
            maxLength={11}
            placeholderTextColor="gray"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View className="ml-8 mr-8 mt-5 bg-transparent">
        <Text className="text-lg text-green font-semibold mb-1">
          Petty Cash Amount:{' '}
        </Text>
        <View className="border-b-gray border-b-2 opacity-50 bg-transparent">
          <TextInput
            className="text-lg text-black font-medium mb-1"
            value={pettyCashAmount}
            onChangeText={(text) => setPettyCashAmount(text)}
            placeholder="Enter petty cash amount"
            placeholderTextColor="gray"
            keyboardType="decimal-pad"
          />
        </View>
      </View>

      <View className="mt-8 bg-transparent">
        <CustomPressable
          text="Start Day"
          onPress={handleStartDay}
          disabled={
            cashierName.trim() === '' ||
            contactNumber.trim() === '' ||
            pettyCashAmount.trim() === ''
          }
        ></CustomPressable>
      </View>
    </View>
  );
}
