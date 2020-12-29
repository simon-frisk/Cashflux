import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import SText from '../components/SText'
import dataContext from '../dataContext'
import { getMonthlyExpenses} from '../util/DateTools'
import useStyle from '../util/useStyle'
import SSelectionSlider from '../components/SSelectionSlider'
import Expense from './Expense'

export default () => {
  const {expenses} = useContext(dataContext)

  const monthlyExpenses = getMonthlyExpenses(expenses)

  const defaultMonth = monthlyExpenses.length != 0 ? monthlyExpenses[0].string : null
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth)

  const monthExpenses = monthlyExpenses.find(month => month.string == selectedMonth)
  
  return (
    <View
      style={{marginTop: 15, marginBottom: 30}}
    >
      <SSelectionSlider
        items={monthlyExpenses.map(month => month.string)}
        selected={selectedMonth}
        setSelected={setSelectedMonth}
        keyExtractor={month => month}
        textExtractor={month => month}
      />
      {!!monthExpenses && monthExpenses.expenses.map(expense => (
        <Expense expense={expense} key={expense.id.toString()} />
      ))}
    </View>
  )
}