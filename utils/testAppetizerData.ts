import TestProductInterface from "./testProductInterface"

const appetizers : TestProductInterface[] = [
    {
        id : 10000,
        name : 'Mozarella Sticks',
        price : 5.99,
        image: require('../assets/icons/blank.jpg')
    },
    {
        id : 10001,
        name : 'Bruschetta',
        price : 7.99,
        image: require('../assets/icons/blank.jpg')
    },
    {
        id : 10002,
        name : 'Deviled Eggs',
        price : 9.99,
        image: require('../assets/icons/blank.jpg')
    }
]

export default appetizers;