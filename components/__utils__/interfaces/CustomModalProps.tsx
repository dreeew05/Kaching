import { BaseModalProps } from './BaseModalProps';

export interface CustomModalProps extends BaseModalProps {
  optionOneText: string;
  optionOnePressed: () => void;
  optionTwoText: string;
  optionTwoPressed: () => void;
  optionTwoColor: string;
}
