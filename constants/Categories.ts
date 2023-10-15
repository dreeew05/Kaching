import { ImageSourcePropType } from "react-native";

interface ConstantCategoryProps {
    [id : number] : ImageSourcePropType
}

const categories : ConstantCategoryProps = {
    10000 : require('../assets/images/appetizer.jpg'),
    10001 : require('../assets/images/beverages.jpg'),
    10002 : require('../assets/images/dessert.jpg'),
    10003 : require('../assets/images/main_course.jpg'),
    10004 : require('../assets/images/pizza.jpg'),
    10005 : require('../assets/images/salad.jpg'),
    10006 : require('../assets/images/side_dish.jpg'),
    10007 : require('../assets/images/special.jpg')
}

export default categories;