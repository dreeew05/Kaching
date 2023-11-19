import { Table, Row, Rows } from "react-native-table-component";
import { View, StyleSheet } from "react-native";

interface CategoryTableProps {
    header: string[];
    tableData: string[][];
  }
  
  type TableProps = CategoryTableProps;
  
  const CategoryTable = (props: { table: TableProps }) => {

    return (
      <View style={styles.container} >
        <View style={{ marginBottom: 8 }}></View>
        <Table>
            <Row data={props.table.header} textStyle={styles.rowTextHeader} />
            <Rows data={props.table.tableData} flexArr={[2, 1, 1.5]} 
                textStyle={styles.rowText} 
            />
        </Table>
      </View>
    );
  }

const styles = StyleSheet.create({
    container : {width : 350, backgroundColor: 'transparent'},
    rowTextHeader : {margin : 5, color: 'white', },
    rowText : {margin: 5, paddingLeft: 15, justifyContent: 'space-between', color: 'white'}
})

export default CategoryTable;