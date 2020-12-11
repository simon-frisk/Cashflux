import React, { useContext } from 'react'
import { View } from 'react-native'
import SText from './components/SText'
import dataContext from './dataContext'
import Expense from './Expense'
import {getMonthString, getMonthlyExpenses} from './util/MonthTools'

export default () => {
  const {expenses} = useContext(dataContext)

  const monthlyExpenses = getMonthlyExpenses(expenses)

  return (
    <View>
      {monthlyExpenses.map(month => (
        <>
          <SText color='#bbb' style={{marginTop: 20, marginBottom: 5}}>{getMonthString(month[0].date)}</SText>
          <View  />
          {month.map(expense => <Expense expense={expense} key={expense.id} />)}
        </>
      ))}
    </View>
  )
}