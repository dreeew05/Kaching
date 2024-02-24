import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import StoreInformationGenerator from '../../components/Home/StoreInformationGenerator.';
import DayStarter from '../../components/Home/DayStarter';
import CategoryGenerator from '../../components/Home/CategoryGenerator';
import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import { Entypo } from '@expo/vector-icons';
import HelpModal from '../../components/Modals/HelpModal';

export default function HomeScreen() {
  const [isStartModalVisible, setStartModalVisible] = useState(false);
  const [isEditCategoryModalVisible, setEditCategoryModalVisible] =
    useState(false);
  const [isClickCategoryModalVisible, setClickCategoryModalVisible] =
    useState(false);

  // Hide/Show start day pressable
  return (
    <Provider store={Store}>
      <View className="flex-1 self-stretch bg-white dark:bg-black">
        <ScrollView>
          <View className="flex-row">
            <View className="flex-1">
              <StoreInformationGenerator />
            </View>
            <TouchableOpacity
              className="mr-5"
              onPress={() => setStartModalVisible(true)}
            >
              <Entypo
                name="help-with-circle"
                size={35}
                color="#18573a"
              />
            </TouchableOpacity>
          </View>
          <DayStarter />
          <CategoryGenerator />
        </ScrollView>

        {/* HELP MODALS */}
        <HelpModal
          marginTop={125}
          marginLeft={160}
          pointDirection="left"
          isVisible={isStartModalVisible}
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          closeMessage="Continue"
          boxWidth={200}
          setVisible={setStartModalVisible}
        />
      </View>
    </Provider>
  );
}
