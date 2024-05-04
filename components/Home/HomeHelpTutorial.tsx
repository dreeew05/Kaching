import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HelpModal from '../Modals/HelpModal';
import { View } from '../Themed';

export default function HomeHelpTutorial() {
  const [isStartModalVisible, setStartModalVisible] = useState(false);
  const [startDayModalVisible, setStartDayModalVisible] =
    useState(false);
  const [isEditCategoryModalVisible, setEditCategoryModalVisible] =
    useState(false);
  const [isClickCategoryModalVisible, setClickCategoryModalVisible] =
    useState(false);

  return (
    <View className="bg-white">
      <TouchableOpacity
        className="mr-5"
        onPress={() => setStartModalVisible(true)}
      >
        <Entypo name="help-with-circle" size={35} color="#18573a" />
      </TouchableOpacity>

      {/* HELP MODALS */}
      <HelpModal
        marginTop={90}
        marginLeft={20}
        pointDirection="top-left"
        message="Tap to edit your store name."
        closeMessage="Continue"
        boxWidth={40}
        isVisible={isStartModalVisible}
        setVisible={setStartModalVisible}
        continueModal={() => setStartDayModalVisible(true)}
      />

      <HelpModal
        marginTop={130}
        marginLeft={160}
        pointDirection="left"
        message="Tapping the 'Start Day' button signifies the beginning of your business day. This ensures all sales and transactions from this point forward will be accurately recorded."
        closeMessage="Continue"
        boxWidth={80}
        isVisible={startDayModalVisible}
        setVisible={setStartDayModalVisible}
        continueModal={() => setEditCategoryModalVisible(true)}
      />

      <HelpModal
        marginTop={220}
        marginLeft={200}
        pointDirection="top-left"
        message="Create, edit, or delete categories."
        closeMessage="Continue"
        boxWidth={80}
        isVisible={isEditCategoryModalVisible}
        setVisible={setEditCategoryModalVisible}
        continueModal={setClickCategoryModalVisible}
      />

      <HelpModal
        marginTop={380}
        marginLeft={130}
        pointDirection="left"
        message="Display all the items available in a specific category."
        closeMessage="Done"
        boxWidth={70}
        isVisible={isClickCategoryModalVisible}
        setVisible={setClickCategoryModalVisible}
        continueModal={null}
      />
    </View>
  );
}
