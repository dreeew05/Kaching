import { ScrollView } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';
import {
  DefaultCategory,
  getDefaultCategories,
} from '../constants/DefaultCategories';
import { Modal, Pressable } from 'react-native';
import { getScreenHeight } from '../constants/ScreenDimensions';
import { useState } from 'react';
import DefaultCategoryClickable from '../components/Onboarding/DefaultCategories/DefaultCategoryClickable';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingModalProps } from './_layout';
import { updateData } from '../components/DatabaseUtils/CoreFunctions';

interface SelectDefaultCategoriesProps {
  id: number | null;
  modalProps: OnboardingModalProps;
  goBackToStoreType: () => void;
  onboardingComplete: () => void;
}

export default function SelectDefaultCategories(
  param: SelectDefaultCategoriesProps,
) {
  const getCategories = () => {
    if (param.id === null) {
      return null;
    }
    return getDefaultCategories()[param.id]['categories'];
  };

  const categories = getCategories();
  const [checkedCategories, setCheckedCategories] = useState<
    number[]
  >([]);

  const goBackToStoreType = () => {
    setCheckedCategories([]);
    param.modalProps.onClose();
  };

  const handleConfirm = () => {
    console.log(checkedCategories);
    setOnboardingComplete();
  };

  const setOnboardingComplete = () => {
    // Todo: Implement saveDefaultCategoriesToDB()
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
        param.onboardingComplete();
        param.modalProps.onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveDefaultCategoriesToDB = () => {
    // Todo: Save selected categories to the database
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={param.modalProps.visible}
      onRequestClose={param.modalProps.onClose}
    >
      <View className="flex-1 bg-[#18573a]">
        <Pressable
          className="mt-5 mb-3 ml-3"
          onPress={() => goBackToStoreType()}
        >
          <Ionicons name="chevron-back" size={30} color="white" />
        </Pressable>
        <View className="items-center bg-transparent">
          <Text
            className="mb-10 text-xl color-white"
            style={{ fontFamily: 'Poppins-Medium' }}
          >
            Pick some categories to start
          </Text>
          <ScrollView style={{ height: getScreenHeight() * 0.625 }}>
            <View className="flex-row flex-wrap justify-center bg-transparent">
              {categories &&
                Object.values(categories).map(
                  (category: DefaultCategory) => {
                    return (
                      <DefaultCategoryClickable
                        key={category.categoryId}
                        category={category}
                        checkedCategories={checkedCategories}
                        setCheckedCategories={setCheckedCategories}
                      />
                    );
                  },
                )}
            </View>
          </ScrollView>
          <Pressable
            className="bg-white mt-10 py-2 px-10 rounded-full"
            onPress={() => handleConfirm()}
          >
            <Text style={{ fontFamily: 'Poppins-Bold' }}>
              Confirm
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
