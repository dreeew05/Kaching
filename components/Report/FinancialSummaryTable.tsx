import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Table, Rows } from 'react-native-table-component';
import { getDatabase } from '../DatabaseUtils/OpenDatabase';
import { SQLResultSet, SQLiteCallback } from 'expo-sqlite';

interface FinancialSummaryProps {
  query: string;
  time: any;
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({
  query,
  time,
}) => {
  const db = getDatabase();
  const [currentEODData, setCurrentEODData] =
    React.useState<SQLResultSet | null>(null);
  const [currentEODData2, setCurrentEODData2] =
    React.useState<SQLResultSet | null>(null);
  const [totalCash, setTotalCash] = useState(0);
  const [totalOnline, setTotalOnline] = useState(0);

  const fetchCurrentEODData = () => {
    db.transaction((tx) => {
      tx.executeSql(query, [time], (tx, results) => {
        setCurrentEODData(results);
        let cash = 0;
        let online = 0;
        for (
          let index = 0;
          index < results.rows._array.length;
          index++
        ) {
          cash += results.rows._array[index].total_cash;
          setTotalCash(totalCash + cash);
          online = results.rows._array[index].total_online;
        }
        setTotalOnline(totalOnline + cash);
        setTotalOnline(totalOnline + online);
      });
    });
  };

  const fetchCurrentEODData2 = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT 
            e.eod_id,
            e.cashiername,
            e.start,
            e.end,
          SUM(CASE WHEN r.mode_of_payment = 'cash' THEN r.total ELSE 0 END) AS total_cash,
          SUM(CASE WHEN r.mode_of_payment = 'online' THEN r.total ELSE 0 END) AS total_online
          FROM 
              eods e
          JOIN 
              receipts r ON r.timestamp BETWEEN e.start AND e.end
          WHERE 
              DATE(e.end) = ?
          GROUP BY 
              e.eod_id, e.cashiername, e.start, e.end;`,
        [time],
        (tx, results) => {
          setCurrentEODData2(results);
          console.log(results.rows._array[0].total_cash);
        },
      );
    });
  };

  useEffect(() => {
    // Code to run after component renders
    //get total cash from receipts table in
    console.log(totalCash);
    fetchCurrentEODData();
  }, [currentEODData]);

  const tableData = [
    ['Cash Total', '₱ ' + `${totalCash}`, ,],
    ['Cash Total', '₱ ' + `${totalOnline}`, ,],
    ['Grand Total', '₱ ' + `${totalCash + totalOnline}`],
  ];

  return (
    <View style={styles.container}>
      <Table>
        <Rows
          data={tableData}
          textStyle={styles.text}
          flexArr={[2, 1]}
        />
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', width: 350 },
  text: { margin: 5 },
});

export default FinancialSummary;
