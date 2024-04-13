import { BaseNameImage } from './BusinessTypes';

export interface DefaultProduct extends BaseNameImage {
  productId: number;
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
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/beverages/coffee.JPG'),
        },
        {
          productId: 1,
          name: 'Tea',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/beverages/tea.JPG'),
        },
        {
          productId: 2,
          name: 'Hot Chocolate',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/beverages/hot_chocolate.jpg'),
        },
        {
          productId: 3,
          name: 'Frapuccino',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/beverages/frapuccino.jpg'),
        },
        {
          productId: 4,
          name: 'Smoothie',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/beverages/smoothie.jpg'),
        },
      ],
    },
    1: {
      products: [
        {
          productId: 5,
          name: 'Pastry',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/food/pastry.jpg'),
        },
        {
          productId: 6,
          name: 'Sandwich',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/food/sandwich.jpg'),
        },
        {
          productId: 7,
          name: 'Salad',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/food/salad.jpg'),
        },
        {
          productId: 8,
          name: 'Snacks',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/food/snacks.JPG'),
        },
        {
          productId: 9,
          name: 'Cake',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/food/cakes.jpg'),
        },
      ],
    },
    2: {
      products: [
        {
          productId: 10,
          name: 'Coffee Mug',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/merchandise/coffee_mug.jpg'),
        },
        {
          productId: 11,
          name: 'Tumbler',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/merchandise/tumbler.jpg'),
        },
        {
          productId: 12,
          name: 'Coffee Beans',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/merchandise/coffee_bean.jpg'),
        },
        {
          productId: 13,
          name: 'Gift Basket',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/merchandise/gift_basket.jpg'),
        },
      ],
    },
  };
};
