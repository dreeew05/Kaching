import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import FinancialSummary from '../../components/FinancialSummaryTable';
import CSVComponent from '../../components/ShareCSV';
import CategoryTable from '../../components/CategoryTable';
import { ScrollView } from 'react-native-gesture-handler';
import RainbowBackground from '../../components/Rainbow';


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
    <RainbowBackground>
      <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <View style={styles.container} >
          <Text className='font-bold text-xl text-white pt-16'>
              Store Name
          </Text>
          <Text className='text-m text-white'>
              Miagao, Iloilo
          </Text>
          <Text className='text-m text-white'>
              Palmsdale Kevin Cordero
          </Text>
          <Text className='text-m text-white'>
              09133287645
          </Text>

          <View style={styles.separator} lightColor="#000" darkColor="rgba(255,255,255,0.1)" />

          <Text className='text-l text-darkgreen'>
              END OF DAY REPORT
          </Text>
          <Text className='text-l text-darkgreen'>
              01/09/2023 5:45 AM
          </Text>

          <View style={styles.separator} lightColor="#000" darkColor="rgba(255,255,255,0.1)" />

          {/* START FINANCIAL SUMMARY */}
          <View className=' bg-transparent'>
            <Text className='font-bold text-l content-center text-white'>
                Financial Summary
            </Text>
            <FinancialSummary/>
          </View>
          {/* END FINANCIAL SUMMARY */}

          {/* START ORDER SUMMARY */}
          <View className='bg-transparent'>
            <Text className='font-bold text-l content-center mt-2 text-white '>
                Order Summary
            </Text>
            <CategoryTable table={table1}/>
            <CategoryTable table={table2}/>
            <CategoryTable table={table3}/>
            <CategoryTable table={table4}/>
          </View>
          {/* END ORDER SUMMARY */}

          <View className='mt-5 mb-5 bg-transparent'>
            <CSVComponent data={table3}/>
          </View>
        </View>
      </ScrollView>
    </RainbowBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : 'transparent',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
