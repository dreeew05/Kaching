import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import HelpModal from '../Modals/HelpModal';

export default function MenuHelpTutorial() {
  const [isStartModalVisible, setStartModalVisible] = useState(false);
  const [currenEODModalVisible, setCurrenEODModalVisible] =
    useState(false);
  const [previousEODModalVisible, setPreviousEODModalVisible] =
    useState(false);
  const [tosModalVisible, setTosModalVisible] = useState(false);
  const [policyModalVisible, setPolicyModalVisible] = useState(false);
  const [faqModalVisible, setFaqModalVisible] = useState(false);
  const [endDayModalVisible, setEndDayModalVisible] = useState(false);

  return (
    <View>
      <View className="flex flex-row justify-end mr-5 mb-3">
        <TouchableOpacity onPress={() => setStartModalVisible(true)}>
          <Entypo name="help-with-circle" size={35} color="#18573a" />
        </TouchableOpacity>
      </View>

      {/* HELP MODALS */}
      <HelpModal
        marginTop={30}
        marginLeft={20}
        pointDirection="bottom-left"
        message="Tap to view the current End of Day report."
        closeMessage="Continue"
        boxWidth={50}
        isVisible={isStartModalVisible}
        setVisible={setStartModalVisible}
        continueModal={() => setPreviousEODModalVisible(true)}
      />

      <HelpModal
        marginTop={95}
        marginLeft={20}
        pointDirection="top-left"
        message="See a detailed breakdown of your sales for a specific day within the last 30 days."
        closeMessage="Continue"
        boxWidth={50}
        isVisible={previousEODModalVisible}
        setVisible={setPreviousEODModalVisible}
        continueModal={() => setTosModalVisible(true)}
      />

      <HelpModal
        marginTop={72}
        marginLeft={20}
        pointDirection="bottom-left"
        message="See the legal terms and conditions governing your use of the Kaching app."
        closeMessage="Continue"
        boxWidth={50}
        isVisible={tosModalVisible}
        setVisible={setTosModalVisible}
        continueModal={() => setPolicyModalVisible(true)}
      />

      <HelpModal
        marginTop={140}
        marginLeft={20}
        pointDirection="top-left"
        message="Display information on how the Kaching app collects, uses, and protects your user data."
        closeMessage="Continue"
        boxWidth={70}
        isVisible={policyModalVisible}
        setVisible={setPolicyModalVisible}
        continueModal={() => setFaqModalVisible(true)}
      />

      <HelpModal
        marginTop={120}
        marginLeft={10}
        pointDirection="bottom-left"
        message="Get answers to frequently asked questions."
        closeMessage="Continue"
        boxWidth={40}
        isVisible={faqModalVisible}
        setVisible={setFaqModalVisible}
        continueModal={() => setEndDayModalVisible(true)}
      />

      <HelpModal
        marginTop={null}
        marginLeft={120}
        marginBottom={70}
        pointDirection="bottom-left"
        message="End current business day, finalizing sales data and preparing the app for the next business day."
        closeMessage="Done"
        boxWidth={60}
        isVisible={endDayModalVisible}
        setVisible={setEndDayModalVisible}
        continueModal={null}
      />
    </View>
  );
}
