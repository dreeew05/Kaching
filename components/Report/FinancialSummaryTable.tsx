import React, { useEffect } from 'react';
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

  const fetchCurrentEODData = () => {
    db.transaction((tx) => {
      tx.executeSql(query, [time], (tx, results) => {
        setCurrentEODData(results);
      });
    });
  };

  useEffect(() => {
    // Code to run after component renders
    //get total cash from receipts table in db
    fetchCurrentEODData();
  }, [currentEODData]);

  const tableData = [
    [
      'Cash Total',
      '₱ ' +
        `${
          currentEODData?.rows?._array[0]?.total_cash
            ? currentEODData.rows._array[0].total_cash.toFixed(2)
            : 0
        }`,
      ,
    ],
    [
      'Cash Total',
      '₱ ' +
        `${
          currentEODData?.rows?._array[0]?.total_online
            ? currentEODData.rows._array[0].total_online.toFixed(2)
            : 0
        }`,
      ,
    ],
    [
      'Grand Total',
      '₱ ' +
        `${
          currentEODData?.rows?._array[0]?.total_cash &&
          currentEODData?.rows?._array[0]?.total_online
            ? (
                currentEODData?.rows?._array[0]?.total_cash +
                currentEODData?.rows?._array[0]?.total_online
              ).toFixed(2)
            : 0
        }`,
    ],
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
