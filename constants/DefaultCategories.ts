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
    1: {
      categories: [
        {
          categoryId: 3,
          name: 'Viand',
          image: require('../assets/images/onboarding/stock_categories/carinderia/viand/viand.jpg'),
        },
        {
          categoryId: 4,
          name: 'Special',
          image: require('../assets/images/onboarding/stock_categories/carinderia/special/special.jpg'),
        },
        {
          categoryId: 5,
          name: 'Soup',
          image: require('../assets/images/onboarding/stock_categories/carinderia/soup/soup.jpg'),
        },
      ],
    },
    2: {
      categories: [
        {
          categoryId: 6,
          name: 'Snacks',
          image: require('../assets/images/onboarding/stock_categories/sari_sari/snacks/snacks.jpg'),
        },
        {
          categoryId: 7,
          name: 'Non-food',
          image: require('../assets/images/onboarding/stock_categories/sari_sari/non_food/non_food.jpg'),
        },
      ],
    },
    3: {
      categories: [
        {
          categoryId: 8,
          name: 'Pens',
          image: require('../assets/images/onboarding/stock_categories/school_supplies/pens/pens.jpg'),
        },
        {
          categoryId: 9,
          name: 'Papers',
          image: require('../assets/images/onboarding/stock_categories/school_supplies/papers/papers.jpg'),
        },
      ],
    },
  };
};
