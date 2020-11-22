import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import SText from './components/SText'
import { AntDesign } from '@expo/vector-icons'; 

export default ({expense, deleteExpense}) => {
  return (
    <View style={{paddingVertical: 8, borderTopColor: '#bbb', borderTopWidth: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <SText fontSize={23}>{expense.text}</SText>
        <TouchableOpacity onPress={() => deleteExpense(expense.id)}><AntDesign name="delete" size={24} color="#f44" /></TouchableOpacity>
      </View>
      <SText color='#bbb'>{expense.category.emoji} {expense.category.name} - {expense.date} - {expense.cost}kr</SText>
    </View>
  )
}