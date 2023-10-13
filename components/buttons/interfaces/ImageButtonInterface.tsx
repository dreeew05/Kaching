import { ImageSourcePropType, ImageStyle, StyleProp } from "react-native";
import { BaseButtonInterface } from "./BaseButtonInterface";

export interface ImageButtonInterface extends BaseButtonInterface {
    image : ImageSourcePropType
    imageStyle? : StyleProp<ImageStyle>
}