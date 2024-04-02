import { FontAwesome5 } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { SQLResultSet } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setHasStartDay } from '../../redux/GlobalStateRedux/GlobalStateSlice';
import CustomPressable from '../Common/CustomPressable';
import { getDatabase } from '../DatabaseUtils/OpenDatabase';
import CustomAlert from '../Modals/CustomAlert';

export default function MenuComponent() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [currentEOD, setCurrentEOD] = useState<SQLResultSet | null>(
    null,
  );

  const db = getDatabase();

  const dispatch = useDispatch();

  const fetchCurrentEODData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT SUM(receipt_items.quantity * receipt_items.price) AS total_sales
        FROM receipt_items
        JOIN item ON receipt_items.item_id = item.id
        JOIN category ON item.category_id = category.id`,
        [],
        (tx, results) => {
          setCurrentEOD(results);
        },
      );
    });
  };

  const handleShowAlert = () => {
    setAlertVisible(true);
  };

  const router = useRouter();
  const goToPahuwayBanner = () => {
    router.push('/(tabs)/pahuwayBanner');
  };

  const handleConfirm = () => {
    // Handle the confirmation logic here
    setAlertVisible(false);
    // Update the iscurrent column of the eods table to 0
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE eods SET iscurrent = 0 WHERE iscurrent = 1`,
        [],
        (txObj, resultSet) => {
          // console.log('iscurrent column updated to 0.');
          dispatch(
            setHasStartDay({
              isStartDay: false,
              isDisable: true,
            }),
          );
          console.log(resultSet);
        },
        // (txObj, error) => {
        // console.log('Error updating iscurrent column.');
        // console.log(error);
        // }
      );
    });
    goToPahuwayBanner();
  };

  const handleCancel = () => {
    // Handle the cancel logic here
    setAlertVisible(false);
  };

  const showAlert = () => {
    CustomAlert({
      title: 'Are you sure you want to end the day?',
      message: '',
      confirmText: 'Yes',
      cancelText: 'Cancel',
      onConfirm: () => handleConfirm(),
      onCancel: () => Alert.alert('Cancelled'),
    });
  };

  const currentDate = new Date();
  const getCurrentDateInfo = (currentDate: Date) => {
    const months = [
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

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const currentMonth = months[currentDate.getMonth()];
    const currentDay = days[currentDate.getDay()];

    return {
      month: currentMonth,
      day: currentDay,
    };
  };

  // Usage example
  const currentDateInfo = getCurrentDateInfo(currentDate);

  useEffect(() => {
    fetchCurrentEODData();
  }, [currentEOD]);

  return (
    <View className="flex flex-1 bg-white dark:bg-black">
      <View className=" self-center w-7/12 sm:w-7/12 md:w-8/12 lg:w-10/12 ">
        <View className="flex flex-row item-center justify-between mt-5">
          <Text className="text-white font-bold  bg-green px-2 rounded-lg text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-3xl">
            {currentDate.getDate()}
          </Text>
          <Text className="text-green font-bold px-2 rounded-full text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-3xl">
            {currentDateInfo.month}
          </Text>
          <Text className="text-green font-bold px-2 rounded-full flex items text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-3xl">
            {currentDate.getFullYear()}
          </Text>
        </View>
        <View className="flex item-center justify-between  ">
          <Text className=" bg-green text-center rounded-md text-white text-4xl font-bold p-3 my-3 py-2 sm:py-2 md:py-5 lg:py-5 xl:py-5">
            {'₱ ' + currentEOD?.rows._array[0].total_sales.toFixed(2)}
          </Text>
          <Text className="text-green text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold self-center mb-10 px-2">
            Total Sales
          </Text>
        </View>
      </View>

      <View className=" flex-1 flex-col justify-evenly items-center">
        <Link href="/(tabs)/currentEOD" asChild>
          <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
            <Text className="text-green text-xl font-bold">
              View Current EOD
            </Text>
            <FontAwesome5
              name="angle-right"
              size={24}
              color="black"
              style={{ opacity: 0.5 }}
            />
          </Pressable>
        </Link>

        <Link href="/(tabs)/previousEOD" asChild>
          <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
            <Text className="text-green text-xl font-bold">
              View Previous EOD
            </Text>
            <FontAwesome5
              name="angle-right"
              size={24}
              color="black"
              style={{ opacity: 0.5 }}
            />
          </Pressable>
        </Link>

        <Link href="/(tabs)/termsOfService" asChild>
          <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
            <Text className="text-green text-xl font-bold">
              Terms of Service
            </Text>
            <FontAwesome5
              name="angle-right"
              size={24}
              color="black"
              style={{ opacity: 0.5 }}
            />
          </Pressable>
        </Link>

        <Link href="/(tabs)/privacyPolicy" asChild>
          <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
            <Text className="text-green text-xl font-bold">
              Privacy Policy
            </Text>
            <FontAwesome5
              name="angle-right"
              size={24}
              color="black"
              style={{ opacity: 0.5 }}
            />
          </Pressable>
        </Link>

        <Link href="/(tabs)/faqs" asChild>
          <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
            <Text className="text-green text-xl font-bold">FAQs</Text>
            <FontAwesome5
              name="angle-right"
              size={24}
              color="black"
              style={{ opacity: 0.5 }}
            />
          </Pressable>
        </Link>
      </View>

      {/* <View className=" p-10 justify-evenly">
        <Pressable
          className="bg-transparent w-4/6 self-center mt-10 bg-green items-center rounded-full py-2 px-4 mb-5 ml-2"
          onPress={showAlert}
        >
          <Text className="text-white text-xl font-bold">
            End Day
          </Text>
        </Pressable>
      </View> */}

      <View className="p-10 justify-evenly">
        <CustomPressable text="End Day" onPress={showAlert} />
      </View>
    </View>
  );
}
