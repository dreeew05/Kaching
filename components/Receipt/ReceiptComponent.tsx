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
    <View className="flex-1 self-stretch bg-white dark:bg-black">
      <Text className="text-2xl font-semibold text-green self-center">
        Transaction Recorded!
      </Text>

      <ScrollView>
        <View className="flex flex-column items-center mt-5">
          <Text className="text-5xl font-semibold text-green">
            Store Name
          </Text>
          <Text className="text-sm ml-5 ">
            {receiptStoreInfo.cashiername}
          </Text>
          <Text className="text-sm ml-5 ">
            {receiptStoreInfo.contactnum}
          </Text>
          <Text className="text-sm ml-5 mb-5">January 9, 2024</Text>
        </View>

        <View className=" bg-slate-100 dark:bg-black p-3 m-5 mb-0 border-2 border-zinc-300 rounded-xl">
          <ReceiptSummaryTable />
          <ReceiptItemList cart={cartItems} />

          <Text className=" text-zinc-500 text-base self-center">
            ________________________________________________
          </Text>
          <View className=" dark:bg-black p-3 m-5 mt-0 mb-0">
            {/* Container for Total Price */}
            <View className="flex-row overflow-hidden">
              <Text className="py-2 text-lg mr-auto text-zinc-500 font-medium">
                Total:{' '}
              </Text>
              <Text className="py-2 text-lg  text-zinc-500 font-medium items-end">
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
