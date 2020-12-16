import React, { useState } from 'react'
import { View, Platform } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker'
import SButton from './SButton'

export default function SDatePicker({date, onDateChange}) {
  const [show, setShow] = useState(false)

  return (
    <View style={{display: 'flex', paddingVertical: 5, justifyContent: 'center'}}>
      {Platform.OS == 'android' && (
        <SButton text={date.toDateString()} action={() => setShow(true)} style={{backgroundColor: '#555'}} />
      )}
      {(show || Platform.OS === 'ios') && (
        <DateTimePicker
          value={date}
          mode='date'
          display='default'
          onChange={(_, selectedDate) => {
            const currentDate = selectedDate || date
            setShow(false)
            onDateChange(currentDate)
          }}
        />
      )}
    </View>
  )
}