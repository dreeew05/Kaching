import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import CategoryList from '../Category/CategoryList';
import { selectAllCategories } from '../DatabaseUtils/FetchInstructions/SelectAllCategories';

export default function CategoryGenerator() {
  const router = useRouter();

  const categoryData = selectAllCategories();

  const editCategories = () => {
    router.push('/(tabs)/modifyCategoryView');
  };

  const textStyle = StyleSheet.create({
    text: {
      fontFamily: 'Poppins-Regular',
      fontSize: 30,
      color: 'grey',
    },
  });

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

      {categoryData.length > 0 ? (
        <CategoryList
          cardType={'clickable'}
          categories={categoryData}
        />
      ) : (
        <View
          className="flex-1 h-[400] m-5 p-5 rounded-md items-center justify-center"
          style={{
            borderColor: 'grey',
            borderWidth: 1,
          }}
        >
          <View className="flex-row">
            <Text style={textStyle.text}>Press</Text>
            <View className="w-2"></View>
            <View className="mt-2">
              <Pressable onPress={editCategories}>
                <FontAwesome5
                  name="edit"
                  size={30}
                  color="darkgreen"
                />
              </Pressable>
            </View>
          </View>
          <Text style={textStyle.text}>to add categories</Text>
        </View>
      )}
    </View>
  );
}
