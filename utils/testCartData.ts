import TestProductInterface from './testCartItemInterface';

const cartItems: TestProductInterface[] = [
  {
    id: 10003,
    name: 'Beer',
    category: 'Beverage',
    quantity: 1,
    price: 1.99,
    image: require('../assets/icons/blank.jpg'),
  },
  {
    id: 10004,
    name: 'Coca-Cola',
    category: 'Beverage',
    quantity: 2,
    price: 1.99,
    image: require('../assets/icons/blank.jpg'),
  },
  {
    id: 10005,
    name: 'Pepsi',
    category: 'Beverage',
    quantity: 3,
    price: 1.99,
    image: require('../assets/icons/blank.jpg'),
  },
  {
    id: 10000,
    name: 'Mozarella Sticks',
    category: 'Appetizer',
    quantity: 4,
    price: 5.99,
    image: require('../assets/icons/blank.jpg'),
  },
  {
    id: 10001,
    name: 'Bruschetta',
    category: 'Appetizer',
    quantity: 5,
    price: 7.99,
    image: require('../assets/icons/blank.jpg'),
  },
  {
    id: 10002,
    name: 'Deviled Eggs',
    category: 'Appetizer',
    quantity: 6,
    price: 9.99,
    image: require('../assets/icons/blank.jpg'),
  },
];

export default cartItems;
