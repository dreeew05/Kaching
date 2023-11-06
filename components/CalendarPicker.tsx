import React, { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';

const CalendarPicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
 
    const currentDate = new Date();
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);

    const fixDate = new Intl.DateTimeFormat(['ban', 'id']).format(previousDate);
    const formattedDate = fixDate.split('/').reverse().join('-');

    //send selectedDate to output something
  return (
    <DatePicker
        maximumDate={formattedDate}
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
        current={formattedDate}
        selected={formattedDate}
        mode="calendar"
        style={{ borderRadius: 10,}}
        />
  );
}

export default CalendarPicker;