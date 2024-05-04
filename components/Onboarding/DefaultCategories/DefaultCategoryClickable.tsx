import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { DefaultCategory } from '../../../constants/DefaultCategories';

// Unused import
// import { CheckBox } from '@rneui/base';

interface DefaultCategoryClickableProps {
  category: DefaultCategory;
  checkedCategories: DefaultCategory[];
  setCheckedCategories: (
    checkedCategories: DefaultCategory[],
  ) => void;
}

export default function DefaultCategoryClickable(
  defCategory: DefaultCategoryClickableProps,
) {
  const [isNotChecked, setIsNotChecked] = useState<boolean>(true);

  const toggleClicked = () => {
    setIsNotChecked(!isNotChecked);
    if (!isNotChecked) {
      defCategory.setCheckedCategories(
        defCategory.checkedCategories.filter(
          (category) =>
            category.categoryId !== defCategory.category.categoryId,
        ),
      );
    } else {
      defCategory.setCheckedCategories([
        ...defCategory.checkedCategories,
        defCategory.category,
      ]);
    }
  };

  return (
    <Pressable className=" my-3  p-3" onPress={() => toggleClicked()}>
      {/* Checkbox version */}
      {/* <View
        className="absolute -top-1 -right-1 bg-transparent"
        style={{ zIndex: 1 }}
      >
        <CheckBox
          checked={isNotChecked}
          onPress={() => setIsNotChecked(!isNotChecked)}
          // Use ThemeProvider to make change for all checkbox
          iconType="material-community"
          checkedIcon="checkbox-marked"
          uncheckedIcon="checkbox-blank-outline"
          checkedColor="#18573a"
          containerStyle={{
            backgroundColor: 'transparent',
            marginRight: -5,
            marginTop: -5,
          }}
        />
      </View> */}

      {/* Click Version */}
      <View className="w-20 sm:w-16 md:w-20 lg:w-1/4 xl:w-1/4 h-28 sm:h-24 md:h-40 lg:h-1/4 xl:h-1/4 rounded-lg">
        {!isNotChecked && (
          <View
            className="absolute -top-1 -right-1 bg-transparent"
            style={{ zIndex: 1 }}
          >
            <AntDesign name="checkcircle" size={25} color="green" />
          </View>
        )}
        <View
          className="flex p-2 items-center justify-center bg-white rounded-lg w-20 sm:w-5 md:w-32 lg:w-1/4 xl:w-1/4 h-20 sm:h-5 md:h-32 lg:h-1/4 xl:h-1/4"
          // style={{ padding: 10, flex: 1 }}
        >
          <Image
            source={defCategory.category.image}
            resizeMode="cover"
            className="w-full h-full rounded-t-md"
          />
        </View>
        <View>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            className="text-center mt-2 color-white"
            style={{ fontFamily: 'Poppins-Medium' }}
          >
            {defCategory.category.name}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
