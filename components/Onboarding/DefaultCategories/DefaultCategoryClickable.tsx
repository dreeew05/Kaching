import { Pressable, Image, Text, View } from 'react-native';
import React, { useState } from 'react';
import { DefaultCategory } from '../../../constants/DefaultCategories';
import { AntDesign } from '@expo/vector-icons';

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
    <Pressable className="mx-5 my-3" onPress={() => toggleClicked()}>
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
      {!isNotChecked ? (
        <View
          className="absolute -top-1 -right-1 bg-transparent"
          style={{ zIndex: 1 }}
        >
          <AntDesign name="checkcircle" size={24} color="green" />
        </View>
      ) : null}
      <View
        className="flex flex-row rounded-lg justify-center"
        style={{
          backgroundColor: 'white',
          padding: 10,
        }}
      >
        <Image
          source={defCategory.category.image}
          style={{ width: 60, height: 60 }}
        />
      </View>
      <Text
        className="text-center mt-2 color-white"
        style={{ fontFamily: 'Poppins-Medium' }}
      >
        {defCategory.category.name}
      </Text>
    </Pressable>
  );
}
