import { BaseItemProps } from "../__utils__/interfaces/BaseItemProps"
import { addToCart } from "../../redux/CartRedux/CartSlice";
import { Alert } from "react-native";
import { AppDispatch } from "../../redux/Store";

interface AddToCartInterface {
    quantity : number,
    itemState : BaseItemProps | undefined,
    product : BaseItemProps,
    dispatch : AppDispatch
}

export const addToCartEvent = (item : AddToCartInterface) => {

    // TODO: Create custom alert component
    if(item.itemState == undefined) {
        if(item.quantity > 0) {
            item.dispatch(addToCart({
                id : item.product.id,
                name : item.product.name,
                price : item.product.price,
                quantity : item.quantity,
                image : item.product.image,
                category : item.product.category,
            }));
            Alert.alert('Item added to cart!')
        }
        else {
            Alert.alert('Please add quantity!')
        }
    }
    else {
        Alert.alert('Item already in cart!')
    }
}