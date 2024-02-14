import { Alert, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import FinancialSummary from '../../components/Report/FinancialSummaryTable';
import ShareCSV from '../../components/Report/ShareCSV';
import CategoryTable from '../../components/Report/CategoryTable';
import { ScrollView } from 'react-native-gesture-handler';
import { getDatabase } from '../../components/DatabaseUtils/OpenDatabase';
import { useEffect, useState } from 'react';
import { SQLResultSet } from 'expo-sqlite';

interface TableData {
  header: string[];
  tableData: string[][];
}



export default function currentEOD() {

  const [currentEOD, setCurrentEOD] = useState<SQLResultSet|null>(null);
  const [storeInfo, setStoreInfo] = useState<SQLResultSet|null>(null);
  const [storeInfo2, setStoreInfo2] = useState<SQLResultSet|null>(null);


  // TEST DATA
  const db = getDatabase();
  const fetchCurrentEODData = () => {
  db.transaction(tx => {
    tx.executeSql(`
    SELECT e.eod_id, e.cashiername, e.contactnum, 
    e.pettycash, e.start, e.end, r.receipt_id, r.total, 
    r.amount_paid, r.timestamp, r.mode_of_payment, 
    i.name AS item_name, c.name AS category_name
    FROM eods e
    JOIN eod_receipts er ON e.eod_id = er.eod_id
    JOIN receipts r ON er.receipt_id = r.receipt_id
    JOIN receipt_items ri ON r.receipt_id = ri.receipt_id
    JOIN item i ON ri.item_id = i.id
    JOIN category_items ci ON i.id = ci.item_id
    JOIN category c ON ci.category_id = c.id
    WHERE e.iscurrent = 0
    ORDER BY e.end DESC;
  `,
      [],
      (tx, results) => {
        setCurrentEOD(results);
        console.log(results.rows._array);
      },
    )
  })
}
  const fetchStoreInfo = () => {
    db.transaction(tx => {
      tx.executeSql(`
      SELECT * FROM eods e WHERE e.iscurrent = 0`,
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
        tableData.push([item.item_name, 'x' + item.total_quantity, '₱' + item.total_sales]);
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
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={styles.container}>
        {/* <Text className="font-bold text-xl text-green">{storeInfo2?.rows._array[0].storename}</Text> */}
        <Text className="text-m">Miagao, Iloilo</Text>
        {/* <Text className="text-m">{storeInfo?.rows._array[0].cashiername}</Text> */}
        <Text className="text-m">09133287645</Text>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <Text className="text-l">END OF DAY REPORT</Text>
        <Text className="text-l">{
          date.toISOString().slice(0, 10)+" "
          //add leading zero to hours, minutes, and seconds if less than 10
          +("0"+date.getHours()).slice(-2)+":"+("0"+date.getMinutes()).slice(-2)+":"
          +("0"+date.getSeconds()).slice(-2)
          }</Text>

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
            {tables.map
              ((table) => { return (
                  <CategoryTable table={table} />
                );})
              }
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
