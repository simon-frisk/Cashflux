import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SText from '../components/SText'
import { getDayString } from '../util/DateTools'
import useStyle from '../util/useStyle'
import dataContext from '../dataContext'
import { getCostString } from '../util/currency'

export default ({expense}) => {
  const navigation = useNavigation()
  const style = useStyle()
  const {currency} = useContext(dataContext)

  return (
    <TouchableOpacity style={{paddingVertical: 5, borderTopColor: style.themeMode == 'Dark' ? style.interfaceColor : '#ccc', borderTopWidth: 1}} onPress={() => navigation.navigate('Expense', {expense})}>
      <SText fontSize={25}>{expense.text}</SText>
      <SText color={style.lightText}>{expense.category.emoji} {expense.category.name} - {getDayString(expense.date)} - {getCostString(expense.cost, currency)}</SText>
    </TouchableOpacity>
  )
}