import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import CustomPressable from "../CustomPressable";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotalPrice } from "../../redux/CartRedux/CartSelectors";
import { insertData } from "../DatabaseUtils/CoreFunctions";
import { generateUniqueId } from "../__utils__/helper/GenerateUniqueId";
import { getDatabase } from "../DatabaseUtils/OpenDatabase";
import CustomModal from "../Modals/CustomModal";
import { PopUpModal } from "../Modals/PopUpModal";

export default function PaymentComponent() {
    const [open, setOpen] = useState(false);
    const [modeOfPayment, setModeOfPayment] = useState(null);
    const [items, setItems] = useState([
        { label: 'Cash', value: 'cash' },
        { label: 'Online', value: 'online' },
    ]);

    const [userPayment, onChangeUserPayment] = useState<string>('');
    const [inputMargin, setInputMargin] = useState(40); // Initial margin set to 40

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [insufficientPopup, setInsufficientPopup] = useState<boolean>(false);
    const [invalidPopup, setInvalidPopup] = useState<boolean>(false);
    
    const handleDropdownToggle = (isOpen: boolean) => {
        setInputMargin(isOpen ? 150 : 40); // Set the margin to 150 when the dropdown is open, and 40 when it's closed
    };

    const router = useRouter();

    const totalCartPrice = useSelector(selectCartTotalPrice);

    const cartItems = useSelector(selectCartItems);

    const verifyPayment = () => {
        setModalVisible(false)
        if(userPayment === '' || modeOfPayment === null) {
            setInvalidPopup(true);
        }
        else if(parseFloat(userPayment) < totalCartPrice) {
            setInsufficientPopup(true);
        }
        else {
            saveReceiptToDB();
            clearData();
            viewReceipt();
        }
    }

    const showModal = () => {
        setModalVisible(true);
    }

    const clearData = () => {
        setModeOfPayment(null);
        onChangeUserPayment('');
    }

    const saveReceiptToDB = () => {
        // Unique receipt id using time
        const receiptID = generateUniqueId();

        // Save to receipts table
        const tableName = 'receipts';
        const data = [{
            receipt_id : receiptID,
            total : totalCartPrice.toFixed(2),
            amount_paid : parseFloat(userPayment),
            mode_of_payment : modeOfPayment,
        }]
        insertData(tableName, data)
            .then((result) => {
                // console.log("Insert Success");
            })
            .catch((error) => {
                console.log(error);
            })

        // Save to receipt_items table
        const tableName2 = 'receipt_items';
        cartItems.map((item) => {
            const cartData = [{
                receipt_id : receiptID,
                item_id : item.id,
                quantity : item.quantity,
                price : item.price,
            }]
            // console.log(cartData)
            insertData(tableName2, cartData)
                .then((result) => {
                    console.log("Insert Success");
                })
                .catch((error) => {
                    console.log(error);
                })
        })

        getDatabase().transaction(tx => {
            tx.executeSql(`
            INSERT INTO eod_receipts (eod_id, receipt_id)
            VALUES (
              (SELECT eod_id FROM eods WHERE iscurrent = 1),
              (SELECT receipt_id FROM receipts ORDER BY receipt_id DESC LIMIT 1))`,
              [],
                (tx, results) => {
                    console.log(results.rowsAffected);
                },
            )
        })
    }

    const viewReceipt = () => {
        router.push({
            pathname : '/(tabs)/receiptWrapper',
            params: { userPayment }
        });
    };

    return (
        <View
            style={{ 
                flex: 1, 
                justifyContent: 'space-between',
            }}
            className="flex-1 self-stretch bg-white dark-bg-black"
        >
        <View>
            <Text className="text-3xl self-center mt-10 text-green" style={{ fontFamily: 'Poppins-Medium' }}>
            Payment
            </Text>
            <Text className="text-4xl mt-5 font-medium 
                p-5 text-yellow self-center" style={{ fontFamily: 'Poppins-Medium' }}
            >
                PHP {totalCartPrice.toFixed(2)}
            </Text>
            <Text className="text-base mb-2 font-base text-gray self-center" style={{ fontFamily: 'Poppins-Medium' }}>
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
                value={modeOfPayment}
                items={items}
                setOpen={setOpen}
                setValue={setModeOfPayment}
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
                onPress={showModal} 
            />
        </View>

            <CustomModal
                visible={modalVisible}
                message="Confirm Payment?"
                optionOneText="Yes"
                optionTwoText="No"
                optionOnePressed={() => verifyPayment()}
                optionTwoPressed={() => setModalVisible(false)}
                optionTwoColor="red"
                closeModal={() => setModalVisible(false)}
            />

            <PopUpModal
                visible={insufficientPopup}
                message="Insufficent Amount"
                agreeText="Okay"
                closeModal={() => setInsufficientPopup(false)}
            />

            <PopUpModal
                visible={invalidPopup}
                message="Invalid Action"
                agreeText="Okay"
                closeModal={() => setInvalidPopup(false)}
            />

        </View>
    );
}