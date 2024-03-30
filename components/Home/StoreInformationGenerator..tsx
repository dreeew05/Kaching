import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { getDatabase } from '../DatabaseUtils/OpenDatabase';
import { useSelector } from 'react-redux';
import { selectStoreNameAction } from '../../redux/GlobalStateRedux/GlobalStateSelectors';

export default function StoreInformationGenerator() {
  const db = getDatabase();
  const [storeName, setStoreName] = useState('Store Name');
  const actionState = useSelector(selectStoreNameAction);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT storename FROM store`,
        [],
        (_, result) => {
          setStoreName(result.rows._array[0].storename);
        },
      );
    });
  }, [actionState]);

  const date = new Date();

  const monthInWords = (month: number) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[month];
  };

  return (
    <View>
      <Link
        href={{
          pathname: '/(tabs)/editStoreName',
          params: {
            storeName: storeName,
          },
        }}
        asChild
      >
        <Pressable className="flex-1">
          <View className="flex-row">
            <Text className="text-5xl ml-5 font-semibold text-green">
              {storeName}
            </Text>
          </View>
        </Pressable>
      </Link>

      <Text className="text-sm ml-5">
        {monthInWords(date.getMonth()) +
          ' ' +
          date.getDate() +
          ',' +
          ' ' +
          date.getFullYear()}
      </Text>
    </View>
  );
}
