import React from "react";
import { View, Text } from "../../components/Themed";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useRouter } from "expo-router";
import CategoryList from "../../components/Category/CategoryList";

// TEST DATA
import testData from '../../utils/testCategoryData';

export default function ModifyCategoryView() {
    const router = useRouter();
    return(
        <View className="flex-1 self-stretch bg-white 
            dark:bg-black">

            <View className="flex flex-row">
                <Text className="text-5xl ml-2 font-semibold text-green">
                    Categories
                </Text>
                <Link href={{
                    pathname : "/(tabs)/modifyCategory",
                    params : {
                        operation : 'addCategory'
                    }
                }} asChild>
                    <TouchableOpacity className="justify-center ml-3">
                        <View className="h-6 w-6 bg-green justify-center 
                            items-center rounded-full"
                        >
                            <FontAwesomeIcon icon={faPlus} 
                                style={{color: "#ffffff",}} 
                            />
                        </View>
                    </TouchableOpacity>
                </Link>
            </View>

            {/* Generate Categories [NOT CLICKABLE] */}
            <CategoryList
                cardType={'editable'}
                categories={testData}
            />

        </View>
    )
}