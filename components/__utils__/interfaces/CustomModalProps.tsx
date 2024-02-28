import { BaseModalProps } from './BaseModalProps';

export interface CustomModalProps extends BaseModalProps {
  optionOneText: string;
  optionOnePressed: () => void;
  optionOneColor: string;
  optionTwoText: string;
  optionTwoPressed: () => void;
  optionTwoColor: string;
}
