import { Modal, View, Text, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import { PopUpModalProps } from '../__utils__/interfaces/PopUpModalProps';
import { setProductModifiedActions } from '../../redux/GlobalStateRedux/GlobalStateSlice';
import { useDispatch } from 'react-redux';

export const PopUpModal = (props: PopUpModalProps) => {
  const dispatch = useDispatch();
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
    }
  };

  const getColor = () => {
    switch (props.color) {
      case 'green':
        return '#14573a';
      case 'red':
        return '#cb0000';
      default:
        return '#14573a';
    }
  };

  const modalClickedHandler = () => {
    props.closeModal();
    if (props.link === 'goBack') {
      router.push('//');
    } else if (props.link === 'dispatch') {
      dispatch(setProductModifiedActions('delete'));
    }
  };

  const showModalContent = () => {
    return (
      <Pressable onPress={modalClickedHandler}>
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
          <View
            className="flex-col rounded-2xl items-center shadow-sm"
            style={{ backgroundColor: getColor() }}
          >
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
