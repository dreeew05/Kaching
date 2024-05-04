import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addStoreNameAction } from '../../redux/GlobalStateRedux/GlobalStateSlice';
import CustomPressable from '../Common/CustomPressable';
import { updateData } from '../DatabaseUtils/CoreFunctions';
import { getDatabase } from '../DatabaseUtils/OpenDatabase';

export default function EditStoreName() {
  const db = getDatabase();
  const [storeName, setStoreName] = useState('');

  const param = useLocalSearchParams();
  const storeNameParam = param.storeName;

  const dispatch = useDispatch();

  const editStoreName = () => {
    const tableName = 'store';
    // const targetAttribute = 'storename';
    // const targetValue = storeName;
    const targetAttribute = ['storename'];
    const targetValue = [storeName];
    const refAttribute = targetAttribute[0];
    const refValue = storeNameParam;

    updateData(
      tableName,
      targetAttribute,
      targetValue,
      refAttribute,
      refValue,
    )
      .then((result) => {
        console.log(result);
        setStoreName(''); // Clear the input field after confirmation
        dispatch(addStoreNameAction('change'));
      })
      .catch((error) => {
        console.log(error);
      });
    router.push('/(tabs)/');
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="border-b-gray border-b-2 mb-5 opacity-50 self-center mx-10">
        <TextInput
          className="text-lg text-black font-medium mb-1 "
          multiline={true}
          numberOfLines={2}
          value={storeName}
          onChangeText={setStoreName}
          placeholder="Enter New Store Name"
        />
      </View>

      <CustomPressable
        text="Confirm"
        onPress={editStoreName}
        disabled={false}
      />
    </View>
  );
}
