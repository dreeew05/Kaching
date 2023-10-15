import React from "react";
import { View, Text } from "../../components/Themed";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// TEST DATA
import testData from '../../utils/testCategoryData';
import CategoryList from "../../components/CategoryList";
import { useRouter } from "expo-router";

export default function modifyCategories() {
    const router = useRouter();
    const addCategory = () => {
        router.push('/(tabs)/addCategory')
    }
    return(
        <View className="flex-1 self-stretch bg-white 
            dark:bg-black">

            <View className="flex flex-row">
                <Text className="text-5xl ml-2 font-semibold text-green">
                    Categories
                </Text>
                <TouchableOpacity className="justify-center ml-3"
                    onPress={addCategory}>
                    <View className="h-6 w-6 bg-green justify-center items-center
                        rounded-full">
                        <FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Generate Categories [NOT CLICKABLE] */}
            <CategoryList
                cardType={'editable'}
                categories={testData}
            />

        </View>
    )
}