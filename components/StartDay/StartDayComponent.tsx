import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDatabase } from "../DatabaseUtils/OpenDatabase";
import { insertData } from "../DatabaseUtils/CoreFunctions";
import { setHasStartDay } from "../../redux/GlobalStateRedux/GlobalStateSlice";
import { View, Text } from "../Themed";
import { TextInput } from "react-native-gesture-handler";
import { Pressable } from "react-native";
import { router } from "expo-router";

export default function StartDayComponent() {
    const [cashierName, setCashierName] = useState<string>('');
    const [contactNumber, setContactNumber] = useState<string>('');
    const [pettyCashAmount, setPettyCashAmount] = useState<string>('');
    const dispatch = useDispatch();

    const handleStartDay = () => {
        const parsedPettyCashAmount = parseFloat(pettyCashAmount);

        const tableName = 'eods';
        const data = [{
        cashiername : cashierName,
        contactnum : contactNumber,
        pettycash : parsedPettyCashAmount,
        }]

        insertData(tableName, data)
        .then((result) => {
            console.log(result)
            dispatch(
                setHasStartDay({
                    isStartDay : true,
                    isDisable : false
                })
            );
            // Go back to home
            router.push("/")
        })
        .catch((error) => {
            console.log(error)
        })
    };
    
    return (
        <View>
            <View className="ml-8 mr-8 mt-8">
            <Text className=" text-lg text-gray font-semibold mb-1">Cashier's Name: </Text>
            <View className=" border-b-gray border-b-2 opacity-50">
                <TextInput
                    className="text-lg text-black font-medium mb-1"
                    value={cashierName}
                    onChangeText={setCashierName}
                    placeholder="Enter cashier's name"
                />
            </View>
            </View>

            <View className="ml-8 mr-8 mt-5">
            <Text className=" text-lg text-gray font-semibold mb-1">Contact Number: </Text>
            <View className=" border-b-gray border-b-2 opacity-50">
                <TextInput
                className="text-lg text-black font-medium mb-1"
                value={contactNumber}
                onChangeText={setContactNumber}
                placeholder="Enter contact number"
                placeholderTextColor="gray"
                keyboardType="numeric"
                />
            </View>
            </View>

            <View className="ml-8 mr-8 mt-5">
            <Text className=" text-lg text-gray font-semibold mb-1">Petty Cash Amount: </Text>
            <View className=" border-b-gray border-b-2 opacity-50">
                <TextInput
                className="text-lg text-black font-medium mb-1"
                value={pettyCashAmount}
                onChangeText={(text) => setPettyCashAmount(text)}
                placeholder="Enter petty cash amount"
                placeholderTextColor="gray"
                keyboardType="decimal-pad"
                />
            </View>
            </View>

            <Pressable
                className="bg-transparent w-4/6 self-center mt-10 bg-green items-center rounded-full py-2 px-4 mb-5 ml-2"
                onPress={handleStartDay}
            >
                <Text className="text-white text-xl font-bold">Confirm Start Day</Text>
            </Pressable>
        </View>
    );
}