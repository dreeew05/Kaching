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
        marginTop={70}
        marginLeft={20}
        pointDirection="top-left"
        message="This section displays the items you've selected from the menu, along with their quantities and prices."
        closeMessage="Continue"
        boxWidth={200}
        isVisible={isStartModalVisible}
        setVisible={setStartModalVisible}
        continueModal={() => setRemoveAllModalVisible(true)}
      />

      <HelpModal
        marginTop={30}
        marginLeft={140}
        pointDirection="right"
        message="Clear all items from the cart."
        closeMessage="Continue"
        boxWidth={200}
        isVisible={removeAllModalVisible}
        setVisible={setRemoveAllModalVisible}
        continueModal={() => setDeleteItemModalVisible(true)}
      />

      <HelpModal
        marginTop={95}
        marginLeft={40}
        pointDirection="right"
        message="Remove a specific  item from the cart."
        closeMessage="Continue"
        boxWidth={200}
        isVisible={deleteItemModalVisible}
        setVisible={setDeleteItemModalVisible}
        continueModal={() => setQuantityModalVisible(true)}
      />

      <HelpModal
        marginTop={250}
        marginLeft={95}
        pointDirection="top-right"
        message="Adjust item quantity in cart."
        closeMessage="Done"
        boxWidth={200}
        isVisible={quantityModalVisible}
        setVisible={setQuantityModalVisible}
        continueModal={() => setCheckoutModalVisible(true)}
      />

      <HelpModal
        marginTop={null}
        marginLeft={100}
        marginBottom={100}
        pointDirection="bottom-left"
        message="Proceed to checkout."
        closeMessage="Done"
        boxWidth={200}
        isVisible={checkoutModalVisible}
        setVisible={setCheckoutModalVisible}
        continueModal={null}
      />
    </View>
  );
}
