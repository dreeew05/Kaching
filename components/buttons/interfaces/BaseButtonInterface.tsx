import { StyleProp, ViewStyle } from "react-native";

export interface BaseButtonInterface {
    text? : string,
    baseStyle? : StyleProp<ViewStyle>
    onPress : () => void
}