import { ScrollView } from 'react-native-gesture-handler';
import { Text, View } from '../../components/Themed';
import { useLocalSearchParams } from 'expo-router';
import {
  DefaultCategory,
  getDefaultCategories,
} from '../../constants/DefaultCategories';
import { Pressable, Image } from 'react-native';
import { getScreenHeight } from '../../constants/ScreenDimensions';

export default function SelectDefaultCategories() {
  const params = useLocalSearchParams();
  const categories =
    getDefaultCategories()[parseInt(params.id as string)][
      'categories'
    ];

  return (
    <View className="flex-1 bg-[#18573a] justify-center">
      <View className="items-center bg-transparent">
        <Text
          className="mb-10 text-xl color-white"
          style={{ fontFamily: 'Poppins-Medium' }}
        >
          Pick some categories to start
        </Text>
        <ScrollView style={{ height: getScreenHeight() * 0.625 }}>
          <View className="flex-row flex-wrap justify-center bg-transparent">
            {Object.values(categories).map(
              (category: DefaultCategory) => {
                return (
                  <Pressable
                    className="mx-5 my-3"
                    key={category.categoryId}
                  >
                    <View
                      className="flex flex-row rounded-lg justify-center"
                      style={{
                        backgroundColor: 'white',
                        padding: 10,
                      }}
                    >
                      <Image
                        source={category.image}
                        style={{ width: 60, height: 60 }}
                      />
                    </View>
                    <Text
                      className="text-center mt-2 color-white"
                      style={{ fontFamily: 'Poppins-Medium' }}
                    >
                      {category.name}
                    </Text>
                  </Pressable>
                );
              },
            )}
          </View>
        </ScrollView>
        <Pressable className="bg-white mt-10 py-2 px-10 rounded-full">
          <Text style={{ fontFamily: 'Poppins-Bold' }}>Confirm</Text>
        </Pressable>
      </View>
    </View>
  );
}
