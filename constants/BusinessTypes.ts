export interface BusinessType {
  id: number;
  name: string;
  image: string;
}

interface BusinessTypes {
  [key: number]: BusinessType;
}

export const getBusinessTypes = (): BusinessTypes => {
  return {
    0: {
      id: 0,
      name: 'Electric Commerce',
      image: '/../assets/images/onboarding/business_types/Asset2.png',
    },
    1: {
      id: 1,
      name: 'Business Process',
      image: '/assets/images/onboarding/business_types/Asset 3.png',
    },
    2: {
      id: 2,
      name: 'Teamwork',
      image: '../assets/images/onboarding/business_types/Asset 4.png',
    },
    3: {
      id: 3,
      name: 'Accounting',
      image: '../assets/images/onboarding/business_types/Asset 5.png',
    },
    4: {
      id: 4,
      name: 'Business Tools',
      image: '../assets/images/onboarding/business_types/Asset 6.png',
    },
    5: {
      id: 5,
      name: 'Success',
      image: '../assets/images/onboarding/business_types/Asset 7.png',
    },
    6: {
      id: 6,
      name: 'Profit',
      image: '../assets/images/onboarding/business_types/Asset 8.png',
    },
    7: {
      id: 7,
      name: 'Idea',
      image: '../assets/images/onboarding/business_types/Asset 9.png',
    },
    8: {
      id: 8,
      name: 'Online Advertising',
      image:
        '../assets/images/onboarding/business_types/Asset 10.png',
    },
  };
};
