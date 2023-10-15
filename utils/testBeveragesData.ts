import TestProductInterface from "./testProductInterface"

const beverages : TestProductInterface[] = [
    {
        id : 10003,
        name : 'Beer',
        image: require('../assets/icons/blank.jpg')
    },
    {
        id : 10004,
        name : 'Coca-Cola',
        image: require('../assets/icons/blank.jpg')
    },
    {
        id : 10005,
        name : 'Pepsi',
        image: require('../assets/icons/blank.jpg')
    }
]

export default beverages;