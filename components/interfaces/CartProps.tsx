import { ImageSourcePropType } from "react-native"

export interface CartProps {
    id : number,
    name : string
    category : string
    quantity : number
    price : number
    image : ImageSourcePropType
}