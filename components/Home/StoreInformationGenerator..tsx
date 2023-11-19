import { View, Text } from "react-native";

export default function StoreInformationGenerator() {
    return(
        <View>
            <Text className="text-5xl ml-5 font-semibold text-white">
                Store Name
            </Text>
            <Text className="text-sm ml-5 text-white">
                October 24, 2023
            </Text>
        </View>
    )
}