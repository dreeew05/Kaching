import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Rows, Table } from 'react-native-table-component';

interface FinancialSummaryProps {
  totalCash: number;
  totalOnline: number;
  pettyCash: number;
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({
  totalCash,
  totalOnline,
  pettyCash,
}) => {
  const tableData = [
    ['Cash Total', '₱ ' + `${totalCash.toFixed(2)}`, ,],
    ['Online Total', '₱ ' + `${totalOnline.toFixed(2)}`, ,],
    ['Petty Cash', '₱ ' + `${pettyCash.toFixed(2)}`, ,],
    ['Grand Total', '₱ ' + `${(totalCash + totalOnline + pettyCash).toFixed(2)}`],
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
  text: { margin: 5, marginLeft: 25 },
});

export default FinancialSummary;
