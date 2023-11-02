import { useSelector } from "react-redux";
import { selectCart } from "../../redux/CartSelectors";
import CartItemList from "./CartItemList";
import { View, Image, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

export default function CartItemsGenerator() {

    const cartState = useSelector(selectCart);
    
    const isCartEmpty = () => {
        if(cartState.cart.length == 0) {
            return true;
        }
    }

    if(isCartEmpty()) {
        return(
            <View className="flex-1">
                <Text className="text-4xl ml-5 text-green"
                    style={{fontFamily: 'Poppins-Medium'}}
                >
                    Cart
                </Text>
                <View className="flex-1 justify-center items-center">
                    <FontAwesome name="cart-plus" size={300} color="black" />
                    <Text className="text-2xl mt-5"
                        style={{fontFamily: 'Poppins-Medium'}}
                    >
                        Your cart is empty
                    </Text>
                </View>
            </View>
        )
    }
    else {
        return(
            <ScrollView>
                <Text className="text-4xl ml-5 text-green"
                    style={{fontFamily: 'Poppins-Medium'}}
                >
                    Cart
                </Text>
                <CartItemList
                    cart={cartState.cart}
                />
            </ScrollView>
        )
    }

}