import { ImageSourcePropType } from 'react-native';

export interface BaseItemProps {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
}
