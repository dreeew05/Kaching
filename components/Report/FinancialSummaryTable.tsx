import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Table, Rows } from 'react-native-table-component';
import { getDatabase } from '../DatabaseUtils/OpenDatabase';
import { SQLResultSet, SQLiteCallback } from 'expo-sqlite';

const FinancialSummary = () => {

  const db = getDatabase();
  const [currentEODData, setCurrentEODData] = React.useState<SQLResultSet | null>(null);

  const fetchCurrentEODData = () => {
    db.transaction(tx => {
      tx.executeSql(`
      SELECT
      SUM(CASE WHEN r.mode_of_payment = 'cash' THEN r.total ELSE 0 END) AS total_cash,
      SUM(CASE WHEN r.mode_of_payment = 'online' THEN r.total ELSE 0 END) AS total_online
      FROM eod_receipts er
      JOIN receipts r ON er.receipt_id = r.receipt_id
      JOIN eods e ON er.eod_id = e.eod_id
      WHERE e.iscurrent = 1;
      `,
        [],
        (tx, results) => {
          setCurrentEODData(results);
        },
      )
      }
    );

  }

  useEffect(() => {
    // Code to run after component renders
      //get total cash from receipts table in db
      fetchCurrentEODData();
  
  }, [currentEODData]);

  const tableData = [
    ['Cash Total', '₱ '+currentEODData?.rows._array[0].total_cash],
    ['Online Total', '₱ '+currentEODData?.rows._array[0].total_online],
    ['Grand Total', '₱ '+(currentEODData?.rows._array[0].total_cash + currentEODData?.rows._array[0].total_online)]
  ];

  return (
    <View style={styles.container}>
      <Table>
        <Rows data={tableData} textStyle={styles.text} flexArr={[2, 1]} />
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', width: 350 },
  text: { margin: 5 },
});

export default FinancialSummary;
