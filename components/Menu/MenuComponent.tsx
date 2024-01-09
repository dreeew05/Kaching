import { useEffect, useState } from "react";
import { getDatabase } from "../DatabaseUtils/OpenDatabase";
import { SQLResultSet } from "expo-sqlite";
import { Link, useRouter } from "expo-router";
import CustomAlert from "../CustomAlert";
import { Alert, Pressable, View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setHasStartDay } from "../../redux/GlobalStateRedux/GlobalStateSlice";

export default function MenuComponent() {
    const [alertVisible, setAlertVisible] = useState(false);
    const [currentEOD, setCurrentEOD] = useState<SQLResultSet|null>(null);

    const db = getDatabase();

    const dispatch = useDispatch();

    const fetchCurrentEODData = () => {
    db.transaction(tx => {
        tx.executeSql(`SELECT SUM(receipt_items.quantity * receipt_items.price) AS total_sales
        FROM receipt_items
        JOIN item ON receipt_items.item_id = item.id
        JOIN category ON item.category_id = category.id`, 
        [],
        (tx, results) => {
            setCurrentEOD(results);
        },
        )
    })
    }

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
                    isDisable : true
                })
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
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
        ];
    
        const days = [
        "Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday", "Saturday"
        ];
    

        const currentMonth = months[currentDate.getMonth()];
        const currentDay = days[currentDate.getDay()];
    
        return {
        month: currentMonth,
        day: currentDay
        };
    };
    
    // Usage example
    const currentDateInfo = getCurrentDateInfo(currentDate);

    useEffect(() => {
        fetchCurrentEODData();
    }
    , [currentEOD]);

    return (
        <View className=" py-10 marker:flex-1 self-stretch bg-white dark:bg-black">
        <View className=" flex-row justify-around w-3/4 self-center">
            <Text className="text-white font-bold  bg-green px-2 rounded-lg ">{currentDate.getDay()}</Text>
            <Text className="text-green font-bold px-2 rounded-full">{currentDateInfo.month}</Text>
            <Text className="text-green font-bold px-2 rounded-full flex items">{currentDate.getFullYear()}</Text>
        </View>

        <View className="flex items-center ">
            <Text className=" px-16 py-3 self-center bg-green text-center rounded-md  text-white text-4xl font-bold m-3">
            {"₱ "+currentEOD?.rows._array[0].total_sales}
            </Text>
            <Text className="text-green text-2xl font-bold self-center mb-10 px-2 rounded-full flex items">
            Total Sales
            </Text>
        </View>

        <Link href="/(tabs)/currentEOD" asChild>
            <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
            <Text className="text-green text-xl font-bold">View Current EOD</Text>
            <FontAwesome5 name="angle-right" size={24} color="black" style={{ opacity: 0.5 }} />
            </Pressable>
        </Link>

        <Link href="/(tabs)/previousEOD" asChild>
            <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
            <Text className="text-green text-xl font-bold">View Previous EOD</Text>
            <FontAwesome5 name="angle-right" size={24} color="black" style={{ opacity: 0.5 }} />
            </Pressable>
        </Link>

        <Link href="/(tabs)/termsOfService" asChild>
            <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
            <Text className="text-green text-xl font-bold">Terms of Service</Text>
            <FontAwesome5 name="angle-right" size={24} color="black" style={{ opacity: 0.5 }} />
            </Pressable>
        </Link>

        <Link href="/(tabs)/privacyPolicy" asChild>
            <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
            <Text className="text-green text-xl font-bold">Privacy Policy</Text>
            <FontAwesome5 name="angle-right" size={24} color="black" style={{ opacity: 0.5 }} />
            </Pressable>
        </Link>

        <Link href="/(tabs)/faqs" asChild>
            <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
            <Text className="text-green text-xl font-bold">FAQs</Text>
            <FontAwesome5 name="angle-right" size={24} color="black" style={{ opacity: 0.5 }} />
            </Pressable>
        </Link>

        <Pressable
            className="bg-transparent w-4/6 self-center mt-10 bg-green items-center rounded-full py-2 px-4 mb-5 ml-2"
            onPress={showAlert}
        >
            <Text className="text-white text-xl font-bold">End Day</Text>
        </Pressable>
        </View>
    );
}