import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { getDatabase } from "../DatabaseUtils/OpenDatabase";
import { useSelector } from 'react-redux';
import { selectStoreNameAction } from '../../redux/GlobalStateRedux/GlobalStateSelectors';

export default function StoreInformationGenerator() {

  const db = getDatabase();

  const [storeName, setStoreName] = useState('Store Name');

  const actionState = useSelector(selectStoreNameAction);

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
  }, [actionState]);

  // const now = new Date();
  //   const options = {
  //     weekday: 'long',
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //   };
  //   const formattedCurrentDay = now.toLocaleDateString('en-US', options);

  return (
    <View>

      <Link 
        href={{
          pathname: "/(tabs)/editStoreName",
          params : {
            storeName : storeName
          }
        }} 
      asChild>
          <Pressable className="">
            <Text className="text-5xl ml-5 font-semibold text-green">{storeName}</Text>
          </Pressable>
      </Link>
      
      <Text className="text-sm ml-5">October 24, 2023</Text>
    </View>
  );
}

