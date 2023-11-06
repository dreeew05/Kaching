import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import FinancialSummary from '../../components/FinancialSummaryTable';
import CSVComponent from '../../components/ShareCSV';
import CategoryTable from '../../components/CategoryTable';
import { ScrollView } from 'react-native-gesture-handler';


export default function currentEOD() {
  // TEST DATA
  const table1 = 
    {
      header : ['Appetizer'],
      tableData : [['Mozarella Sticks', 'x25', 'P565.50'],
                  ['Bruschetta', 'x15', 'P25,000.00'],
                  ['Deviled Eggs', 'x100', 'P100.00']]
    }

  const table2 = 
    {
      header : ['Beverages'],
      tableData : [['Beer', 'x25', 'P565.50'],
                  ['Coke', 'x15', 'P25,000.00'],
                  ['Pepsi', 'x100', 'P100.00']]
    }

  const table3 = 
    {
      header : ['Desserts'],
      tableData : [['Mango Graham', 'x25', 'P565.50'],
                  ['Brownies', 'x15', 'P25,000.00'],
                  ['Muffins', 'x100', 'P100.00']]
    }

  const table4 = 
    {
      header : ['Desserts'],
      tableData : [['Mango Graham', 'x25', 'P565.50'],
                  ['Brownies', 'x15', 'P25,000.00'],
                  ['Muffins', 'x100', 'P100.00']]
    }
  // END TEST DATA
  

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
      <View style={styles.container}>
        <Text className='font-bold text-xl text-green'>
            Store Name
        </Text>
        <Text className='text-m'>
            Miagao, Iloilo
        </Text>
        <Text className='text-m'>
            Palmsdale Kevin Cordero
        </Text>
        <Text className='text-m'>
            09133287645
        </Text>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <Text className='text-l'>
            END OF DAY REPORT
        </Text>
        <Text className='text-l'>
            01/09/2023 5:45 AM
        </Text>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        {/* START FINANCIAL SUMMARY */}
        <View>
          <Text className='font-bold text-l content-center'>
              Financial Summary
          </Text>
          <FinancialSummary/>
        </View>
        {/* END FINANCIAL SUMMARY */}

        {/* START ORDER SUMMARY */}
        <View>
          <Text className='font-bold text-l content-center mt-2'>
              Order Summary
          </Text>
          <CategoryTable table={table1}/>
          <CategoryTable table={table2}/>
          <CategoryTable table={table3}/>
          <CategoryTable table={table4}/>
        </View>
        {/* END ORDER SUMMARY */}

        <View className='mt-5 mb-5'>
          <CSVComponent data={table3}/>
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
