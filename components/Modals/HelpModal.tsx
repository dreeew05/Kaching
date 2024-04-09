import { Entypo } from '@expo/vector-icons';
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';

interface HelpModalProps {
  marginTop: number | null;
  marginBottom?: number;
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
  const SPECIAL_MARGIN_LEFT = 150;
  const triangleDirectionStyles = StyleSheet.create({
    left: {
      marginRight: MARGIN_SIZE,
    },
    right: {
      marginLeft: MARGIN_SIZE,
    },
    top_left: {
      marginBottom: MARGIN_SIZE,
    },
    top_right: {
      marginBottom: MARGIN_SIZE,
      marginLeft: SPECIAL_MARGIN_LEFT,
    },
    bottom_left: {
      marginTop: MARGIN_SIZE,
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
      case 'right':
        settings.modalFlexDirection = 'flex-row-reverse';
        settings.triangleType = 'triangle-right';
        settings.triangleStyle = triangleDirectionStyles.right;
        break;
      case 'top-left':
        settings.modalFlexDirection = 'flex-col';
        settings.triangleType = 'triangle-up';
        settings.triangleStyle = triangleDirectionStyles.top_left;
        break;
      case 'top-right':
        settings.modalFlexDirection = 'flex-col';
        settings.triangleType = 'triangle-up';
        settings.triangleStyle = triangleDirectionStyles.top_right;
        break;
      case 'bottom-left':
        settings.modalFlexDirection = 'flex-col-reverse';
        settings.triangleType = 'triangle-down';
        settings.triangleStyle = triangleDirectionStyles.bottom_left;
        break;
      // Add case if necessary
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

  const getViewStyle = (): StyleProp<ViewStyle> => {
    if (item.marginTop != null) {
      return {
        marginTop: item.marginTop,
        marginLeft: item.marginLeft,
      };
    } else {
      return {
        position: 'absolute',
        bottom: 120,
        marginLeft: item.marginLeft,
      };
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
          style={getViewStyle()}
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
