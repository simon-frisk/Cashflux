import React, { useContext } from 'react'
import { View } from 'react-native'
import SText from './components/SText'
import dataContext from './dataContext'
import Expense from './Expense'
import { getMonthlyExpenses} from './util/DateTools'
import useStyle from './util/useStyle'

export default () => {
  const {expenses} = useContext(dataContext)
  const style = useStyle()

  const monthlyExpenses = getMonthlyExpenses(expenses)

  return (
    <View>
      {monthlyExpenses.map(month => (
        <View key={month.string} style={{marginTop: 25, marginBottom: 15}}>
          <SText color={style.lightText} fontSize={25} style={{marginBottom: 5}}>{month.string}</SText>
          <View  />
          {month.expenses.map(expense => <Expense expense={expense} key={expense.id.toString()} />)}
        </View>
      ))}
    </View>
  )
}