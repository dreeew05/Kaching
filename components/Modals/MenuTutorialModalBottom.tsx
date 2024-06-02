import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useMemo } from 'react';
import {
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MenuTutorialModalProps } from './MenuTutorialModalTop';

const MenuTutorialModalBottom: React.FC<MenuTutorialModalProps> = ({
  isVisible,
  onRequestClose,
  onNext,
  title,
  content,
  onNextMessage,
  hasStartDay,
}) => {
  const goToNextModal = () => {
    onRequestClose(false);
    if (onNext) {
      onNext(true);
    }
  };

  const getBottomPosition = useMemo(() => {
    // Brute forced bobo kasi ng React Native
    switch (title) {
      case 'Privacy Policy':
        return hasStartDay
          ? { bottom: 'bottom-[255]' }
          : { bottom: 'bottom-[288]' };
      case 'FAQs':
        return hasStartDay
          ? { bottom: 'bottom-[193]' }
          : { bottom: 'bottom-[183]' };
      default:
        return { bottom: 'bottom-[20]' };
    }
  }, [title, hasStartDay]);
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
        <View
          className={getBottomPosition.bottom + ' flex-1 justify-end'}
        >
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
            <Pressable
              className="rounded-bl-md rounded-br-md items-center justify-center bg-green p-2  py-2"
              onPress={() => goToNextModal()}
            >
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
