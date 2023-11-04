import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router"
import { View, Text, Pressable } from "react-native";
import CategoryList from "../Category/CategoryList";

// TEST
import testData from '../../utils/testCategoryData';

export default function CategoryGenerator() {

    const router = useRouter();

    const editCategories = () => {
        router.push('/(tabs)/modifyCategoryView')
    }

    return(
        <View>
            <View className="flex flex-row items-end">
                <Text className="text-3xl font-base ml-5 text-darkgreen">
                    Categories
                </Text>
                <Pressable className="self-center ml-3"
                    onPress={editCategories}
                >
                    <FontAwesome5 name="edit" size={25} color="darkgreen" />
                </Pressable>
            </View>

            <CategoryList
                cardType={'clickable'}
                categories={testData}
            />
        </View>
    )
}