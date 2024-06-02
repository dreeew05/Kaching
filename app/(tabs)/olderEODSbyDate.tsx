import { Alert, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import FinancialSummary from '../../components/Report/FinancialSummaryTable';
import ShareCSV from '../../components/Report/ShareCSV';
import CategoryTable from '../../components/Report/CategoryTable';
import { ScrollView } from 'react-native-gesture-handler';
import { getDatabase } from '../../components/DatabaseUtils/OpenDatabase';
import { useEffect, useState } from 'react';
import { SQLResultSet } from 'expo-sqlite';
import { useLocalSearchParams } from 'expo-router';

function convertToString(value: string | string[]): string {
  return Array.isArray(value) ? value.join(', ') : value;
}

const query = `
    SELECT 
    eods.cashiername AS cashier_name,
    category.name AS category_name, 
    item.name AS item_name,
    SUM(receipt_items.quantity) AS total_quantity,
    SUM(receipt_items.quantity * receipt_items.price) AS total_sales,
    SUM(CASE WHEN receipts.mode_of_payment = 'cash' THEN receipt_items.quantity * receipt_items.price ELSE 0 END) AS total_cash,
    SUM(CASE WHEN receipts.mode_of_payment = 'online' THEN receipt_items.quantity * receipt_items.price ELSE 0 END) AS total_online
    FROM receipt_items
    JOIN item ON receipt_items.item_id = item.id
    JOIN category ON item.category_id = category.id
    JOIN receipts ON receipt_items.receipt_id = receipts.receipt_id
    JOIN eod_receipts ON receipts.receipt_id = eod_receipts.receipt_id
    JOIN eods ON eod_receipts.eod_id = eods.eod_id
    WHERE eods.iscurrent = 0 
      AND DATE(eods.end) = ?
    GROUP BY eods.cashiername, category.name, item.name
    ORDER BY eods.cashiername, category.name, item.name;
  `;

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
  const [datePicked, setDatePicked] = useState<SQLResultSet | null>(
    null,
  );

  // TEST DATA
  const db = getDatabase();

  const params = useLocalSearchParams();
  const { DateID } = params;

  const fetchCurrentEODData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [convertToString(DateID)],
        (tx, results) => {
          setCurrentEOD(results);
          console.log('eods results: ' + results.rows.length);
        },
      );
    });
  };
  const fetchStoreInfo = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `
      SELECT * 
      FROM eod_receipts 
      `,
        [convertToString(DateID)],
        (tx, results) => {
          setStoreInfo(results);
          console.log(
            'check all eods' +
              results.rows.length +
              convertToString(DateID),
          );
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
    fetchStoreInfo2();
    fetchStoreInfo();
    fetchCurrentEODData();
  }, [DateID]);

  let totalCash = 0;
  let totalOnline = 0;
  if (currentEOD) {
    for (let index = 0; index < currentEOD?.rows.length; index++) {
      totalCash += currentEOD?.rows._array[index].total_cash;
      totalOnline += currentEOD?.rows._array[index].total_online;
      console.log(
        'total cash:' + currentEOD?.rows._array[index].total_cash,
      );
    }
  }
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
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
      }}
    >
      <View style={styles.container}>
        <Text className="font-bold text-xl text-green">
          {storeInfo2?.rows._array[0].storename}
        </Text>
        <Text className="text-m">Miagao, Iloilo</Text>
        <Text className="text-m">
          {currentEOD?.rows._array[0]?.cashier_name}
        </Text>
        <Text className="text-m">09133287645</Text>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        <Text className="text-l">END OF DAY REPORT</Text>
        <Text className="text-l">
          {datePicked?.rows._array[0].date}
        </Text>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        {/* START FINANCIAL SUMMARY */}
        <View>
          <Text className="font-bold text-l content-center">
            Financial Summary
          </Text>
          <FinancialSummary
            totalCash={totalCash}
            totalOnline={totalOnline}
          />
        </View>
        {/* END FINANCIAL SUMMARY */}

        {/* START ORDER SUMMARY */}
        <View>
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
