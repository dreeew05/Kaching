// DayStarter.tsx
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, View, Text, Modal } from 'react-native';
import SaleDashboard from '../../components/Home/SaleDashboard';
import { getDatabase } from '../../components/DatabaseUtils/OpenDatabase';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectHasStartDay } from '../../redux/GlobalStateRedux/GlobalStateSelectors';

export default function DayStarter() {
  const [cashierName, setCashierName] =
    useState<string>('cashierName');

  //check for start day data
  const db = getDatabase();
  const hasStartDay = useSelector(selectHasStartDay);

  // check if there iscurrent = 1 in eods table and if there is, set hasStartDayData to true
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM eods WHERE iscurrent = 1',
      [],
      (txObj, resultSet) => {
        if (resultSet.rows.length > 0) {
          setCashierName(resultSet.rows.item(0).cashiername);
        }
      },
    );
  });

  const router = useRouter();

  console.log(hasStartDay);

  const startDay = () => {
    router.push('/StartDay');
  };

  const showComponent = () => {
    if (hasStartDay.isStartDay) {
      return (
        <View>
          <Text className="text-sm ml-5 mb-5">
            Cashier's Name: {cashierName}
          </Text>
          <SaleDashboard />
        </View>
      );
    } else if (!hasStartDay.isStartDay) {
      return (
        <View className="flex-row">
          <Pressable
            className="bg-transparent w-36 border-2 border-green 
              rounded-xl py-2 px-4 mt-2 mb-5 ml-5"
            onPress={startDay}
          >
            <View className="flex-row items-center">
              <FontAwesome5 name="plus" size={20} color="darkgreen" />
              <Text className="text-green text-base ml-3 font-bold mr-3">
                Start Day
              </Text>
            </View>
          </Pressable>
          <View>
            {/* <Modal
              animationType="fade"
              transparent={true}
              visible={isStartDayVisible}
              onRequestClose={() => {
                console.log('Modal has been closed.');
              }}
            >
              <View
                className="flex flex-row"
                style={{ marginTop: 125, marginLeft: 160 }}
              >
                <Entypo
                  name="triangle-left"
                  size={40}
                  color="#18573a"
                  style={{ marginRight: -13 }}
                />
                <View
                  className="p-5 rounded-md"
                  style={{ backgroundColor: '#18573a', width: 200 }}
                >
                  <Text className="color-white">
                    Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry.
                  </Text>
                </View>
              </View>
            </Modal> */}
          </View>
        </View>
      );
    }
  };

  return <View>{showComponent()}</View>;
}
