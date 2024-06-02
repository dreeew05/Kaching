import { useState } from 'react';
import { Image, Modal, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomModal from '../components/Modals/CustomModal';
import { Text, View } from '../components/Themed';
import {
  BusinessType,
  getBusinessTypes,
} from '../constants/BusinessTypes';
import { getScreenHeight } from '../constants/ScreenDimensions';
import { OnboardingModalProps } from './_layout';
import { updateData } from '../components/DatabaseUtils/CoreFunctions';

interface SelectStoreTypeProps {
  storeModalProps: OnboardingModalProps;
  openDefaultCategoryModal: () => void;
  setCategoryId: (id: number) => void;
  onBoardingComplete: () => void;
}

export default function SelectStoreType(
  modalProps: SelectStoreTypeProps,
) {
  const [allEnabled, setAllEnabled] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedBusinessId, setSelectedBusinessId] = useState<
    number | null
  >(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const highlightSelection = (id: number | null) => {
    if (allEnabled) {
      setAllEnabled(false);
    }
    setSelectedId(id);
    setSelectedBusinessId(id);
  };

  const showToCategories = () => {
    // 7 is the id of Others
    // if (selectedBusinessId !== null && selectedBusinessId != 7) {
    //   modalProps.setCategoryId(selectedBusinessId);
    //   modalProps.openDefaultCategoryModal();
    //   setModalVisible(false);
    // }
    if (selectedBusinessId != null) {
      if (selectedBusinessId == 7) {
        setOnboardingComplete();
      } else {
        modalProps.setCategoryId(selectedBusinessId);
        modalProps.openDefaultCategoryModal();
        setModalVisible(false);
      }
    }
  };

  const setOnboardingComplete = () => {
    const tableName = 'store';
    const targetAttrib = ['setup_complete'];
    const targetValue = [1];
    const refAttrib = targetAttrib[0];
    const refValue = 0;
    updateData(
      tableName,
      targetAttrib,
      targetValue,
      refAttrib,
      refValue,
    )
      .then((_) => {
        modalProps.onBoardingComplete();
        setModalVisible(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalProps.storeModalProps.visible}
      onRequestClose={modalProps.storeModalProps.onClose}
    >
      <View className="flex-1 bg-green justify-center">
        <View className="items-center bg-transparent">
          <Text
            className="color-white mb-5 text-2xl"
            style={{ fontFamily: 'Poppins-Medium' }}
          >
            Select Business Type
          </Text>
          <ScrollView
            className=" mx-10 bg-white "
            style={{ height: getScreenHeight() * 0.6 }}
          >
            <View className="flex flex-row flex-wrap justify-center mt-3 p-2 pt-5 bg-white">
              {Object.values(getBusinessTypes()).map(
                (businessType: BusinessType) => {
                  const isSelected = businessType.id === selectedId;
                  return (
                    <Pressable
                      className="mx-3 bg-white"
                      onPress={() =>
                        highlightSelection(businessType.id)
                      }
                      key={businessType.id}
                      style={{
                        opacity: allEnabled
                          ? 1
                          : isSelected
                            ? 1
                            : 0.5,
                        width: 100, // Two items per row
                        height: 150, // Fixed height for each container
                      }}
                    >
                      <View className=" rounded-lg flex flex-1 bg-white">
                        <View className="h-2/3 bg-white">
                          <Image
                            source={businessType.image}
                            resizeMode="cover"
                            className="w-full h-full rounded-lg"
                          />
                        </View>
                        <View className="h-1/3 pt-1 bg-white ">
                          <Text
                            adjustsFontSizeToFit
                            numberOfLines={1}
                            className="text-center text-black"
                            style={{ fontFamily: 'Poppins-Medium' }}
                          >
                            {businessType.name}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  );
                },
              )}
            </View>
          </ScrollView>

          <Pressable
            className="mt-10 bg-white py-2 px-10 rounded-full"
            onPress={() => setModalVisible(true)}
          >
            <Text
              className="text-green"
              style={{ fontFamily: 'Poppins-Bold' }}
            >
              Confirm
            </Text>
          </Pressable>
        </View>

        <CustomModal
          visible={modalVisible}
          message="Are you sure with your selected business type?"
          optionOneText="Yes"
          optionTwoText="Cancel"
          optionOnePressed={() => showToCategories()}
          optionTwoPressed={() => setModalVisible(false)}
          optionOneColor="blue"
          optionTwoColor="red"
          closeModal={() => setModalVisible(false)}
        />
      </View>
    </Modal>
  );
}
