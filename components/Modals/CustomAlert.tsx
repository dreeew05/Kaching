import React from 'react';
import { Alert } from 'react-native';

type CustomAlertProps = {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function CustomAlert({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: CustomAlertProps) {
  return Alert.alert(
    title,
    message,
    [
      {
        text: confirmText,
        onPress: onConfirm,
        style: 'default',
      },
      {
        text: cancelText,
        onPress: onCancel,
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert('This alert was dismissed by tapping outside of the alert dialog.'),
    },
  );
}

// FORMAT

/*

<CustomAlert
  title="Title Here"
  message="Are you sure you want to proceed?"
  confirmText="Yes"
  cancelText="No"
  onConfirm={() => {
    // Action to be performed when the user confirms
    // For example, call a function or update the state
  }}
  onCancel={() => {
    // Action to be performed when the user cancels
    // For example, close the alert or navigate back
  }}
/>

*/
