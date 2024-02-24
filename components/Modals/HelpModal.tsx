import { Entypo } from '@expo/vector-icons';
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface HelpModalProps {
  marginTop: number;
  marginLeft: number;
  pointDirection: string;
  message: string;
  closeMessage: string;
  boxWidth: number;
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
  continueModal: ((isVisible: boolean) => void) | null;
}

interface ModalSettings {
  modalFlexDirection: string;
  triangleType: any;
  triangleStyle: ViewStyle | null;
}

export default function HelpModal(item: HelpModalProps) {
  const MARGIN_SIZE = -13;
  const triangleDirectionStyles = StyleSheet.create({
    left: {
      marginRight: MARGIN_SIZE,
    },
    top_left: {
      marginBottom: MARGIN_SIZE,
    },
  });

  const transformDirection = () => {
    const settings: ModalSettings = {
      modalFlexDirection: '',
      triangleType: '',
      triangleStyle: null,
    };
    switch (item.pointDirection) {
      case 'left':
        settings.modalFlexDirection = 'flex-row';
        settings.triangleType = 'triangle-left';
        settings.triangleStyle = triangleDirectionStyles.left;
        break;
      case 'top-left':
        settings.modalFlexDirection = 'flex-col';
        settings.triangleType = 'triangle-up';
        settings.triangleStyle = triangleDirectionStyles.top_left;
        break;
      default:
        settings.modalFlexDirection = 'flex-row';
        settings.triangleType = 'triangle-left';
        settings.triangleStyle = triangleDirectionStyles.left;
        break;
    }
    return settings;
  };

  const closeModal = () => {
    item.setVisible(false);
    if (item.continueModal) {
      item.continueModal(true);
    }
  };

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
          className={transformDirection().modalFlexDirection}
          style={{
            marginTop: item.marginTop,
            marginLeft: item.marginLeft,
          }}
        >
          <Entypo
            name={transformDirection().triangleType}
            size={40}
            color="#18573a"
            style={transformDirection().triangleStyle}
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
            <Pressable onPress={() => closeModal()}>
              <View className="h-10 bg-white items-center justify-center rounded-md">
                <Text style={{ fontFamily: 'Poppins-Medium' }}>
                  {item.closeMessage}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
