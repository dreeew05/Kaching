import React, { useState } from 'react';
import { Text, View } from '../../components/Themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ParamsToInteger from '../../components/__utils__/helper/ParamsToInteger';
import { Provider } from 'react-redux';
import { DetailedItemProps } from '../../components/__utils__/interfaces/DetailedItemProps';
import DetailedItemScreen from '../../components/Product/DetailedItemScreen';
import { Store } from '../../redux/Store';

interface tesDataProps {
  [id: number]: DetailedItemProps;
}

// TEST DATA
// START

const testData: tesDataProps = {
  10000: {
    id: 10000,
    name: 'Mozarella Sticks',
    image: require('../../assets/images/products/10000.jpg'),
    price: 5.99,
    description: 'Sample Descrption 1',
    category: 'Appetizer',
  },
  10001: {
    id: 10001,
    name: 'Bruschetta',
    image: require('../../assets/images/products/10001.jpg'),
    price: 7.99,
    description: 'Sample Description 2',
    category: 'Appetizer',
  },
  10002: {
    id: 10002,
    name: 'Deviled Eggs',
    image: require('../../assets/images/products/10002.jpg'),
    price: 9.99,
    description: 'Sample Description 3',
    category: 'Appetizer',
  },
  10003: {
    id: 10003,
    name: ' Beer',
    image: require('../../assets/images/products/10003.jpg'),
    price: 1.99,
    description: 'Sample Description 4',
    category: 'Beverages',
  },
  10004: {
    id: 10004,
    name: 'Coca-Cola',
    image: require('../../assets/images/products/10004.jpg'),
    price: 1.99,
    description: 'Sample Description 5',
    category: 'Beverages',
  },
  10005: {
    id: 10005,
    name: 'Pepsi',
    image: require('../../assets/images/products/10005.jpg'),
    price: 1.99,
    description: 'Sample Description 6',
    category: 'Beverages',
  },
};

// END

export default function ItemScreen() {
  const param = useLocalSearchParams();

  const id: number = ParamsToInteger(param.id);
  const item: DetailedItemProps = testData[id];

  return (
    <Provider store={Store}>
      <View className="flex-1 h-full relative z-0">
        <DetailedItemScreen
          id={item.id}
          name={item.name}
          image={item.image}
          price={item.price}
          description={item.description}
          category={item.category}
        />
      </View>
    </Provider>
  );
}
