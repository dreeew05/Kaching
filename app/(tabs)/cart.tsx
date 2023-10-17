import { useRouter } from 'expo-router';
import { Alert, Pressable, Text, View, Dimensions } from 'react-native';


// TEST DATA
import testCartData from '../../utils/testCartData';

export default function TabOneScreen() {
  
    const showAlert = () => {
        Alert.alert('Show Alert Action', 'This is a dummy action.');
    };

      // GO TO MODIFY CATEGORIES PAGE
    const router = useRouter();
    const viewOrderSummary = () => {
        router.push('/(tabs)/orderSummary');
    }
      
    return (
    <View>
    </View>
  );
}


