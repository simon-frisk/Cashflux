import React from 'react'
import { View } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker'

export default function SDatePicker({date, onDateChange}) {
  return (
    <View style={{display: 'flex', paddingVertical: 5, justifyContent: 'center'}}>
      <DateTimePicker
        value={date}
        mode='date'
        display='default'
        onChange={(_, selectedDate) => {
          const currentDate = selectedDate || date
          onDateChange(currentDate)
        }}
      />
    </View>
  )
}