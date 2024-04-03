import { ImageSourcePropType } from 'react-native';

export interface DefaultCategory {
  categoryId: number;
  name: string;
  image: ImageSourcePropType;
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
          name: 'Category 1',
          image: require('../assets/images/onboarding/stock_categories/0.png'),
        },
        {
          categoryId: 1,
          name: 'Category 2',
          image: require('../assets/images/onboarding/stock_categories/2.png'),
        },
        {
          categoryId: 2,
          name: 'Category 3',
          image: require('../assets/images/onboarding/stock_categories/3.png'),
        },
        {
          categoryId: 3,
          name: 'Category 4',
          image: require('../assets/images/onboarding/stock_categories/4.png'),
        },
        {
          categoryId: 4,
          name: 'Category 5',
          image: require('../assets/images/onboarding/stock_categories/5.png'),
        },
        {
          categoryId: 5,
          name: 'Category 6',
          image: require('../assets/images/onboarding/stock_categories/6.png'),
        },
        {
          categoryId: 6,
          name: 'Category 7',
          image: require('../assets/images/onboarding/stock_categories/7.png'),
        },
        {
          categoryId: 7,
          name: 'Category 8',
          image: require('../assets/images/onboarding/stock_categories/8.png'),
        },
        {
          categoryId: 8,
          name: 'Category 9',
          image: require('../assets/images/onboarding/stock_categories/9.png'),
        },
        {
          categoryId: 9,
          name: 'Category 10',
          image: require('../assets/images/onboarding/stock_categories/10.png'),
        },
        {
          categoryId: 10,
          name: 'Category 11',
          image: require('../assets/images/onboarding/stock_categories/11.png'),
        },
        {
          categoryId: 11,
          name: 'Category 12',
          image: require('../assets/images/onboarding/stock_categories/12.png'),
        },
        {
          categoryId: 12,
          name: 'Category 13',
          image: require('../assets/images/onboarding/stock_categories/13.png'),
        },
        {
          categoryId: 13,
          name: 'Category 14',
          image: require('../assets/images/onboarding/stock_categories/14.png'),
        },
      ],
    },
  };
};
