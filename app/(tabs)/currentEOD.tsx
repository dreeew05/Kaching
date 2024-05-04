import { SQLResultSet } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getDatabase } from '../../components/DatabaseUtils/OpenDatabase';
import CategoryTable from '../../components/Report/CategoryTable';
import FinancialSummary from '../../components/Report/FinancialSummaryTable';
import ShareCSV from '../../components/Report/ShareCSV';
import { Text, View } from '../../components/Themed';

interface TableData {
  header: string[];
  tableData: string[][];
}

export default function currentEOD() {
  const [currentEOD, setCurrentEOD] = useState<SQLResultSet | null>(
    null,
  );
  const [storeInfo, setStoreInfo] = useState<SQLResultSet | null>(
    null,
  );
  const [storeInfo2, setStoreInfo2] = useState<SQLResultSet | null>(
    null,
  );

  // TEST DATA
  const db = getDatabase();
  const fetchCurrentEODData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT category.name AS category_name, item.name AS item_name,
    SUM(receipt_items.quantity) AS total_quantity,
    SUM(receipt_items.quantity * receipt_items.price) AS total_sales
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
      );
    });
  };
  const fetchStoreInfo = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `
      SELECT * FROM eods e WHERE e.iscurrent = 1`,
        [],
        (tx, results) => {
          setStoreInfo(results);
        },
      );
    });
  };

  const fetchStoreInfo2 = () => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM store`, [], (tx, results) => {
        setStoreInfo2(results);
      });
    });
  };

  useEffect(() => {
    fetchCurrentEODData();
    fetchStoreInfo();
    fetchStoreInfo2();
  }, [currentEOD]);

  // enumerate all categories in the currentEOD
  let categories: string[] = [];
  currentEOD?.rows._array.forEach((item) => {
    if (!categories.includes(item.category_name)) {
      categories.push(item.category_name);
    }
  });

  //assign each category as a header, and assign the items under each category as tableData
  let tables: TableData[] = [];
  categories.forEach((category) => {
    let tableData: any[] = [];
    currentEOD?.rows._array.forEach((item) => {
      if (item.category_name === category) {
        //include total sales in the tableData
        tableData.push([
          item.item_name,
          'x' + item.total_quantity,
          '₱' + item.total_sales,
        ]);
      }
    });
    tables.push({
      header: [category],
      tableData: tableData,
    });
  });

  //current date
  const date = new Date();

  return (
    <ScrollView
      className="bg-white"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
      }}
    >
      <View className="bg-white" style={styles.container}>
        <Text className="font-bold text-xl text-green">
          {storeInfo2?.rows._array[0].storename}
        </Text>
        <Text className="text-m text-green">Miagao, Iloilo</Text>
        <Text className="text-m text-green">
          {storeInfo?.rows._array[0].cashiername}
        </Text>
        <Text className="text-m text-green">09133287645</Text>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        <Text className="text-l  text-green">CURRENT DAY REPORT</Text>
        <Text className="text-l  text-green">
          {date.toISOString().slice(0, 10) +
            ' ' +
            //add leading zero to hours, minutes, and seconds if less than 10
            ('0' + date.getHours()).slice(-2) +
            ':' +
            ('0' + date.getMinutes()).slice(-2) +
            ':' +
            ('0' + date.getSeconds()).slice(-2)}
        </Text>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        {/* START FINANCIAL SUMMARY */}
        <View className="bg-white">
          <Text className="font-bold text-l content-center">
            Financial Summary
          </Text>
          <FinancialSummary />
        </View>
        {/* END FINANCIAL SUMMARY */}

        {/* START ORDER SUMMARY */}
        <View className="bg-white">
          <Text className="font-bold text-l content-center mt-2">
            Order Summary
          </Text>
          {tables.map((table) => {
            return <CategoryTable table={table} />;
          })}
        </View>
        {/* END ORDER SUMMARY */}

        <View className="mt-5 mb-5">
          <ShareCSV data={tables} />
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
