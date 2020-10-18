import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import SText from './components/SText'
import { AntDesign } from '@expo/vector-icons'; 

export default ({expense, deleteExpense}) => {
  return (
    <View style={{paddingVertical: 8, borderBottomColor: '#bbb', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <View>
        <SText fontSize={23}>{expense.text}</SText>
        <SText color='#bbb'>{expense.category.emoji} {expense.category.name} - {expense.date} - {expense.cost}kr</SText>
      </View>
      <TouchableOpacity onPress={() => deleteExpense(expense.id)}><AntDesign name="delete" size={24} color="#e66" /></TouchableOpacity>
    </View>
  )
}