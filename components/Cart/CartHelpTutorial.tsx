import { useState } from 'react';
import { View } from '../Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import HelpModal from '../Modals/HelpModal';

export default function CartHelpTutorial() {
  const [isStartModalVisible, setStartModalVisible] = useState(false);
  const [removeAllModalVisible, setRemoveAllModalVisible] =
    useState(false);
  const [deleteItemModalVisible, setDeleteItemModalVisible] =
    useState(false);
  const [quantityModalVisible, setQuantityModalVisible] =
    useState(false);
  const [checkoutModalVisible, setCheckoutModalVisible] =
    useState(false);

  return (
    <View>
      <TouchableOpacity
        className="ml-5"
        onPress={() => setStartModalVisible(true)}
      >
        <Entypo name="help-with-circle" size={35} color="#18573a" />
      </TouchableOpacity>

      {/* HELP MODALS */}
      <HelpModal
        marginTop={20}
        marginLeft={10}
        pointDirection="top-left"
        message="This section displays the items you've selected from the menu, along with their quantities and prices."
        closeMessage="Continue"
        boxWidth={50}
        isVisible={isStartModalVisible}
        setVisible={setStartModalVisible}
        continueModal={() => setRemoveAllModalVisible(true)}
      />

      <HelpModal
        marginTop={12}
        marginLeft={30}
        pointDirection="right"
        message="Clear all items from the cart."
        closeMessage="Continue"
        boxWidth={60}
        isVisible={removeAllModalVisible}
        setVisible={setRemoveAllModalVisible}
        continueModal={() => setDeleteItemModalVisible(true)}
      />

      <HelpModal
        marginTop={25}
        marginLeft={10}
        pointDirection="right"
        message="Remove a specific  item from the cart."
        closeMessage="Continue"
        boxWidth={50}
        isVisible={deleteItemModalVisible}
        setVisible={setDeleteItemModalVisible}
        continueModal={() => setQuantityModalVisible(true)}
      />

      <HelpModal
        marginTop={60}
        marginLeft={20}
        pointDirection="top-right"
        message="Adjust item quantity in cart."
        closeMessage="Continue"
        boxWidth={50}
        isVisible={quantityModalVisible}
        setVisible={setQuantityModalVisible}
        continueModal={() => setCheckoutModalVisible(true)}
      />

      <HelpModal
        marginTop={null}
        marginLeft={10}
        marginBottom={80}
        pointDirection="bottom-left"
        message="Proceed to checkout."
        closeMessage="Done"
        boxWidth={45}
        isVisible={checkoutModalVisible}
        setVisible={setCheckoutModalVisible}
        continueModal={null}
      />
    </View>
  );
}
