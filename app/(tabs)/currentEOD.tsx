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

interface TableData {
  header: string[];
  tableData: string[][];
}

const query: string = `
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
    WHERE eods.iscurrent = 1
    GROUP BY eods.contactnum, eods.cashiername, category.name, item.name
    ORDER BY eods.contactnum, eods.cashiername, category.name, item.name;
  `;

export default function currentEOD() {
  const params = useLocalSearchParams();
  const { count } = params;

  const [currentEOD, setCurrentEOD] = useState<SQLResultSet | null>(
    null,
  );
  const [storeInfo, setStoreInfo] = useState<SQLResultSet | null>(
    null,
  );
  const [storeInfo2, setStoreInfo2] = useState<SQLResultSet | null>(
    null,
  );
  const [cashierName, setCashierName] =
    useState<string>('cashierName');
  const [contactNumber, setContactNumber] =
    useState<string>('Contact Number');
  const [pettyCash, setPettyCash] = useState<number>(0);

  // TEST DATA
  const db = getDatabase();
  const fetchCurrentEODData = () => {
    db.transaction((tx) => {
      tx.executeSql(query, [], (tx, results) => {
        setCurrentEOD(results);
      });
    });

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT pettycash FROM eods WHERE iscurrent = 1;',
        [],
        (txObj, resultSet) => {
          if (resultSet.rows.length > 0) {
            setPettyCash(resultSet.rows.item(0).pettycash);
          }
        },
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM eods WHERE iscurrent = 1;',
        [],
        (txObj, resultSet) => {
          if (resultSet.rows.length > 0) {
            setCashierName(resultSet.rows.item(0).cashiername);
            setContactNumber(resultSet.rows.item(0).contactnum);
          }
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
    fetchStoreInfo2();
    console.log(count);
  }, [count]);

  // enumerate all categories in the currentEOD
  let categories: string[] = [];
  currentEOD?.rows._array.forEach((item) => {
    if (!categories.includes(item.category_name)) {
      categories.push(item.category_name);
    }
  });

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
      className="bg-white "
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
      }}
    >
      <View className=" mx-5 bg-white " style={styles.container}>
        <Text className="font-bold text-xl text-green">
          {storeInfo2?.rows._array[0].storename}
        </Text>
        <Text className="text-m text-green">Miagao, Iloilo</Text>
        <Text className="text-m text-green">{cashierName}</Text>
        <Text className="text-m text-green">{contactNumber}</Text>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        <Text className="text-l text-black">CURRENT DAY REPORT</Text>
        <Text className="text-l text-black">
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
          <Text className="font-bold text-l content-center self-center text-black mb-3">
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
        <View className="bg-white">
          <Text className="font-bold text-l content-center self-center items-center mt-2 text-black">
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
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
});
