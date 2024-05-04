import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartTotalPrice,
} from '../../redux/CartRedux/CartSelectors';
import CustomPressable from '../Common/CustomPressable';
import { insertData } from '../DatabaseUtils/CoreFunctions';
import { getDatabase } from '../DatabaseUtils/OpenDatabase';
import CustomModal from '../Modals/CustomModal';
import { PopUpModal } from '../Modals/PopUpModal';
import { generateUniqueId } from '../__utils__/helper/GenerateUniqueId';

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
  const [insufficientPopup, setInsufficientPopup] =
    useState<boolean>(false);
  const [invalidPopup, setInvalidPopup] = useState<boolean>(false);

  const handleDropdownToggle = (isOpen: boolean) => {
    setInputMargin(isOpen ? 150 : 40); // Set the margin to 150 when the dropdown is open, and 40 when it's closed
  };

  const router = useRouter();

  const totalCartPrice = useSelector(selectCartTotalPrice);

  const cartItems = useSelector(selectCartItems);

  const verifyPayment = () => {
    setModalVisible(false);
    if (userPayment === '' || modeOfPayment === null) {
      setInvalidPopup(true);
    } else if (parseFloat(userPayment) < totalCartPrice) {
      setInsufficientPopup(true);
    } else {
      saveReceiptToDB();
      clearData();
      viewReceipt();
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const clearData = () => {
    setModeOfPayment(null);
    onChangeUserPayment('');
  };

  const saveReceiptToDB = () => {
    // Unique receipt id using time
    const receiptID = generateUniqueId();

    // Save to receipts table
    const tableName = 'receipts';
    const data = [
      {
        receipt_id: receiptID,
        total: totalCartPrice.toFixed(2),
        amount_paid: parseFloat(userPayment),
        mode_of_payment: modeOfPayment,
      },
    ];
    insertData(tableName, data)
      .then((result) => {
        // console.log("Insert Success");
      })
      .catch((error) => {
        console.log(error);
      });

    // Save to receipt_items table
    const tableName2 = 'receipt_items';
    cartItems.map((item) => {
      const cartData = [
        {
          receipt_id: receiptID,
          item_id: item.id,
          quantity: item.quantity,
          price: item.price,
        },
      ];
      // console.log(cartData)
      insertData(tableName2, cartData)
        .then((result) => {
          console.log('Insert Success');
        })
        .catch((error) => {
          console.log(error);
        });
    });

    getDatabase().transaction((tx) => {
      tx.executeSql(
        `INSERT INTO eod_receipts (eod_id, receipt_id)
          VALUES ((SELECT eod_id FROM eods WHERE iscurrent = 1),
            (SELECT receipt_id FROM receipts ORDER BY receipt_id
              DESC LIMIT 1
            )
          )`,
        [],
        (tx, results) => {
          console.log(results.rowsAffected);
        },
      );
    });
  };

  const viewReceipt = () => {
    router.push({
      pathname: '/(tabs)/receiptWrapper',
      params: { userPayment },
    });
  };

  return (
    <View className="flex-1 bg-white dark-bg-black">
      <View className="flex flex-col flex-1">
        <Text
          numberOfLines={1}
          className=" text-2xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-5xl font-semibold self-center mt-10  text-green"
          style={{ fontFamily: 'Poppins-Medium' }}
        >
          Amount to pay
        </Text>
        <Text
          className="text-5xl sm:text-5xl md:text-7xl lg:text-9xl xl:text-3xl mt-5 font-medium
                p-5 text-yellow self-center"
          style={{ fontFamily: 'Poppins-Medium' }}
        >
          ₱ {totalCartPrice.toFixed(2)}
        </Text>

        <View className=" flex-1 justify-center">
          <Text
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl mb-2 font-base text-gray self-center"
            style={{ fontFamily: 'Poppins-Medium' }}
          >
            Please select a mode of payment
          </Text>
          <View className="self-center mt-2 w-2/3 sm:w-2/3 md:w-1/2 lg:w-3/5 xl:w-3/5">
            <DropDownPicker
              className=" border-0 rounded-xl  h-12 sm:h-20 md:h-20 lg:h-24 xl:h-24"
              style={{
                backgroundColor: '#FFAD42',
                borderColor: '#FFAD42',
                borderWidth: 2,
                borderRadius: 10,
              }}
              arrowIconStyle={{
                // change arrow color
                tintColor: 'white',
              }}
              containerStyle={{
                backgroundColor: 'white',
                alignSelf: 'center',
                zIndex: 1,
              }}
              dropDownContainerStyle={{
                backgroundColor: 'white',
                borderColor: '#FFAD42',
                borderWidth: 3,
                maxHeight: 150,
              }}
              itemSeparator={true}
              itemSeparatorStyle={{
                backgroundColor: '#FFAD42',
                height: 3,
              }}
              labelStyle={{
                fontSize: RFPercentage(2.5),
                color: 'white',
                fontWeight: 'bold',
                marginLeft: 10,
              }}
              listItemLabelStyle={{
                fontSize: RFPercentage(2),
                color: '#636363',
                fontWeight: 'bold',
                marginLeft: 10,
                height: 50,
                lineHeight: 50,
              }}
              listItemContainerStyle={{
                height: 50, // Adjust the height according to your preference
              }}
              selectedItemContainerStyle={{
                backgroundColor: '#ffdfb5',
              }}
              placeholder="Mode of Payment"
              // change placeholder text color
              placeholderStyle={{
                color: 'white',
                fontWeight: 'bold',
                marginLeft: 10,
                fontSize: RFPercentage(2),
              }}
              open={open}
              value={modeOfPayment}
              items={items}
              setOpen={setOpen}
              setValue={setModeOfPayment}
              setItems={setItems}
              onOpen={() => handleDropdownToggle(true)}
              onClose={() => handleDropdownToggle(false)}
            />
          </View>

          <View className="justify-center mt-8">
            <TextInput
              className=" self-center border-2 border-green rounded-xl p-2 w-2/3 sm:w-2/3 md:w-1/2 lg:w-3/5 xl:w-3/5 h-12 sm:h-20 md:h-20 lg:h-24 xl:h-24  text-gray text-base font-semibold"
              onChangeText={onChangeUserPayment}
              value={userPayment}
              placeholder="Enter Payment Amount"
              placeholderTextColor={'green'}
              // style the placeholder
              style={{
                fontWeight: 'bold',
                color: 'green',
                fontSize: RFPercentage(2),
                paddingLeft: 20,
              }}
              keyboardType="decimal-pad"
            />
          </View>
        </View>
        <View className="flex-1 justify-end py-5">
          <CustomPressable
            text="Confirm Payment"
            onPress={showModal}
          />
        </View>
      </View>

      <CustomModal
        visible={modalVisible}
        message="Confirm Payment?"
        optionOneText="Yes"
        optionTwoText="Cancel"
        optionOnePressed={() => verifyPayment()}
        optionTwoPressed={() => setModalVisible(false)}
        optionOneColor="blue"
        optionTwoColor="red"
        closeModal={() => setModalVisible(false)}
      />

      <PopUpModal
        visible={insufficientPopup}
        message="Insufficent Amount"
        text="Done"
        link={null}
        id={0}
        color="red"
        closeModal={() => setInsufficientPopup(false)}
      />

      <PopUpModal
        visible={invalidPopup}
        message="Enter a valid amount."
        text="Done"
        link={null}
        id={0}
        color="red"
        closeModal={() => setInvalidPopup(false)}
      />
    </View>
  );
}
