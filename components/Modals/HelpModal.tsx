import { Entypo } from '@expo/vector-icons';
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  Pressable,
} from 'react-native';

interface HelpModalProps {
  marginTop: number;
  marginLeft: number;
  pointDirection: string;
  isVisible: boolean;
  message: string;
  closeMessage: string;
  boxWidth: number;
  setVisible: (isVisible: boolean) => void;
}

export default function HelpModal(item: HelpModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={item.isVisible}
      onRequestClose={() => item.setVisible(false)}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.32)',
        }}
        onPress={() => item.setVisible(false)}
      >
        <View
          className="flex flex-row"
          style={{
            marginTop: item.marginTop,
            marginLeft: item.marginLeft,
          }}
        >
          <Entypo
            name="triangle-left"
            size={40}
            color="#18573a"
            style={{ marginRight: -13 }}
          />
          <View
            className="flex-col rounded-md"
            style={{ backgroundColor: 'white', width: item.boxWidth }}
          >
            <View
              className="p-5 rounded-tl-md rounded-tr-md"
              style={{ backgroundColor: '#18573a' }}
            >
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: 'white',
                }}
              >
                {item.message}
              </Text>
            </View>
            <View className="h-10 bg-white items-center justify-center rounded-md">
              <Pressable>
                <Text style={{ fontFamily: 'Poppins-Medium' }}>
                  {item.closeMessage}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
