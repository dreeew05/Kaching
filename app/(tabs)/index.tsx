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
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          closeMessage="Continue"
          boxWidth={200}
          isVisible={isStartModalVisible}
          setVisible={setStartModalVisible}
          continueModal={() => setEditCategoryModalVisible(true)}
        />

        <HelpModal
          marginTop={220}
          marginLeft={200}
          pointDirection="top-left"
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          closeMessage="Continue"
          boxWidth={200}
          isVisible={isEditCategoryModalVisible}
          setVisible={setEditCategoryModalVisible}
          continueModal={setClickCategoryModalVisible}
        />

        <HelpModal
          marginTop={380}
          marginLeft={130}
          pointDirection="left"
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          closeMessage="Done"
          boxWidth={200}
          isVisible={isClickCategoryModalVisible}
          setVisible={setClickCategoryModalVisible}
          continueModal={null}
        />
      </View>
    </Provider>
  );
}
