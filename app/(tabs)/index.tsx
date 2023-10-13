import React from 'react';
import { Alert, Pressable, Text, View, Dimensions } from 'react-native';
import CategoryList from '../../components/CategoryList';

export default function TabOneScreen() {
  const showAlert = () => {
    Alert.alert('Show Alert Action', 'This is a dummy action.');
  };

  const categories = [
    {
      categoryName: 'Snacks',
      categoryImage:
        'https://www.brothersburger.com.ph/cdn/shop/products/brothersburgerwcheese_2048x2048.jpg?v=1628044829',
    },
    {
      categoryName: 'Beverages',
      categoryImage: 'https://img.freepik.com/premium-photo/coca-cola-bottle-new-style_812426-13670.jpg',
    },
    {
      categoryName: 'Dessert',
      categoryImage:
        'https://cdn.loveandlemons.com/wp-content/uploads/2021/06/summer-desserts.jpg',
    },
    {
      categoryName: 'Pizza',
      categoryImage: 'https://www.allrecipes.com/thmb/fFW1o307WSqFFYQ3-QXYVpnFj6E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/48727-Mikes-homemade-pizza-DDMFS-beauty-4x3-BG-2974-a7a9842c14e34ca699f3b7d7143256cf.jpg',
    },
    {
      categoryName: 'Ice Cream',
      categoryImage:
        'https://asset2.cxnmarksandspencer.com/is/image/mands/ac81c77347661bed32691865913177db1c124c66?$Style_living_700x700_IPAD$',
    },
    {
      categoryName: 'Main Course',
      categoryImage: 'https://media-cdn2.greatbritishchefs.com/media/k0vjtxog/img24741.jpg',
    },
    {
      categoryName: 'Bread',
      categoryImage:
        'https://www.referenceforbusiness.com/photos/bread-bakery-business-plan-437.jpg',
    },
    {
      categoryName: 'Cake',
      categoryImage: 'https://www.foodandwine.com/thmb/iLCY5qptXVfxd99IHZRrboMjRDU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chocolate-and-citrus-cassata-2-FT-RECIPE1219-c75e75f8cc9b44d78c6e7913c6cc1413.jpg',
    },
  ];

  return (
    <View className="flex-1 self-stretch bg-white dark:bg-black">
      <Text className="text-5xl ml-2 font-semibold text-green">Store Name</Text>

      <Pressable className="bg-transparent w-1/4 border-2 border-green rounded-md py-2 px-4 mt-2 mb-5 ml-2" onPress={showAlert}>
        <Text className="text-green font-bold inset-0">Start Day</Text>
      </Pressable>

      <View className="flex flex-row items-end">
        <Text className="text-3xl ml-2">Categories</Text>
        <Pressable className="bg-transparent w-9 h-7 border-2 border-green rounded-md py-1 mb-1 ml-2" onPress={showAlert}>
          <Text className="text-green font-bold self-center">Edit</Text>
        </Pressable>
      </View>
        <CategoryList categories={categories}/>
    </View>
  );
}
