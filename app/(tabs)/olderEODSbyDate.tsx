import { useLocalSearchParams } from 'expo-router';
import { SQLResultSet } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getDatabase } from '../../components/DatabaseUtils/OpenDatabase';
import CategoryTable from '../../components/Report/CategoryTable';
import FinancialSummary from '../../components/Report/FinancialSummaryTable';
import ShareCSV from '../../components/Report/ShareCSV';
import { Text, View } from '../../components/Themed';

function convertToString(value: string | string[]): string {
  return Array.isArray(value) ? value.join(', ') : value;
}

const query = `
    SELECT 
    eods.cashiername AS cashier_name,
    eods.contactnum AS contact_num,
    eods.pettycash AS petty_cash,
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
      AND eods.eod_id = ?
    GROUP BY eods.contactnum, eods.cashiername, category.name, item.name
    ORDER BY eods.contactnum, eods.cashiername, category.name, item.name;
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
  const [pettyCash, setPettyCash] = useState<number>(0);

  // TEST DATA
  const db = getDatabase();

  const params = useLocalSearchParams();
  // const { number: eodID } = params;
  const eodID = convertToString(params.eodId);
  const date = convertToString(params.date);
  console.log('eodID: ' + eodID);

  const fetchCurrentEODData = () => {
    db.transaction((tx) => {
      tx.executeSql(query, [eodID], (tx, results) => {
        setCurrentEOD(results);
        console.log('eods results: ' + results.rows.length);
      });
    });

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT pettycash 
        FROM eods 
        WHERE eod_id = ?
        `,
        [eodID],
        (tx, results) => {
          setPettyCash(results.rows._array[0].pettycash);
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
      WHERE eod_id = ?
      `,
        [eodID],
        (tx, results) => {
          setStoreInfo(results);
          console.log(
            'check all eods' +
              results.rows.length +
              convertToString(eodID),
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
  }, [eodID]);

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
          '₱' + item.total_sales.toFixed(2),
        ]);
      }
    });
    tables.push({
      header: [category],
      tableData: tableData,
    });
  });

  //current date
  // const date = new Date();

  return (
    <ScrollView
      className="bg-white"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <View className="bg-white mt-5" style={styles.container}>
        <Text className="font-bold text-xl text-green mb-2">
          {storeInfo2?.rows._array[0].storename}
        </Text>
        <Text className="text-m text-black">Miagao, Iloilo</Text>
        <Text className="text-m text-black">
          {currentEOD?.rows._array[0]?.cashier_name}
        </Text>
        <Text className="text-m text-black">
          {currentEOD?.rows._array[0]?.contact_num}
        </Text>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="gray"
        />

        <Text className="text-l text-green font-semibold">
          END OF DAY REPORT
        </Text>
        <Text className="text-sm text-black">{date}</Text>

        <View
          style={styles.separator}
          // lightColor="black"
          darkColor="gray"
        />

        <View className="px-5 bg-white py-4">
          {/* START FINANCIAL SUMMARY */}
          <View className="bg-white mb-4">
            <Text className="font-bold text-l ml-8 text-black mb-2">
              Financial Summary
            </Text>
            <FinancialSummary
              totalCash={totalCash}
              totalOnline={totalOnline}
              pettyCash={pettyCash}
            />
          </View>
          {/* END FINANCIAL SUMMARY */}

          {/* START ORDER SUMMARY */}
          <View className="bg-white mb-4">
            <Text className="font-bold text-l content-center ml-8 mt-2 text-black mb-2">
              Order Summary
            </Text>
            {tables.map((table) => {
              return <CategoryTable table={table} />;
            })}
          </View>
          {/* END ORDER SUMMARY */}
        </View>

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
