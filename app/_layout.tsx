import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  useColorScheme,
} from 'react-native';
import { initializeDatabase } from '../components/DatabaseUtils/InitializeDatabase';
import { getDatabase } from '../components/DatabaseUtils/OpenDatabase';
import TermsAndConditionsScreen from './TermsAndConScreen';

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
  require('../assets/images/onboarding/one.png'),
  require('../assets/images/onboarding/two.png'),
  require('../assets/images/onboarding/three.png'),
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

  const [onboardingCompleted, setOnboardingCompleted] =
    useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [storeName, setStoreName] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const opacity = useRef(new Animated.Value(1)).current;

  const db = getDatabase();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        // Hide image with transition when keyboard shows
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        // Show image with transition when keyboard hides
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT storename FROM store`,
        [],
        (_, result) => {
          if (result.rows.length > 0) {
            setOnboardingCompleted(true);
          }
        },
      );
    });
  }, []);

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
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO store(storename) VALUES (?);',
        [storeName],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Success inserting storname');
            setOnboardingCompleted(true);
          } else {
            console.log('Failed');
          }
        },
      );
    });
  };

  if (!loaded) {
    return null;
  }

  if (!onboardingCompleted) {
    initializeDatabase();
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <OnboardingScreen
          image={onboardingImages[currentImageIndex]}
          storeName={storeName}
          setStoreName={setStoreName}
          onConfirm={handleConfirm}
          onComplete={() =>
            setCurrentImageIndex(currentImageIndex + 1)
          }
          isLastPage={
            currentImageIndex === onboardingImages.length - 1
          }
          onTermsPress={() => setShowTermsModal(true)}
          isKeyboardVisible={isKeyboardVisible}
          opacity={opacity}
        />
        <TermsAndConditionsScreen
          visible={showTermsModal}
          onClose={() => setShowTermsModal(false)}
        ></TermsAndConditionsScreen>
      </KeyboardAvoidingView>
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
  isKeyboardVisible,
  opacity,
}) {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Animated.Image
        source={image}
        style={{
          resizeMode: 'cover',
          opacity: opacity, // Set opacity based on Animated value
        }}
        className="center"
      />

      {isLastPage ? (
        <View>
          <View className="ml-8 mr-8 mt-8">
            <Text className="text-lg text-gray font-semibold mb-1 mt-3">
              Store Name:{' '}
            </Text>
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
              <Text
                className={`text-white text-xl font-bold self-center`}
              >
                Confirm
              </Text>
            </TouchableHighlight>
            <Text className={`text-gray mt-5 mb-1 self-center`}>
              By clicking confirm, you agree to our
            </Text>
            <Pressable onPress={onTermsPress}>
              <Text className={`text-yellow self-center`}>
                Show Terms and Conditions
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <TouchableHighlight
          className={`w-3/5 self-center rounded-full p-3 mb-5 bg-green mt-5`}
          onPress={onComplete}
          underlayColor={'#789c8c'} // Change the underlay color when clicked
        >
          <Text
            className={`text-white text-xl font-bold self-center `}
          >
            Next
          </Text>
        </TouchableHighlight>
      )}
    </View>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="modal"
          options={{ presentation: 'modal' }}
        />
      </Stack>
    </ThemeProvider>
  );
}
