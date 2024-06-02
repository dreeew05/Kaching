import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useMemo } from 'react';
import {
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export interface MenuTutorialModalProps {
  isVisible: boolean;
  onRequestClose: (isVisible: boolean) => void;
  onNext: ((isVisible: boolean) => void) | null;
  title: string;
  content: string;
  onNextMessage: string;
  hasStartDay: boolean;
}

const MenuTutorialModalTop: React.FC<MenuTutorialModalProps> = ({
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

  const getTopPosition = useMemo(() => {
    console.log(hasStartDay);
    // Tanginang bobo ng React Native, hindi gumagana yung dynamic class name
    // Depota i brute forece ko na lang
    switch (title) {
      case 'View Current EOD':
        return { top: 'top-[255]' };
      case 'View Previous EOD':
        return hasStartDay
          ? { top: 'top-[323]' }
          : { top: 'top-[279]' };
      case 'Terms of Service':
        return hasStartDay
          ? { top: 'top-[390]' }
          : { top: 'top-[370]' };
      default:
        return { top: 'top-[50]' };
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
        <View className={getTopPosition.top}>
          <View className="bg-white ml-3 mr-3 rounded-md pl-[10] py-3">
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
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default MenuTutorialModalTop;
