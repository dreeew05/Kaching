import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartTotalPrice,
} from '../../redux/CartRedux/CartSelectors';
import { clearCart } from '../../redux/CartRedux/CartSlice';
import CustomPressable from '../Common/CustomPressable';
import { getDatabase } from '../DatabaseUtils/OpenDatabase';
import { ParamsToFloat } from '../__utils__/helper/ParamsToFloat';
import ReceiptItemList from './ReceiptItemList';
import ReceiptSummaryTable from './ReceiptSummaryTable';

interface DataFromDbProps {
  cashiername: string;
  contactnum: string;
}

export default function ReceiptComponent() {
  const router = useRouter();

  const viewIndex = () => {
    clearCartAction();
    router.push('../');
  };

  const dispatch = useDispatch();

  const params = useLocalSearchParams();
  const userPayment: number = ParamsToFloat(params.userPayment);

  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  const change: number = userPayment - totalPrice;

  const clearCartAction = () => {
    dispatch(clearCart());
  };

  const db = getDatabase();

  const date = new Date();

  const monthInWords = (month: number) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[month];
  };

  const [receiptStoreInfo, setReceiptStoreInfo] =
    useState<DataFromDbProps>({
      cashiername: '',
      contactnum: '',
    });

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT cashiername, contactnum
                FROM eods
                WHERE iscurrent = 1`,
        [],
        (_, result) => {
          if (result.rows.length > 0) {
            const resultData = result.rows._array;
            setReceiptStoreInfo({
              cashiername: resultData[0].cashiername,
              contactnum: resultData[0].contactnum,
            });
          }
        },
      );
    });
  }, []);

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <ScrollView className=" w-11/12 self-center mt-5 mb-5  rounded-3xl bg-slate-100">
        <View className="flex flex-col flex-1 items-center">
          <Text className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-7 font-semibold text-yellow self-center">
            Transaction Recorded!
          </Text>
          <Text className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-3xl mt-5 font-semibold text-green">
            Store Name
          </Text>
        </View>
        <View className="flex-1 items-center mt-5">
          <Text className="ml-5 text-black text-base font-semibold">
            {receiptStoreInfo.cashiername}
          </Text>
          <Text className=" ml-5 text-red-black text-base ">
            {receiptStoreInfo.contactnum}
          </Text>
          <Text className="text-sm ml-5">
            {monthInWords(date.getMonth()) +
              ' ' +
              date.getDate() +
              ',' +
              ' ' +
              date.getFullYear()}
          </Text>
        </View>

        <View className="flex-1 w-10/12 self-center bg-white dark:bg-black p-3 m-5 mb-11  border-zinc-300 rounded-xl">
          {/* Container for Receipt Summary Table and Receipt Item */}
          <View className="mb-5 mt-3">
            <ReceiptSummaryTable />
            <ReceiptItemList cart={cartItems} />
          </View>

          {/* Container for Total Price, Payment, and Change */}
          <View className="dark:bg-black p-3 flex-1 self-center justify-end w-11/12 border-t">
            {/* Container for Total Price */}
            <View className="flex-row overflow-hidden pt-3">
              <Text className="py-2 text-lg mr-auto text-zinc-500 font-medium">
                Total:{' '}
              </Text>
              <Text className="py-2 text-lg text-zinc-500 font-medium items-end">
                P{totalPrice}
              </Text>
            </View>

            {/* Container for Total User Payment */}
            <View className="flex-row overflow-hidden">
              <Text className="py-2 text-lg mr-auto text-zinc-500 font-medium">
                Payment:{' '}
              </Text>
              <Text className="py-2 text-lg text-zinc-500 font-medium items-end">
                P{userPayment}
              </Text>
            </View>

            {/* Container for Total Change */}
            <View className="flex-row overflow-hidden">
              <Text className="py-2 text-lg mr-auto text-right text-zinc-500 font-medium">
                Change:{' '}
              </Text>
              <Text className="py-2 text-lg text-zinc-500 font-medium items-end">
                P{change.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="flex-row justify-between p-4 border-spacing-3 border border-white border-t-gray"></View>
      <CustomPressable text="Done" onPress={viewIndex} />
    </View>
  );
}
