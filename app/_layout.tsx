import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, View, Pressable, TouchableHighlight } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import TermsAndConditionsScreen from './TermsAndConScreen';
import { initializeDatabase } from '../components/DatabaseUtils/InitializeDatabase';
import { insertData } from '../components/DatabaseUtils/CoreFunctions';
import { getDatabase } from '../components/DatabaseUtils/OpenDatabase';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Define the onboarding images
const onboardingImages = [
  require('../assets/images/onboarding/Onboarding1.png'),
  require('../assets/images/onboarding/Onboarding2.png'),
  require('../assets/images/onboarding/Login.png'),
];

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    ...FontAwesome.font,
  });

  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [storeName, setStoreName] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const handleConfirm = () => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO store(storename) VALUES (?)',
        [storeName],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Success');
          } else {
            console.log('Failed');
          }
        }
      );
    });
    setOnboardingCompleted(true);
  };

  if (!loaded) {
    return null;
  }

  if (!onboardingCompleted) {
    initializeDatabase();
    return (
      <View style={{ flex: 1 }}>
        <OnboardingScreen
          image={onboardingImages[currentImageIndex]}
          storeName={storeName}
          setStoreName={setStoreName}
          onConfirm={handleConfirm}
          onComplete={() => setCurrentImageIndex(currentImageIndex + 1)}
          isLastPage={currentImageIndex === onboardingImages.length - 1}
          onTermsPress={() => setShowTermsModal(true)}
        />
        <TermsAndConditionsScreen
          visible={showTermsModal}
          onClose={() => setShowTermsModal(false)}
        ></TermsAndConditionsScreen>
      </View>
    );
  } else {
    // Navigate to RootLayoutNav
    return <RootLayoutNav />;
  }
}

function OnboardingScreen({
  image,
  storeName,
  setStoreName,
  onComplete,
  isLastPage,
  onTermsPress,
  onConfirm,
}) {
  
  //Set store name
  const tableName = 'main';
  

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Image source={image} className={'w-screen h-screen'} />

      {isLastPage ? (
        <View>
          <View className="ml-8 mr-8 mt-8 -inset-y-80">
            <Text className="text-lg text-gray font-semibold mb-1 mt-3">Store Name: </Text>
            <View className="border-b-gray border-b-2 opacity-50">
              <TextInput
                className="text-lg text-black font-medium mb-1"
                value={storeName}
                onChangeText={setStoreName}
                placeholder="Enter Store Name"
              />
            </View>

            <TouchableHighlight
              className={`w-64 self-center rounded-full p-3 mb-5 ${
                storeName.trim() === '' ? 'bg-gray' : 'bg-green'
              } mt-6`}
              onPress={onConfirm}
              disabled={storeName.trim() === ''} // Disable button if store name is empty
              underlayColor={'#789c8c'} // Change the underlay color when clicked
            >
              <Text className={`text-white text-xl font-bold self-center`}>Confirm</Text>
            </TouchableHighlight>
            <Text className={`text-gray mt-5 mb-1 self-center`}>
              By clicking confirm, you agree to our
            </Text>
            <Pressable onPress={onTermsPress}>
              <Text className={`text-yellow self-center`}>Show Terms and Conditions</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      <TouchableHighlight
        className={`w-3/5 self-center rounded-full p-3 mb-5 bg-green -inset-y-12`}
        onPress={onComplete}
        underlayColor={'#789c8c'} // Change the underlay color when clicked
      >
        <Text className={`text-white text-xl font-bold self-center `}>Next</Text>
      </TouchableHighlight>
    </View>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
