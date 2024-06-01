import {
  TouchableOpacity,
  View,
  Text,
  Pressable,
  Modal,
} from 'react-native';
import { MenuTutorialModalProps } from './MenuTutorialModalTop';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

const MenuTutorialModalBottom: React.FC<MenuTutorialModalProps> = ({
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

  const getBottomPosition = () => {
    // return `flex-1 justify-end bottom-[${position}]`;
    return 'flex-1 justify-end';
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
        <View className={getBottomPosition()}>
          <View className="ml-3 mr-3">
            <View className="bg-white rounded-tl-md rounded-tr-md px-3 py-5 ">
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
            <View className="flex flex-row justify-end mr-5 mt-[-13]">
              <Entypo
                name={'triangle-down'}
                size={40}
                color="white"
              />
            </View>
          </View>

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
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default MenuTutorialModalBottom;
