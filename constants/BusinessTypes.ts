import { ImageSourcePropType } from 'react-native';

export interface BusinessType {
  id: number;
  name: string;
  image: ImageSourcePropType;
}

interface BusinessTypes {
  [key: number]: BusinessType;
}

export const getBusinessTypes = (): BusinessTypes => {
  return [
    {
      id: 0,
      name: 'Electric Commerce',
      image: require('../assets/images/onboarding/business_types/0.jpg'),
    },
    {
      id: 1,
      name: 'Business Process',
      image: require('../assets/images/onboarding/business_types/1.jpg'),
    },
    {
      id: 2,
      name: 'Teamwork',
      image: require('../assets/images/onboarding/business_types/2.jpg'),
    },
    {
      id: 3,
      name: 'Accounting',
      image: require('../assets/images/onboarding/business_types/3.jpg'),
    },
    {
      id: 4,
      name: 'Business Tools',
      image: require('../assets/images/onboarding/business_types/0.jpg'),
    },
    {
      id: 5,
      name: 'Success',
      image: require('../assets/images/onboarding/business_types/1.jpg'),
    },
    {
      id: 6,
      name: 'Profit',
      image: require('../assets/images/onboarding/business_types/2.jpg'),
    },
    {
      id: 7,
      name: 'Idea',
      image: require('../assets/images/onboarding/business_types/3.jpg'),
    },
    {
      id: 8,
      name: 'Online Advertising',
      image: require('../assets/images/onboarding/business_types/0.jpg'),
    },
    {
      id: 9,
      name: 'Others',
      image: require('../assets/images/onboarding/business_types/1.jpg'),
    },
  ];
};
