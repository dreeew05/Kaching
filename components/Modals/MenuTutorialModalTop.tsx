import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  Pressable,
} from 'react-native';

export interface MenuTutorialModalProps {
  isVisible: boolean;
  onRequestClose: (isVisible: boolean) => void;
  onNext: ((isVisible: boolean) => void) | null;
  title: string;
  content: string;
  onNextMessage: string;
  position: number;
}

const MenuTutorialModalTop: React.FC<MenuTutorialModalProps> = ({
  isVisible,
  onRequestClose,
  onNext,
  title,
  content,
  onNextMessage,
  position,
}) => {
  const goToNextModal = () => {
    onRequestClose(false);
    if (onNext) {
      onNext(true);
    }
  };

  const getTopPosition = () => {
    return `top-[${position}]`;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        onRequestClose(false);
      }}
    >
      <TouchableOpacity
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.32)',
        }}
        onPress={() => onRequestClose(false)}
      >
        <View className={getTopPosition()}>
          <View className="bg-white ml-3 mr-3 rounded-md pl-3 py-3">
            <View className="bg-transparent w-5/6 self-center flex-row justify-between items-center">
              <Text className="text-green text-xl font-bold">
                {title}
              </Text>
              <FontAwesome5
                name="angle-right"
                size={24}
                color="black"
                style={{ opacity: 0.5 }}
              />
            </View>
          </View>

          <View className="ml-3 mr-3">
            <View className="flex flex-row justify-end mr-5">
              <Entypo name={'triangle-up'} size={40} color="white" />
            </View>
            <View className="bg-white rounded-tl-md rounded-tr-md px-3 py-5 mt-[-15]">
              <Text
                className="text-black"
                style={{
                  fontFamily: 'Poppins-Regular',
                }}
              >
                {content}
              </Text>
            </View>
            <View className="bg-white rounded-bl-md rounded-br-md items-center justify-center bg-green p-2">
              <Pressable onPress={() => goToNextModal()}>
                <Text
                  className="text-black"
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: 'white',
                  }}
                >
                  {onNextMessage}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default MenuTutorialModalTop;
