import React from "react";
import { View, Text } from "../../components/Themed";

// TEST DATA
import testData from '../../utils/testCategoryData';
import CategoryList from "../../components/CategoryList";

export default function modifyCategories() {
    return(
        <View className="flex-1 self-stretch bg-white 
            dark:bg-black">

            <Text className="text-5xl ml-2 font-semibold text-green">
                Categories
            </Text>

            {/* Generate Categories [NOT CLICKABLE] */}
            <CategoryList
                cardType={'regular'}
                categoryIDs={testData}
            />

        </View>
    )
}