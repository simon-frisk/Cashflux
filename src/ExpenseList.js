import React, { useContext } from 'react'
import { View } from 'react-native'
import SText from './components/SText'
import dataContext from './dataContext'
import Expense from './Expense'
import { getMonthlyExpenses} from './util/DateTools'

export default () => {
  const {expenses} = useContext(dataContext)

  const monthlyExpenses = getMonthlyExpenses(expenses)

  return (
    <View>
      {monthlyExpenses.map(month => (
        <View key={month.string}>
          <SText color='#bbb' style={{marginTop: 20, marginBottom: 5}}>{month.string}</SText>
          <View  />
          {month.expenses.map(expense => <Expense expense={expense} key={expense.id.toString()} />)}
        </View>
      ))}
    </View>
  )
}