import { Modal, View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { PopUpModalProps } from '../__utils__/interfaces/PopUpModalProps';

export const PopUpModal = (props: PopUpModalProps) => {
  const getLink = () => {
    switch (props.link) {
      case 'category':
        return (
          <Link
            href={{
              pathname: '/(tabs)/categoryView',
              params: {
                id: props.id,
              },
            }}
            asChild
          >
            {showModalContent()}
          </Link>
        );
      default:
        return <>{showModalContent()}</>;
        break;
    }
  };

  const showModalContent = () => {
    return (
      <Pressable onPress={props.closeModal}>
        <Text
          className="text-center"
          style={{
            color: 'white',
            margin: 5,
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
          }}
        >
          {props.text}
        </Text>
      </Pressable>
    );
  };

  return (
    <Modal
      className="flex-1 justify-center items-center"
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.closeModal}
    >
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.32)',
        }}
      >
        <View className="flex-1 justify-center items-center">
          <View className="flex-col rounded-2xl items-center bg-green shadow-sm">
            <View className="px-7 py-5 bg-white rounded-tl-2xl rounded-tr-2xl">
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 20,
                }}
              >
                {props.message}
              </Text>
            </View>
            <View className="p-2">{getLink()}</View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
