import { Alert, Pressable, Text, View, ScrollView, Dimensions } from 'react-native';
import CategoryCard from '../../components/CategoryCard';

export default function TabOneScreen() {
  const showAlert = () => {
    Alert.alert('Show Alert Action', 'This is a dummy action.');
  };

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 20) / 2; // 20 is the combined horizontal margin for two cards

  return (
    <View className="flex-1 self-stretch bg-white dark:bg-black">
      <Text className="text-5xl ml-2">Store Name</Text>

      <Pressable
        className="bg-transparent w-1/4 border-2 border-green rounded-md py-2 px-4 mt-2 mb-5 ml-2"
        onPress={showAlert}
      >
        <Text className="text-green font-bold inset-0">Start Day</Text>
      </Pressable>

      <View className="flex flex-row items-end">
        <Text className="text-3xl ml-2">Categories</Text>
        <Pressable
          className="bg-transparent w-9 h-7 border-2 border-green rounded-md py-1 mb-1 ml-2"
          onPress={showAlert}
        >
          <Text className="text-green font-bold self-center">Edit</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row">
          <View className='w-1/2'>
            <CategoryCard
              categoryName="Snacks"
              categoryImage="https://www.brothersburger.com.ph/cdn/shop/products/brothersburgerwcheese_2048x2048.jpg?v=1628044829"
            />
          </View>
          <View className='w-1/2'>
            <CategoryCard
              categoryName="Beverages"
              categoryImage="https://img.freepik.com/premium-photo/coca-cola-bottle-new-style_812426-13670.jpg"
            />
          </View>
        </View>
        <View className="flex-row">
          <View className='w-1/2'>
            <CategoryCard
              categoryName="Snacks"
              categoryImage="https://www.brothersburger.com.ph/cdn/shop/products/brothersburgerwcheese_2048x2048.jpg?v=1628044829"
            />
          </View>
          <View className='w-1/2'>
            <CategoryCard
              categoryName="Beverages"
              categoryImage="https://img.freepik.com/premium-photo/coca-cola-bottle-new-style_812426-13670.jpg"
            />
          </View>
        </View>
        <View className="flex-row">
          <View className='w-1/2'>
            <CategoryCard
              categoryName="Snacks"
              categoryImage="https://www.brothersburger.com.ph/cdn/shop/products/brothersburgerwcheese_2048x2048.jpg?v=1628044829"
            />
          </View>
          <View className='w-1/2'>
            <CategoryCard
              categoryName="Beverages"
              categoryImage="https://img.freepik.com/premium-photo/coca-cola-bottle-new-style_812426-13670.jpg"
            />
          </View>
        </View>
        <View className="flex-row">
          <View className='w-1/2'>
            <CategoryCard
              categoryName="Snacks"
              categoryImage="https://www.brothersburger.com.ph/cdn/shop/products/brothersburgerwcheese_2048x2048.jpg?v=1628044829"
            />
          </View>
          <View className='w-1/2'>
            <CategoryCard
              categoryName="Beverages"
              categoryImage="https://img.freepik.com/premium-photo/coca-cola-bottle-new-style_812426-13670.jpg"
            />
          </View>
        </View>
        <View className="flex-row">
          <View className='w-1/2'>
            <CategoryCard
              categoryName="Snacks"
              categoryImage="https://www.brothersburger.com.ph/cdn/shop/products/brothersburgerwcheese_2048x2048.jpg?v=1628044829"
            />
          </View>
          <View className='w-1/2'>
            <CategoryCard
              categoryName="Beverages"
              categoryImage="https://img.freepik.com/premium-photo/coca-cola-bottle-new-style_812426-13670.jpg"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
