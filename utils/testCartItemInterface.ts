import { ImageSourcePropType } from "react-native";

interface TestProductInterface {
    id : number,
    name : string,
    category : string,
    quantity : number,
    price : number,
    image : ImageSourcePropType 
}

export default TestProductInterface;