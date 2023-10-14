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
    },
    {
        id : 10003,
        name : 'Main Course',
        image : require('../assets/images/main_course.jpg')
    },
    {
        id : 10004,
        name : 'Pizza',
        image : require('../assets/images/pizza.jpg')
    },
    {
        id : 10005,
        name : 'Salad',
        image : require('../assets/images/salad.jpg')
    },
    {
        id : 10006,
        name : 'Side Dish',
        image : require('../assets/images/side_dish.jpg')
    },
    {
        id : 10007,
        name : 'Special',
        image : require('../assets/images/special.jpg')
    },
]

export default categories;