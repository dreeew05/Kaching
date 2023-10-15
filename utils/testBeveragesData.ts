import TestProductInterface from "./testProductInterface"

const beverages : TestProductInterface[] = [
    {
        id : 10003,
        name : 'Beer',
        price : 1.99,
        image: require('../assets/icons/blank.jpg')
    },
    {
        id : 10004,
        name : 'Coca-Cola',
        price : 1.99,
        image: require('../assets/icons/blank.jpg')
    },
    {
        id : 10005,
        name : 'Pepsi',
        price : 1.99,
        image: require('../assets/icons/blank.jpg')
    }
]

export default beverages;