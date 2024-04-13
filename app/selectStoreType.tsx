import { Pressable, Image, Dimensions, Modal } from 'react-native';
import { View, Text } from '../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';
import {
  BusinessType,
  getBusinessTypes,
} from '../constants/BusinessTypes';
import { useState } from 'react';
import CustomModal from '../components/Modals/CustomModal';
import { getScreenHeight } from '../constants/ScreenDimensions';
import { OnboardingModalProps } from './_layout';

interface SelectStoreTypeProps {
  storeModalProps: OnboardingModalProps;
  openDefaultCategoryModal: () => void;
  setCategoryId: (id: number) => void;
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
    if (selectedBusinessId !== null) {
      modalProps.setCategoryId(selectedBusinessId);
      modalProps.openDefaultCategoryModal();
      setModalVisible(false);
    }
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalProps.storeModalProps.visible}
      onRequestClose={modalProps.storeModalProps.onClose}
    >
      <View className="flex-1 bg-[#18573a] justify-center">
        <View className="items-center bg-transparent">
          <Text
            className="text-xl color-white mb-10"
            style={{ fontFamily: 'Poppins-Medium' }}
          >
            Select Business Type
          </Text>
          <ScrollView
            className="bg-white mx-10 px-5 rounded-lg"
            style={{ height: getScreenHeight() * 0.6 }}
          >
            <View className="flex flex-row flex-wrap justify-center">
              {Object.values(getBusinessTypes()).map(
                (businessType: BusinessType) => {
                  // Test
                  console.log(
                    Image.resolveAssetSource(businessType.image).uri,
                  );
                  // End Test
                  const isSelected = businessType.id === selectedId;
                  return (
                    <Pressable
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
                      }}
                    >
                      <View className="flex flex-col items-center my-3">
                        <Image
                          source={businessType.image}
                          style={{ width: 120, height: 120 }}
                          className="rounded-md mx-3 my-3"
                        />
                        <Text
                          className="text-center"
                          style={{ fontFamily: 'Poppins-Medium' }}
                        >
                          {businessType.name}
                        </Text>
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
            <Text style={{ fontFamily: 'Poppins-Bold' }}>
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
