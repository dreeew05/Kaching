import React from 'react';
import { ScrollView, View } from 'react-native';
import StoreInformationGenerator from '../../components/Home/StoreInformationGenerator.';
import DayStarter from '../../components/Home/DayStarter';
import SaleDashboard from '../../components/Home/SaleDashboard';
import CategoryGenerator from '../../components/Home/CategoryGenerator';
import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import { getDatabase } from '../../components/DatabaseUtils/OpenDatabase';
import { setIsEditComponent } from '../../redux/GlobalStateRedux/GlobalStateSlice';

export default function HomeScreen() {
  
  // Hide/Show start day pressable
  let hasStartDayData = false;
  let cashierName = 'Palmsdale Kevin'; // Replace with the actual cashier name

  //check for start day data
  const db = getDatabase();
  // check if there iscurrent = 1 in eods table and if there is, set hasStartDayData to true
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM eods WHERE iscurrent = 1',
      [],
      (txObj, resultSet) => {
        if (resultSet.rows.length > 0) {
          hasStartDayData = true;
          cashierName = resultSet.rows.item(0).cashiername;
          console.log(cashierName);
        }
      },
      // (txObj, error) => {
      //   hasStartDayData = false;
      // }
    );
  });
  

  return (
    <Provider store={Store}>
      <View className="flex-1 self-stretch bg-white dark:bg-black">
        <ScrollView>
          <StoreInformationGenerator />

          <DayStarter hasStartDayData={hasStartDayData} 
            cashierName={cashierName} />

          <SaleDashboard />

          <CategoryGenerator />
        </ScrollView>
      </View>
    </Provider>
  );
}
