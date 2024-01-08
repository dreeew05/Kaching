import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getDatabase } from "../DatabaseUtils/OpenDatabase";

export default function StoreInformationGenerator() {

  const db = getDatabase();

  const [storeName, setStoreName] = useState('Store Name');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT storename FROM store`,
        [],
        (_, result) => {
          setStoreName(result.rows._array[0].storename);
        }
      )
    });
  }, []);


  return (
    <View>

      <Link href="/(tabs)/editStoreName" asChild>
          <Pressable className="">
            <Text className="text-5xl ml-5 font-semibold text-green">{storeName}</Text>
          </Pressable>
      </Link>
      
      <Text className="text-sm ml-5">October 24, 2023</Text>
    </View>
  );
}
