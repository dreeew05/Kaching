import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import CategoryList from '../Category/CategoryList';
import { selectAllCategories } from '../DatabaseUtils/FetchInstructions/SelectAllCategories';

export default function CategoryGenerator() {
  const router = useRouter();

  const categoryData = selectAllCategories();

  const editCategories = () => {
    router.push('/(tabs)/modifyCategoryView');
  };

  return (
    <View className="">
      <View className="flex flex-row items-end mb-1py-3">
        <Text
          className="text-4xl font-base self-center items-center ml-5 text-darkgreen "
          style={{
            fontFamily: 'Poppins-Medium',
          }}
        >
          Categories
        </Text>
        <Pressable
          className=" w-1/5 self-centeritems-center mb-4 ml-5"
          onPress={editCategories}
        >
          <FontAwesome5 name="edit" size={30} color="darkgreen" />
        </Pressable>
      </View>

      <CategoryList
        cardType={'clickable'}
        categories={categoryData}
      />
    </View>
  );
}
