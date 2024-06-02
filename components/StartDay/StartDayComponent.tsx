import { router } from 'expo-router';
import { useState } from 'react';
import { TextInput, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setHasStartDay } from '../../redux/GlobalStateRedux/GlobalStateSlice';
import CustomPressable from '../Common/CustomPressable';
import { insertData } from '../DatabaseUtils/CoreFunctions';

export default function StartDayComponent() {
  const [cashierName, setCashierName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [pettyCashAmount, setPettyCashAmount] = useState<string>('');
  const dispatch = useDispatch();

  const handleStartDay = () => {
    if (!validateInputs()) return; // Validate inputs before proceeding

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

  const validateInputs = () => {
    if (cashierName.trim() === '') {
      setErrorMessage("Cashier's name cannot be empty.");
      return false;
    }
    if (!validateContactNumber(contactNumber)) return false;
    if (pettyCashAmount.trim() === '') {
      setErrorMessage('Petty cash amount cannot be empty.');
      return false;
    }
    return true;
  };

  const validateContactNumber = (number: string) => {
    const isNumeric = /^\d+$/.test(number);
    if (number.length === 11 && isNumeric) {
      setErrorMessage('');
      return true;
    } else {
      setErrorMessage('Contact number must be exactly 11 digits.');
      return false;
    }
  };

  return (
    <View className="flex-1 justify-center bg-white">
      {/* Cashier's Name Input */}
      <View className="ml-8 mr-8 bg-white">
        <Text className="text-lg text-green font-semibold mb-1">
          Cashier's Name:
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

      {/* Contact Number Input */}
      <View className="ml-8 mr-8 mt-5 bg-transparent">
        <Text className="text-lg text-green font-semibold mb-1">
          Contact Number:
        </Text>
        <View className="border-b-gray border-b-2 opacity-50 bg-transparent">
          <TextInput
            className="text-lg text-black font-medium mb-1"
            value={contactNumber}
            onChangeText={(text) => {
              setContactNumber(text);
              setErrorMessage('');
            }}
            placeholder="09xxxxxxxxx"
            maxLength={11}
            placeholderTextColor="gray"
            keyboardType="numeric"
          />
        </View>
        {errorMessage ? (
          <Text className="text-red-500 mt-2">{errorMessage}</Text>
        ) : null}
      </View>

      {/* Petty Cash Amount Input */}
      <View className="ml-8 mr-8 mt-5 bg-transparent">
        <Text className="text-lg text-green font-semibold mb-1">
          Petty Cash Amount:
        </Text>
        <View className="border-b-gray border-b-2 opacity-50 bg-transparent">
          <TextInput
            className="text-lg text-black font-medium mb-1"
            value={pettyCashAmount}
            onChangeText={(text) => {
              setPettyCashAmount(text);
              setErrorMessage('');
            }}
            placeholder="Enter petty cash amount"
            placeholderTextColor="gray"
            keyboardType="decimal-pad"
          />
        </View>
      </View>

      {/* Start Day Button */}
      <View className="mt-8 bg-transparent">
        <CustomPressable
          text="Start Day"
          onPress={handleStartDay}
          disabled={!!errorMessage} // Disable button if there's an error message
        ></CustomPressable>
      </View>
    </View>
  );
}
