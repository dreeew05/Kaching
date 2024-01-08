import { Alert, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import FinancialSummary from '../../components/FinancialSummaryTable';
import ShareCSV from '../../components/ShareCSV';
import CategoryTable from '../../components/CategoryTable';
import { ScrollView } from 'react-native-gesture-handler';
import { insertData, selectData } from '../../components/DatabaseUtils/CoreFunctions';
import { getDatabase } from '../../components/DatabaseUtils/OpenDatabase';
import { useEffect, useState } from 'react';
import { SQLResultSet } from 'expo-sqlite';

export default function currentEOD() {

  const [currentEOD, setCurrentEOD] = useState<SQLResultSet|null>(null);
  const [storeInfo, setStoreInfo] = useState<SQLResultSet|null>(null);
  const [storeInfo2, setStoreInfo2] = useState<SQLResultSet|null>(null);


  // TEST DATA
  const db = getDatabase();
  const fetchCurrentEODData = () => {
  db.transaction(tx => {
    tx.executeSql(`SELECT category.name AS category_name, item.name AS item_name, SUM(receipt_items.quantity) AS total_quantity
    FROM receipt_items
    JOIN item ON receipt_items.item_id = item.id
    JOIN category ON item.category_id = category.id
    GROUP BY category_name, item_name
    ORDER BY category_name, item_name;
    `,
      [],
      (tx, results) => {
        setCurrentEOD(results);
      },
    )
  })
}
  const fetchStoreInfo = () => {
    db.transaction(tx => {
      tx.executeSql(`
      SELECT * FROM eods e WHERE e.iscurrent = 1`,
        [],
        (tx, results) => {
          setStoreInfo(results);
        },
      )
    })
  }

  const fetchStoreInfo2 = () => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM store`,
        [],
        (tx, results) => {
          setStoreInfo2(results);
        },
      )
    })
  }

  useEffect(() => { 
    fetchCurrentEODData();
    fetchStoreInfo();
    fetchStoreInfo2();
  }, []);

  const table1 = {
    header: ['Appetizer'],
    tableData: [
      ['Mozarella Sticks', 'x25', 'P565.50'],
      ['Bruschetta', 'x15', 'P25,000.00'],
      ['Deviled Eggs', 'x100', 'P100.00'],
    ],
  };

  const table2 = {
    header: ['Beverages'],
    tableData: [
      ['Beer', 'x25', 'P565.50'],
      ['Coke', 'x15', 'P25,000.00'],
      ['Pepsi', 'x100', 'P100.00'],
    ],
  };

  const table3 = {
    header: ['Desserts'],
    tableData: [
      ['Mango Graham', 'x25', 'P565.50'],
      ['Brownies', 'x15', 'P25,000.00'],
      ['Muffins', 'x100', 'P100.00'],
    ],
  };

  const table4 = {
    header: ['Desserts'],
    tableData: [
      ['Mango Graham', 'x25', 'P565.50'],
      ['Brownies', 'x15', 'P25,000.00'],
      ['Muffins', 'x100', 'P100.00'],
    ],
  };
  // END TEST DATA

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={styles.container}>
        <Text className="font-bold text-xl text-green">{storeInfo2?.rows._array[0].storename}</Text>
        <Text className="text-m">Miagao, Iloilo</Text>
        <Text className="text-m">{storeInfo?.rows._array[0].cashiername}</Text>
        <Text className="text-m">09133287645</Text>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <Text className="text-l">CURRENT DAY REPORT</Text>
        <Text className="text-l">{}</Text>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        {/* START FINANCIAL SUMMARY */}
        <View>
          <Text className="font-bold text-l content-center">Financial Summary</Text>
          <FinancialSummary />
        </View>
        {/* END FINANCIAL SUMMARY */}

        {/* START ORDER SUMMARY */}
        <View>
          <Text className="font-bold text-l content-center mt-2">Order Summary</Text>
          <CategoryTable table={table1} />
          <CategoryTable table={table2} />
          <CategoryTable table={table3} />
          <CategoryTable table={table4} />
        </View>
        {/* END ORDER SUMMARY */}

        <View className="mt-5 mb-5">
          <ShareCSV data={table3} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
