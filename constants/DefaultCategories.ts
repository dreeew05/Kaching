import { BaseNameImage } from './BusinessTypes';

export interface DefaultCategory extends BaseNameImage {
  categoryId: number;
}

interface DefaultCategories {
  [key: number]: {
    categories: DefaultCategory[];
  };
}

export const getDefaultCategories = (): DefaultCategories => {
  return {
    0: {
      categories: [
        {
          categoryId: 0,
          name: 'Beverages',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/beverages/beverages.jpg'),
        },
        {
          categoryId: 1,
          name: 'Food',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/food/food.jpg'),
        },
        {
          categoryId: 2,
          name: 'Merchandise',
          image: require('../assets/images/onboarding/stock_categories/coffee_shop/merchandise/merchandise.jpg'),
        },
      ],
    },
  };
};
