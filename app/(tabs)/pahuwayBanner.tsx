import { useRouter } from "expo-router";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function PahuwayBanner() {

    const router = useRouter();

    const gotToHome = () => {
        router.push('../')
    }

    const gotToEOD = () => {
        router.push('/(tabs)/currentEOD')
    }

    return(
        <View className="flex-1 justify-center items-center">
            <Text className="text-lg font-bold">
                Pahuway Na!
            </Text>
            <Image
                className="mt-5 mb-5"
                source={require('../../assets/icons/eod.png')}
                style={{width: 300, height: 300}}
            />
            <Text>
                Day Ended Successfully!
            </Text>

            <View className="mt-7">
                <View className="h-10 w-60 border-2 border-green
                    rounded-full flex-row justify-center items-center"
                >
                    <TouchableOpacity onPress={gotToEOD}>
                        <Text className="text-center">
                            View EOD Report
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text className="text-center mt-2 mb-2">Or</Text>
                <View className="bg-green h-10 w-60 rounded-full
                    flex-row justify-center items-center"
                >
                    <TouchableOpacity onPress={gotToHome}> 
                        <Text className="text-center
                            text-white font-bold"
                        >
                            Back to Home
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}