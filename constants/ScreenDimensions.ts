import { Dimensions } from 'react-native';

export const getScreenHeight = (): number => {
  return Dimensions.get('window').height;
};
