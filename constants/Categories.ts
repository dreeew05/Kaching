import { CategoryProps } from "../components/interfaces/CategoryProps";

const categories : CategoryProps[] = [
    {
        id : 10000,
        name : 'Appetizer',
        image : require('../assets/images/appetizer.jpg')
    },
    {
        id : 10001,
        name : 'Beverages',
        image : require('../assets/images/beverages.jpg')
    },
    {
        id : 10002,
        name : 'Dessert',
        image : require('../assets/images/dessert.jpg')
    }
]

export default categories;