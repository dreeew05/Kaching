import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectStoreNameAction } from '../../redux/GlobalStateRedux/GlobalStateSelectors';
import { getDatabase } from '../DatabaseUtils/OpenDatabase';
import HomeHelpTutorial from './HomeHelpTutorial';

export default function StoreInformationGenerator() {
  const db = getDatabase();
  const [storeName, setStoreName] = useState('Store Name');
  const actionState = useSelector(selectStoreNameAction);

  useEffect(() => {
    const readOnly = true;
    db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync(
        `SELECT storename FROM store`,
      );
      // console.log(result.rows[0]['storename']);
      setStoreName(result.rows[0]['storename']);
    }, readOnly);
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
      <View className="flex-row mt-5">
        <Link
          href={{
            pathname: '/(tabs)/editStoreName',
            params: {
              storeName: storeName,
            },
          }}
          asChild
        >
          <Pressable className="flex-1 pt-2">
            <View className="flex-row">
              <Text className="text-5xl ml-5 font-semibold text-green">
                {storeName}
              </Text>
            </View>
          </Pressable>
        </Link>

        <HomeHelpTutorial />
      </View>

      <Text className="text-sm ml-5 pb-2">
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
