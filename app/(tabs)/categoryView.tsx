import React from 'react';
import { Text } from '../../components/Themed';
import { ScrollView, View } from 'react-native';
import ItemCard from '../../components/Product/ItemCard';
import { useLocalSearchParams } from 'expo-router';
import TestProductInterface from '../../utils/testProductInterface';

// TEST DATA
import testAppetizerData from '../../utils/testAppetizerData';
import testBeverageData from '../../utils/testBeveragesData';

// CONSTANT DATA
import constantProductImages from '../../constants/Products';

// HELPER
import ParamsToInteger from '../../components/__utils__/helper/ParamsToInteger';
import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';

export default function CategoryViewScreen() {
  const param = useLocalSearchParams();

  // TEST
  // [START]
  interface productProps {
    name: string;
    data: TestProductInterface[];
  }

  interface testDataProps {
    [id: number]: productProps;
  }

  const testData: testDataProps = {
    10000: {
      name: 'Appetizer',
      data: testAppetizerData,
    },
    10001: {
      name: 'Beverages',
      data: testBeverageData,
    },
  };

  const id: number = ParamsToInteger(param.id);
  const products: TestProductInterface[] = testData[id].data;
  const categoryName: string = testData[id].name;
  // [END]

  return (
    <Provider store={Store}>
      <View className="flex-1 self-stretch bg-white dark:bg-black">
        <Text className="text-4xl text-green ml-5 mb-5" style={{ fontFamily: 'Poppins-Bold' }}>
          {categoryName}
        </Text>
        {/* <Pressable onPress={gotToItemScreen}> */}
        <ScrollView className="p-2">
          {products.map((product) => {
            product.image = constantProductImages[product.id];
            return <ItemCard key={product.id} item={product} />;
          })}
        </ScrollView>
        {/* </Pressable> */}
      </View>
    </Provider>
  );
}
