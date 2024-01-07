import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import CustomPressable from "../CustomPressable";
import { useSelector } from "react-redux";
import { selectCartTotalPrice } from "../../redux/CartRedux/CartSelectors";

export default function PaymentComponent() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Cash', value: 'cash' },
        { label: 'Online', value: 'online' },
    ]);

    const [userPayment, onChangeUserPayment] = useState<string>('');
    const [inputMargin, setInputMargin] = useState(40); // Initial margin set to 40

    const handleDropdownToggle = (isOpen: boolean) => {
        setInputMargin(isOpen ? 150 : 40); // Set the margin to 150 when the dropdown is open, and 40 when it's closed
    };

    const router = useRouter();

    const actionState = useSelector(selectCartTotalPrice);

    const viewOrderSummary = () => {
        router.push('/(tabs)/orderSummary');
    };

    const verifyPayment = () => {
        if(parseFloat(userPayment) < actionState) {
            console.log("Insufficient Payment")
        }
        else if(userPayment === '') {
            console.log("Please enter payment")
        }
        else {
            viewReceipt();
        }
    }

    const viewReceipt = () => {
        router.push({
            pathname : '/(tabs)/receiptWrapper',
            params: { userPayment }
        });
    };

    return (
        <View
        style={{ flex: 1, justifyContent: 'space-between' }}
        className="flex-1 self-stretch bg-white dark-bg-black"
        >
        <View>
            <Text className="text-4xl ml-5 text-green" style={{ fontFamily: 'Poppins-Medium' }}>
            Payment
            </Text>
            <Text className="text-7xl mt-5 font-medium 
                p-5 text-yellow self-center"
            >
                PHP {actionState}
            </Text>
            <Text className="text-xl mb-2 font-base text-gray self-center">
            Please select a mode of payment
            </Text>

            <DropDownPicker
            style={{
                backgroundColor: 'lightgray',
                borderColor: 'lightgray',
                borderWidth: 2,
            }}
            textStyle={{
                fontSize: 14,
                fontWeight: 'bold',
                color: 'gray',
            }}
            containerStyle={{ height: 40, width: 275, alignSelf: 'center' }}
            dropDownContainerStyle={{
                backgroundColor: 'white',
                borderColor: 'lightgray',
            }}
            itemSeparator={true}
            itemSeparatorStyle={{
                backgroundColor: 'lightgray',
                height: 1,
            }}
            placeholder="Mode of Payment"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onOpen={() => handleDropdownToggle(true)}
            onClose={() => handleDropdownToggle(false)}
            />

            <TextInput
                className="border-2 border-gray rounded-xl p-2 m-5 mt-40 self-center w-2/3 text-gray text-base font-semibold"
                onChangeText={onChangeUserPayment}
                value={userPayment}
                placeholder="Enter Payment Amount"
                keyboardType="decimal-pad"
                style={{ marginTop: inputMargin }}
            />
        </View>

        <View>
            <CustomPressable text="Confirm Payment" 
                onPress={verifyPayment} 
            />
        </View>
        </View>
    );
}