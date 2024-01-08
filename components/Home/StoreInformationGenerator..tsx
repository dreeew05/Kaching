import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function StoreInformationGenerator() {
  return (
    <View>

      <Link href="/(tabs)/editStoreName" asChild>
          <Pressable className="">
            <Text className="text-5xl ml-5 font-semibold text-green">Store Name</Text>
          </Pressable>
      </Link>
      
      <Text className="text-sm ml-5">October 24, 2023</Text>
    </View>
  );
}
