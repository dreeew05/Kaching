import { ImageSourcePropType } from 'react-native';

export interface BaseNameImage {
  name: string;
  image: ImageSourcePropType;
}
export interface BusinessType extends BaseNameImage {
  id: number;
}

interface BusinessTypes {
  [key: number]: BusinessType;
}

export const getBusinessTypes = (): BusinessTypes => {
  return [
    {
      id: 0,
      name: 'Coffee Shop',
      image: require('../assets/images/onboarding/business_types/coffee_shop.jpg'),
    },
    {
      id: 1,
      name: 'Carinderia',
      image: require('../assets/images/onboarding/business_types/carinderia.jpg'),
    },
    {
      id: 2,
      name: 'Sari-Sari Store',
      image: require('../assets/images/onboarding/business_types/sari-sari.jpg'),
    },
    {
      id: 3,
      name: 'School Supply',
      image: require('../assets/images/onboarding/business_types/school_supply.jpg'),
    },
    {
      id: 4,
      name: 'E-loading',
      image: require('../assets/images/onboarding/business_types/e-loading.jpg'),
    },
    {
      id: 5,
      name: 'Printing Services',
      image: require('../assets/images/onboarding/business_types/printing.jpg'),
    },
    {
      id: 6,
      name: 'Bakery & Pastry Shop',
      image: require('../assets/images/onboarding/business_types/bakery.jpg'),
    },
    {
      id: 7,
      name: 'Others',
      image: require('../assets/images/onboarding/business_types/others.jpg'),
    },
  ];
};
