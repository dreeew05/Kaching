import { CheckBox } from '@rneui/base';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { setIsDetailedViewLoading } from '../../redux/GlobalStateRedux/GlobalStateSlice';
import { useDispatch } from 'react-redux';

interface ItemClickableProps {
  id: number;
  category_id: number;
  name: string;
  price: number;
  image: string;
  isEditComponent: boolean;
  checkedItems: number[];
  //   toggleDetailedViewLoading: () => void;
  setCurrentCheckedItems: (checkedItems: number[]) => void;
}

export default function ItemClickable(item: ItemClickableProps) {
  const dispatch = useDispatch();
  const [isNotChecked, setIsNotChecked] = useState(false);
  const toggleDetailedViewLoading = () => {
    dispatch(setIsDetailedViewLoading(true));
  };
  const toggleCheckBox = () => {
    setIsNotChecked(!isNotChecked);
    if (!isNotChecked) {
      item.setCurrentCheckedItems([...item.checkedItems, item.id]);
    } else {
      item.setCurrentCheckedItems(
        item.checkedItems.filter((id) => id !== item.id),
      );
    }
  };
  return (
    <View className="flex-row mb-3">
      <Link
        href={{
          pathname: '/(tabs)/ItemScreen',
          params: {
            id: item.id,
            category_id: item.category_id,
          },
        }}
        asChild
      >
        <TouchableOpacity onPress={() => toggleDetailedViewLoading()}>
          <Image
            className="w-40 h-40 mr-1 rounded-md"
            source={{ uri: item.image }}
          />
        </TouchableOpacity>
      </Link>

      <View className="flex flex-column ml-5">
        <Text
          className="text-lg font-semibold"
          style={{ fontFamily: 'Poppins-Medium' }}
        >
          {item.name}
        </Text>
        <Text
          className="text-gray-500"
          style={{ fontFamily: 'Poppins-Regular' }}
        >
          P{item.price}
        </Text>
      </View>

      {!item.isEditComponent ? (
        <View className="absolute -top-1 -right-1">
          <CheckBox
            checked={isNotChecked}
            onPress={() => toggleCheckBox()}
            size={35}
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor="grey"
            containerStyle={{
              backgroundColor: 'transparent',
              marginRight: -5,
              marginTop: -5,
            }}
          />
        </View>
      ) : null}
    </View>
  );
}
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
