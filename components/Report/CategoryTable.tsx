import { StyleSheet, View } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';

interface CategoryTableProps {
  header: string[];
  tableData: string[][];
}

type TableProps = CategoryTableProps;

const CategoryTable = (props: { table: TableProps }) => {
  return (
    <View className="ml-10" style={styles.container}>
      <View style={{ marginBottom: 8 }}></View>
      <Table>
        <Row
          data={props.table.header}
          // style={styles.rowTextHeader}
          textStyle={styles.headerTextStyle}
        />
        <Rows
          data={props.table.tableData}
          flexArr={[2, 1, 1.5]}
          textStyle={styles.rowText}
        />
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: 350 },
  // rowTextHeader: { margin: 5 },
  headerTextStyle: { fontSize: 14, fontFamily: 'Poppins-Bold' },
  rowText: {
    margin: 5,
    paddingLeft: 2,
    justifyContent: 'space-between',
  },
});

export default CategoryTable;
