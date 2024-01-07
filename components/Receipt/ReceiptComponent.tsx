import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotalPrice } from "../../redux/CartRedux/CartSelectors";
import { View, Text, ScrollView, Pressable } from "react-native";
import ReceiptItemList from "./ReceiptItemList";
import { ParamsToFloat } from "../__utils__/helper/ParamsToFloat";

export default function ReceiptComponent() {
    const router = useRouter();
    const viewIndex = () => {
        router.push('../');
    };

    const params = useLocalSearchParams();
    const userPayment : number = ParamsToFloat(params.userPayment);
    console.log(userPayment);


    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectCartTotalPrice)

    const change : number = userPayment - totalPrice;

    return (
        <View className="flex-1 self-stretch bg-white dark:bg-black">
        <Text className="text-2xl font-semibold text-green self-center">Transaction Recorded!</Text>
        <View className="flex flex-row self-center">
            <Text className="text-2xl font-semibold 
                text-green self-center"
            >
                Change: 
            </Text>
            <Text className="text-2xl font-semibold text-yellow 
                self-center"
            >
                {change}
            </Text>
        </View>

        <ScrollView>
            <View className="flex flex-collumn items-center mt-5">
            <Text className="text-5xl font-semibold text-green">Store Name</Text>
            <Text className="text-sm ml-5 ">Glen Bulaong</Text>
            <Text className="text-sm ml-5 ">09123456789</Text>
            <Text className="text-sm ml-5 mb-5">October 24, 2023</Text>
            </View>
            <View>
            {/* Generate Items */}
            <ReceiptItemList cart={cartItems} />
            </View>
        </ScrollView>

        <View className="flex-row justify-between p-4 border-spacing-3 border border-white border-t-gray"></View>
        <Pressable
            className="bg-transparent w-2/3 self-center bg-green items-center rounded-full py-2 px-4 mb-5 ml-2 self-center"
            onPress={viewIndex}
        >
            <Text className="text-white text-xl font-bold">Done</Text>
        </Pressable>
        </View>
    );
}