import { BaseNameImage } from './BusinessTypes';

export interface DefaultProduct extends BaseNameImage {
  productId: number;
  price: number;
  categoryId: number;
  description: string;
}

interface DefaultProducts {
  [key: number]: {
    products: DefaultProduct[];
  };
}

export const getDefaultProducts = (): DefaultProducts => {
  return {
    0: {
      products: [
        {
          productId: 0,
          name: 'Coffee',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/beverages/coffee.jpg'),
          price: 100.99,
          categoryId: 0,
          description:
            'A hot beverage made from the roasted and ground seeds of a tropical shrub.',
        },
        {
          productId: 1,
          name: 'Tea',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/beverages/tea.jpg'),
          price: 50.99,
          categoryId: 0,
          description:
            'A hot beverage made by infusing dried crushed leaves in boiling water.',
        },
        {
          productId: 2,
          name: 'Hot Chocolate',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/beverages/hot_chocolate.jpg'),
          price: 75.99,
          categoryId: 0,
          description:
            'A hot beverage made from cocoa powder and milk.',
        },
        {
          productId: 3,
          name: 'Frapuccino',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/beverages/frapuccino.jpg'),
          price: 150.99,
          categoryId: 0,
          description:
            'A cold beverage made from coffee, milk, and ice.',
        },
        {
          productId: 4,
          name: 'Smoothie',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/beverages/smoothie.jpg'),
          price: 125.99,
          categoryId: 0,
          description:
            'A cold beverage made from blended fruits and milk.',
        },
      ],
    },
    1: {
      products: [
        {
          productId: 5,
          name: 'Pastry',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/food/pastry.jpg'),
          price: 200.25,
          categoryId: 1,
          description: 'A sweet baked dessert made from dough.',
        },
        {
          productId: 6,
          name: 'Sandwich',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/food/sandwich.jpg'),
          price: 50,
          categoryId: 1,
          description:
            'A snack made from two pieces of bread with a filling.',
        },
        {
          productId: 7,
          name: 'Salad',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/food/salad.jpg'),
          price: 75,
          categoryId: 1,
          description:
            'A dish made from mixed raw vegetables and a dressing.',
        },
        {
          productId: 8,
          name: 'Snacks',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/food/snacks.jpg'),
          price: 25,
          categoryId: 1,
          description: 'A small amount of food eaten between meals.',
        },
        {
          productId: 9,
          name: 'Cake',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/food/cakes.jpg'),
          price: 150,
          categoryId: 1,
          description:
            'A sweet baked dessert made from flour, sugar, and eggs.',
        },
      ],
    },
    2: {
      products: [
        {
          productId: 10,
          name: 'Coffee Mug',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/merchandise/coffee_mug.jpg'),
          price: 250,
          categoryId: 2,
          description: 'A cup used for drinking coffee.',
        },
        {
          productId: 11,
          name: 'Tumbler',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/merchandise/tumbler.jpg'),
          price: 300,
          categoryId: 2,
          description:
            'A cup with a lid used for drinking cold beverages.',
        },
        {
          productId: 12,
          name: 'Coffee Beans',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/merchandise/coffee_bean.jpg'),
          price: 500,
          categoryId: 2,
          description:
            'The roasted seeds of a tropical shrub used to make coffee.',
        },
        {
          productId: 13,
          name: 'Gift Basket',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/merchandise/gift_basket.jpg'),
          price: 1000,
          categoryId: 2,
          description: 'A basket filled with coffee-related items.',
        },
      ],
    },
  };
};
