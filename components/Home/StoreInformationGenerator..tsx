import { View, Text } from "react-native";

export default function StoreInformationGenerator() {
    return(
        <View>
            <Text className="text-5xl ml-5 font-semibold text-green">
                Store Name
            </Text>
            <Text className="text-sm ml-5">
                October 24, 2023
            </Text>
        </View>
    )
}