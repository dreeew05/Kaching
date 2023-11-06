import React, { useState } from 'react';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';

interface CalendarPickerProps {
  onDateFromPicker: (date: Date) => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ onDateFromPicker }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const intoDateObject = (date: string): Date => {
    // Function to convert a date string into a date object
    const dateParts = date.split('/');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[2]);
    const dateObject = new Date(year, month, day+1);
    return dateObject;
  };

  const currentDate = new Date();
  const previousDate = new Date(currentDate);
  previousDate.setDate(currentDate.getDate() - 1);

  const fixDate = getFormatedDate(previousDate, 'YYYY-MM-DD')
  const maximumDate = fixDate.split('/').join('-');

  const sendDataToParent = () => {
    // Function to send data to the parent
    onDateFromPicker(intoDateObject(selectedDate));
  };
  sendDataToParent();

  return (
    <DatePicker
        maximumDate={maximumDate}
        onSelectedChange={date => setSelectedDate(date)}
        options={{
        backgroundColor: '#ffffff',
        textHeaderColor: '#18573A',
        textDefaultColor: '#18573A',
        selectedTextColor: '#fff',
        mainColor: '#18573A',
        textSecondaryColor: '#CD9250',
        borderColor: '#CCCCCC',
        }}
        current={maximumDate}
        selected={maximumDate}
        mode="calendar"
        style={{ borderRadius: 10,}}
        />
  );
}

export default CalendarPicker;