import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Link } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux';
import ModifyCategoryCardGenerator from '../../components/Category/ModifyCategoryCardGenerator';
import { Text, View } from '../../components/Themed';
import { Store } from '../../redux/Store';

export default function ModifyCategoryView() {
  return (
    <View className="flex-1 self-stretch bg-white px-2">
      <View className="flex flex-row bg-white">
        <Text
          className="text-4xl ml-2 font-semibold text-green py-5"
          style={{
            fontFamily: 'Poppins-Bold',
          }}
        >
          Categories
        </Text>
        <Link
          href={{
            pathname: '/(tabs)/modifyCategoryWrapper',
            params: {
              operation: 'addCategory',
            },
          }}
          asChild
        >
          <TouchableOpacity className="justify-center ml-3">
            <View className="h-8 w-8 bg-green justify-center items-center rounded-full">
              <FontAwesomeIcon
                icon={faPlus}
                size={20}
                style={{ color: '#ffffff' }}
              />
            </View>
          </TouchableOpacity>
        </Link>
      </View>

      <Provider store={Store}>
        <ModifyCategoryCardGenerator />
      </Provider>
    </View>
  );
}
