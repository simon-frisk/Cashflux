import React from 'react'
import { View } from 'react-native'
import SText from './components/SText'

export default ({expense}) => {
  return (
    <View style={{paddingVertical: 8, borderBottomColor: '#bbb', borderBottomWidth: 1}}>
      <SText fontSize={23}>{expense.text}</SText>
      <SText color='#bbb'>{expense.category.emoji} {expense.category.name} - {expense.date} - {expense.cost}kr</SText>
    </View>
  )
}