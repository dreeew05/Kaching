import { useState } from 'react';
import { View } from '../Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import HelpModal from '../Modals/HelpModal';

export default function HelpTutorial() {
  const [isStartModalVisible, setStartModalVisible] = useState(false);
  const [isEditCategoryModalVisible, setEditCategoryModalVisible] =
    useState(false);
  const [isClickCategoryModalVisible, setClickCategoryModalVisible] =
    useState(false);

  return (
    <View>
      <TouchableOpacity
        className="mr-5"
        onPress={() => setStartModalVisible(true)}
      >
        <Entypo name="help-with-circle" size={35} color="#18573a" />
      </TouchableOpacity>

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
  );
}
