import { ImageSourcePropType } from 'react-native';

export interface BaseItemProps {
  id: number;
  name: string;
  image: ImageSourcePropType;
  price: number;
  category_id: string;
}
