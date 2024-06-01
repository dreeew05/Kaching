import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { SQLResultSet } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectHasStartDay } from '../../redux/GlobalStateRedux/GlobalStateSelectors';
import { setHasStartDay } from '../../redux/GlobalStateRedux/GlobalStateSlice';
import CustomPressable from '../Common/CustomPressable';
import { getDatabase } from '../DatabaseUtils/OpenDatabase';
import CustomAlert from '../Modals/CustomAlert';
import MenuTutorialModalTop from '../Modals/MenuTutorialModalTop';
import MenuTutorialModalBottom from '../Modals/MenuTutorialModalBottom';

export default function MenuComponent() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [currentEOD, setCurrentEOD] = useState<SQLResultSet | null>(
    null,
  );
  const [disableCurrentEOD, setDisableCurrentEOD] = useState(false);

  const hasStartDay = useSelector(selectHasStartDay);
  const db = getDatabase();

  const dispatch = useDispatch();

  const fetchCurrentEODData = () => {
    db.transaction(
      (tx: {
        executeSql: (
          arg0: string,
          arg1: never[],
          arg2: (tx: any, results: any) => void,
        ) => void;
      }) => {
        tx.executeSql(
          `SELECT SUM(receipt_items.quantity * receipt_items.price) AS total_sales
        FROM receipt_items
        JOIN item ON receipt_items.item_id = item.id
        JOIN category ON item.category_id = category.id`,
          [],
          (tx: any, results: any) => {
            setCurrentEOD(results);
          },
        );
      },
    );
  };

  const handleShowAlert = () => {
    setAlertVisible(true);
  };

  const router = useRouter();
  const goToPahuwayBanner = () => {
    setDisableCurrentEOD(true);
    router.push('/(tabs)/pahuwayBanner');
  };

  const handleConfirm = () => {
    // Handle the confirmation logic here
    setAlertVisible(false);
    // Update the iscurrent column of the eods table to 0
    db.transaction(
      (tx: {
        executeSql: (
          arg0: string,
          arg1: never[],
          arg2: (txObj: any, resultSet: any) => void,
        ) => void;
      }) => {
        tx.executeSql(
          `UPDATE eods SET iscurrent = 0 WHERE iscurrent = 1;`,
          [],
          (txObj: any, resultSet: any) => {
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
      },
    );
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

  const [currentEODModalVisible, setCurrentEODModalVisible] =
    useState(false);
  const [previousEODModalVisible, setPreviousEODModalVisible] =
    useState(false);
  const [tosModalVisible, setTosModalVisible] = useState(false);
  const [policyModalVisible, setPolicyModalVisible] = useState(false);
  const [faqModalVisible, setFaqModalVisible] = useState(false);
  const [endDayModalVisible, setEndDayModalVisible] = useState(false);

  useEffect(() => {
    fetchCurrentEODData();
  }, [currentEOD]);

  const getFirstModal = () => {
    hasStartDay.isStartDay
      ? setCurrentEODModalVisible(true)
      : setPreviousEODModalVisible(true);
  };

  const getTopPositions = () => {
    if (hasStartDay.isStartDay) {
      return {
        previousEOD: 350,
        tos: 400,
      };
    } else {
      return {
        previousEOD: 300,
        tos: 400,
      };
    }
  };

  const getBottomPositions = () => {
    if (hasStartDay.isStartDay) {
      return {
        policy: 350,
      };
    } else {
      return {
        policy: 500,
      };
    }
  };

  return (
    <View className="flex flex-1 bg-white pt-5">
      <View className="flex flex-row justify-end mr-5 mb-3">
        <TouchableOpacity onPress={() => getFirstModal()}>
          <Entypo name="help-with-circle" size={35} color="#18573a" />
        </TouchableOpacity>
      </View>
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
            {'₱ ' +
              (currentEOD?.rows._array[0].total_sales || 0).toFixed(
                2,
              )}
          </Text>
          <Text className="text-green text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold self-center mb-10 px-2">
            Total Sales
          </Text>
        </View>
      </View>

      <View className=" flex-1 flex-col justify-evenly items-center">
        {hasStartDay.isStartDay ? (
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
        ) : null}

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

      <View className="p-10 justify-evenly">
        {hasStartDay.isStartDay ? (
          <CustomPressable text="End Day" onPress={showAlert} />
        ) : null}
      </View>

      {/* MODALS */}
      <MenuTutorialModalTop
        isVisible={currentEODModalVisible}
        onRequestClose={setCurrentEODModalVisible}
        onNext={setPreviousEODModalVisible}
        title="View Current EOD"
        content={'Tap to view the current End of Day report.'}
        onNextMessage={'Continue'}
        hasStartDay={hasStartDay.isStartDay}
        // position={300}
      />

      <MenuTutorialModalTop
        isVisible={previousEODModalVisible}
        onRequestClose={setPreviousEODModalVisible}
        onNext={setTosModalVisible}
        title="View Previous EOD"
        content={
          'See a detailed breakdown of your sales for a specific day within the last 30 days.'
        }
        onNextMessage={'Continue'}
        hasStartDay={hasStartDay.isStartDay}
      />

      <MenuTutorialModalTop
        isVisible={tosModalVisible}
        onRequestClose={setTosModalVisible}
        onNext={setPolicyModalVisible}
        title="Terms of Service"
        content={
          'See the legal terms and conditions governing your use of the Kaching app.'
        }
        onNextMessage={'Continue'}
        hasStartDay={hasStartDay.isStartDay}
      />

      <MenuTutorialModalBottom
        isVisible={policyModalVisible}
        onRequestClose={setPolicyModalVisible}
        onNext={setFaqModalVisible}
        title="Privacy Policy"
        content={
          'Display information on how the Kaching app collects, uses, and protects your user data.'
        }
        onNextMessage={'Continue'}
        hasStartDay={hasStartDay.isStartDay}
      />

      <MenuTutorialModalBottom
        isVisible={faqModalVisible}
        onRequestClose={setFaqModalVisible}
        onNext={hasStartDay.isStartDay ? setEndDayModalVisible : null}
        title="FAQs"
        content={'Get answers to frequently asked questions.'}
        onNextMessage={hasStartDay.isStartDay ? 'Continue' : 'Okay'}
        hasStartDay={hasStartDay.isStartDay}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={endDayModalVisible}
        onRequestClose={() => {
          setEndDayModalVisible(false);
        }}
      >
        <TouchableOpacity
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.32)',
          }}
          onPress={() => setEndDayModalVisible(false)}
        >
          <View className="bottom-[77] flex-1 justify-end">
            <View className="ml-3 mr-3">
              <View className="bg-white rounded-tl-md rounded-tr-md px-3 py-5 ">
                <Text
                  className="text-black"
                  style={{
                    fontFamily: 'Poppins-Regular',
                  }}
                >
                  End current business day, finalizing sales data and
                  preparing the app for the next business day.
                </Text>
              </View>
              <View className="bg-white rounded-bl-md rounded-br-md items-center justify-center bg-green p-2">
                <Pressable
                  onPress={() => setEndDayModalVisible(false)}
                >
                  <Text
                    className="text-black"
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: 'white',
                    }}
                  >
                    Okay
                  </Text>
                </Pressable>
              </View>
              <View className="align-center items-center mt-[-13]">
                <Entypo
                  name={'triangle-down'}
                  size={40}
                  color="white"
                />
              </View>
            </View>

            <View className="bg-white ml-3 mr-3 rounded-md py-3">
              <CustomPressable text="End Day" onPress={showAlert} />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
