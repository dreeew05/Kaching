import { useRouter } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function PahuwayBanner() {
  const router = useRouter();

  const gotToHome = () => {
    router.push('../');
  };

  const gotToEOD = () => {
    router.push('/(tabs)/currentEOD');
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text
        style={{ fontFamily: 'Poppins-Regular' }}
        className="text-4xl font-bold text-yellow pb-5"
      >
        Pahuway Na!
      </Text>
      <Image
        className="mt-5 mb-8"
        source={require('../../assets/icons/eod.png')}
        style={{ width: 200, height: 200 }}
      />
      <Text>Day Ended Successfully!</Text>

      <View className="mt-7">
        {/* <View
          className="h-10 w-60 border-2 border-green
                    rounded-full flex-row justify-center items-center"
        >
          <TouchableOpacity onPress={gotToEOD}>
            <Text className="text-center">View EOD Report</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-center mt-2 mb-2">Or</Text> */}
        <View
          className="bg-green h-10 w-60 rounded-full
                    flex-row justify-center items-center"
        >
          <TouchableOpacity onPress={gotToHome}>
            <Text
              className="text-center
                            text-white font-bold"
            >
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
