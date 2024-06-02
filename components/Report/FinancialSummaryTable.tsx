import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Table, Rows } from 'react-native-table-component';
import { getDatabase } from '../DatabaseUtils/OpenDatabase';
import { SQLResultSet, SQLiteCallback } from 'expo-sqlite';

interface FinancialSummaryProps {
  totalCash: number;
  totalOnline: number;
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({
  totalCash,
  totalOnline,
}) => {
  const tableData = [
    ['Cash Total', '₱ ' + `${totalCash.toFixed(2)}`, ,],
    ['Cash Total', '₱ ' + `${totalOnline.toFixed(2)}`, ,],
    ['Grand Total', '₱ ' + `${(totalCash + totalOnline).toFixed(2)}`],
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
