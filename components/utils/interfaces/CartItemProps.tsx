import { ImageSourcePropType } from "react-native"

export type CartItemProps = {
    id : number,
    name : string
    category : string
    quantity : number
    price : number
    image : ImageSourcePropType
}

export interface CartProps {
    cart : CartItemProps[]
}