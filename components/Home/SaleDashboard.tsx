import { View, Text } from "react-native";

export default function SaleDashboard() {
    return(
        <View className="flex-row mb-5 py-3 px-10 items-center shadow-lg
                    shadow-neutral-600 rounded-lg self-center bg-white"
        >
            <View>
                <Text className=" px-7 self-center text-center 
                    text-green text-3xl font-bold"
                >
                    $123.56
                </Text>
                <Text className=" px-7 self-center text-center text-black
                    text-sm opacity-50 font-base"
                >
                    Total Sales
                </Text>
            </View>
                <Text className=" self-center text-center text-gray 
                    text-5xl font-thin"
                >
                    |
                </Text>
            <View>
                <Text className=" px-7 self-center text-center text-green
                    text-3xl font-bold"
                >
                    123
                </Text>
                <Text className=" px-7 self-center text-center text-black
                    text-sm opacity-50 font-base"
                >
                    Orders
                </Text>
            </View>
        </View>
    )
}