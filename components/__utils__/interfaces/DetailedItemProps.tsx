import { BaseItemProps } from './BaseItemProps';

export interface DetailedItemProps extends BaseItemProps {
  description: string;
  is_available: number;
}
