import { useState } from "react";
import { getDatabase } from "../DatabaseUtils/OpenDatabase";
import { router, useLocalSearchParams } from "expo-router";
import { updateData } from "../DatabaseUtils/CoreFunctions";
import { TextInput, View } from "react-native";
import CustomPressable from "../Common/CustomPressable";
import { useDispatch } from "react-redux";
import { addStoreNameAction } from "../../redux/GlobalStateRedux/GlobalStateSlice";

export default function EditStoreName() {
    const db = getDatabase();
    const [storeName, setStoreName] = useState('');

    const param = useLocalSearchParams();
    const storeNameParam = param.storeName;

    const dispatch = useDispatch();

    const editStoreName = () => {
        const tableName = 'store';
        const targetAttribute = 'storename';
        const targetValue = storeName;
        const refAttribute = targetAttribute;
        const refValue = storeNameParam;

        updateData(tableName, targetAttribute, targetValue, 
            refAttribute, refValue)
            .then((result) => {
                console.log(result)
                dispatch(
                    addStoreNameAction('change')
                )
            })
            .catch((error) => {
                console.log(error)
            })
        router.push('/(tabs)/');
    }

    return (
        <View>
        <View className="border-b-gray border-b-2 mb-5 opacity-50 px-10 mt-32 self-center">
            <TextInput
            className="text-lg text-black font-medium mb-1"
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