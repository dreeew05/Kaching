import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import { Alert, Pressable, Text, View, TextInput } from 'react-native';
import CustomPressable from '../../components/CustomPressable';
import { useRouter } from 'expo-router';

export default function TabOneScreen() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Cash', value: 'cash' },
    { label: 'Online', value: 'online' },
  ]);

  const showAlert = () => {
    Alert.alert('Show Alert Action', 'This is a dummy action.');
  };

  const router = useRouter();

  const viewOrderSummary = () => {
    router.push('/(tabs)/orderSummary');
  };
  const viewReceipt = () => {
    router.push('/(tabs)/receipt');
  };

  const [number, onChangeNumber] = React.useState<string>('');
  const [inputMargin, setInputMargin] = useState(40); // Initial margin set to 40

  const handleDropdownToggle = (isOpen: boolean) => {
    setInputMargin(isOpen ? 150 : 40); // Set the margin to 150 when the dropdown is open, and 40 when it's closed
  };

  return (
    <View
      style={{ flex: 1, justifyContent: 'space-between' }}
      className="flex-1 self-stretch bg-white dark-bg-black"
    >
      <View>
        <Text className="text-4xl ml-5 text-green" style={{ fontFamily: 'Poppins-Medium' }}>
          Payment
        </Text>
        <Text className="text-7xl mt-5 font-medium p-5 text-yellow self-center">$117</Text>
        <Text className="text-xl mb-2 font-base text-gray self-center">
          Please select a mode of payment
        </Text>

        <DropDownPicker
          style={{
            backgroundColor: 'lightgray',
            borderColor: 'lightgray',
            borderWidth: 2,
          }}
          textStyle={{
            fontSize: 14,
            fontWeight: 'bold',
            color: 'gray',
          }}
          containerStyle={{ height: 40, width: 275, alignSelf: 'center' }}
          dropDownContainerStyle={{
            backgroundColor: 'white',
            borderColor: 'lightgray',
          }}
          itemSeparator={true}
          itemSeparatorStyle={{
            backgroundColor: 'lightgray',
            height: 1,
          }}
          placeholder="Mode of Payment"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onOpen={() => handleDropdownToggle(true)}
          onClose={() => handleDropdownToggle(false)}
        />

        <TextInput
          className="border-2 border-gray rounded-xl p-2 m-5 mt-40 self-center w-2/3 text-gray text-base font-semibold"
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Enter Payment Amount"
          keyboardType="decimal-pad"
          style={{ marginTop: inputMargin }}
        />
      </View>

      <View>
        <CustomPressable text="Confirm Payment" onPress={viewReceipt} />
      </View>
    </View>
  );
}
