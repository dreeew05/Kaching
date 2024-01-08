// startDayInput.tsx
import React, { useState } from 'react';
import { Alert, View, Text, TouchableHighlight } from 'react-native';
import CustomPressable from '../../components/CustomPressable';
import { TextInput } from 'react-native-gesture-handler';
import { getDatabase } from "../../components/DatabaseUtils/OpenDatabase";
import { router, useRouter } from 'expo-router';

export default function EditStoreName() {



    const db = getDatabase();
    const [oldStoreName, setOldStoreName] = useState('');
    const [storeName, setStoreName] = useState('');

    
    db.transaction(tx => {
        tx.executeSql(
          `SELECT storename FROM store`,
          [],
          (_, result) => {
            setOldStoreName(result.rows._array[0].storename);
          }
        )
    });
    

  const editStoreName = () => {
    db.transaction(tx => {
        tx.executeSql(
          `UPDATE store SET storename = ? WHERE storename = ?`,
          [storeName, oldStoreName],
          (_, result) => {
            console.log(result.rowsAffected);
          }
        )
      });

      setStoreName('');
      router.push('/(tabs)/');
      console.log(storeName);
    };

  return (
    <View>
      <View className="border-b-gray border-b-2 mb-5 opacity-50 px-10 mt-32 self-center">
        <TextInput
          className="text-lg text-black font-medium mb-1"
          value={storeName}
          onChangeText={setStoreName}
          placeholder="Enter New Store Name"
        />
      </View>

      <CustomPressable
          text="Confirm"
          onPress={editStoreName}
          disabled={false}
        />
    </View>
  );
}
