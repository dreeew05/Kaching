import React, { useState } from 'react';
import { Text, View } from '../../components/Themed';
import { useLocalSearchParams, useRouter } from "expo-router";
import ParamsToInteger from '../../components/__utils__/helper/ParamsToInteger';
import { Provider } from 'react-redux';
import { DetailedItemProps } from '../../components/__utils__/interfaces/DetailedItemProps';
import DetailedItemScreen from '../../components/Product/DetailedItemScreen';
import { Store } from '../../redux/Store';
import RainbowBackground from '../../components/Rainbow';
import { ExtendedDetailedItemProps } from '../../components/__utils__/interfaces/ExtendedDetailedItemProps';

interface tesDataProps {
  [id : number] : ExtendedDetailedItemProps
}

// TEST DATA
// START

const testData : tesDataProps = {
  10000 : {
    id : 10000,
    name : 'Mozarella Sticks',
    image : require('../../assets/images/products/10000.jpg'),
    price : 5.99,
    description : 'Mozarella Sticks are fried cheese snacks often served with dipping sauce',
    category : 'Appetizer',
    tags: ['Vegetarian', 'Dairy-free', 'Low-carb']
  },
  10001 : {
    id : 10001,
    name : 'Bruschetta',
    image : require('../../assets/images/products/10001.jpg'),
    price : 7.99,
    description : 'Bruschetta is toasted bread topped with diced tomatoes, garlic, basil, and olive oil—an Italian appetizer.',
    category : 'Appetizer',
    tags: ['Herby', 'Tangy', 'Summer Food']
  },
  10002 : {
    id : 10002,
    name : 'Deviled Eggs',
    image : require('../../assets/images/products/10002.jpg'),
    price : 9.99,
    description : 'Deviled eggs are halved hard-boiled eggs filled with a seasoned yolk mixture',
    category : 'Appetizer',
    tags: ['Keto', 'Party Food', 'Summer Food']
  },
  10003 : {
    id : 10003,
    name : ' Beer',
    image : require('../../assets/images/products/10003.jpg'),
    price : 1.99,
    description : 'Beer is a fermented alcoholic drink made from grains and flavored with hops.',
    category  : 'Beverages',
    tags: ['Lager', 'Gose', 'Malty', 'Hoppy']
  },
  10004 : {
    id : 10004,
    name : 'Coca-Cola',
    image : require('../../assets/images/products/10004.jpg'),
    price : 1.99,
    description : 'Coke is a caramel-flavored carbonated soft drink produced by Coca-Cola.',
    category  : 'Beverages',
    tags: ['Caffeine', 'Soda', 'Sweet']
  },
  10005 : {
    id : 10005,
    name : 'Pepsi',
    image : require('../../assets/images/products/10005.jpg'),
    price : 1.99,
    description : 'Pepsi is a popular cola soft drink produced by PepsiCo.',
    category  : 'Beverages',
    tags: ['Pary Drink', 'Soda', 'Sweet']
  },
}

// END

export default function ItemScreen(){

  const param = useLocalSearchParams();

  const id : number = ParamsToInteger(param.id);
  const item : ExtendedDetailedItemProps = testData[id];

  return (
    <Provider store={Store}>
      <RainbowBackground>
        <View className="flex-1 h-full relative z-0 pt-16">
          <DetailedItemScreen
            id={item.id}
            name={item.name}
            image={item.image}
            price={item.price}
            description={item.description}
            category={item.category}
            tags={item.tags}
          />
        </View>
      </RainbowBackground>
  
    </Provider>
  );
};

