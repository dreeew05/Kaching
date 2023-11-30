import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Table, Rows } from 'react-native-table-component';

const FinancialSummary = () => {
  const tableData = [
    ['Cash Total', 'P12,345.76'],
    ['Online Total', 'P12,345.76'],
    ['Grand Total', 'P12,345.76'],
    ['Petty Cash', 'P12,345.76'],
    ['Gross Total', 'P12,345.76'],
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
