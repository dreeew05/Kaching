import { ImageSourcePropType } from "react-native";

export interface OrderSummaryProps {
    id : number,
    name : string,
    quantity : number,
    totalPrice : number,
    image : ImageSourcePropType
}

export interface OrderSummaryListProps {
    cart : OrderSummaryProps[]
}
