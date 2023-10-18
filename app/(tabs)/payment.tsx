import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';

import { useRouter } from 'expo-router';
import { Alert, Pressable, Text, View, Dimensions } from 'react-native';


function TabOneScreen() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

  return (
    <View>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
    </View>
  );
}