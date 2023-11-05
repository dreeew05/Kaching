// DayStarter.tsx
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, View, Text } from "react-native";

export default function DayStarter({ hasStartDayData, cashierName }: { hasStartDayData: boolean, cashierName: string }) {
    const router = useRouter();

    const startDay = () => {
        router.push('/(tabs)/startDayInput');
    }

    return (
        <View>
            {hasStartDayData ? (
                // Render nothing when startDayData is available
                 <Text className="text-sm ml-5 mb-5">Cashier's Name: {cashierName}</Text>
            ) : (
                // Render Start Day Pressable when data is not available
                <Pressable className="bg-transparent w-36 border-2 border-green rounded-xl py-2 px-4 mt-2 mb-5 ml-5" onPress={startDay}>
                    <View className="flex-row items-center">
                        <FontAwesome5 name="plus" size={20} color="darkgreen" />
                        <Text className="text-green text-base ml-3 font-bold mr-3">
                            Start Day
                        </Text>
                    </View>
                </Pressable>
            )}

        </View>
    )
}
