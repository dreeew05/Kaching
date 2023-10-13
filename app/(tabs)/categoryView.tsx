import React from 'react';
import { Text } from '../../components/Themed';
import { ScrollView, View } from 'react-native';
import ItemCard from '../../components/ItemCard';


export default function CategoryView() {
  //dummy items
  const dummyItems = [
    { id: 1, name: 'Item 1', price: 5.99, image: 'https://www.brothersburger.com.ph/cdn/shop/products/brothersburgerwcheese_2048x2048.jpg?v=1628044829' },
    { id: 2, name: 'Item 2', price: 7.49, image: 'https://www.brothersburger.com.ph/cdn/shop/products/brothersburgerwcheese_2048x2048.jpg?v=1628044829' },
    { id: 3, name: 'Item 3', price: 9.99, image: 'https://www.brothersburger.com.ph/cdn/shop/products/brothersburgerwcheese_2048x2048.jpg?v=1628044829' },
    { id: 4, name: 'Item 4', price: 4.99, image: 'https://www.brothersburger.com.ph/cdn/shop/products/brothersburgerwcheese_2048x2048.jpg?v=1628044829' },
  ];
  
  return (
    <View className="flex-1 self-stretch bg-white dark:bg-black">
      <Text className="text-5xl text-green font-bold ml-2">Beverages</Text>
      <ScrollView className="p-2">
        {dummyItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}
