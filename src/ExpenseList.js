import React, { useContext } from 'react'
import { View } from 'react-native'
import SText from './components/SText'
import dataContext from './dataContext'
import Expense from './Expense'

const getMonthString = date => date.split(' ')[1] + date.split(' ')[3]

function getMonthlyExpenses(expenses) {
  const months = []

  
  let currentMonth
  let index = -1
  for (const expense of expenses) {
    const month = getMonthString(expense.date)
    if(month != currentMonth) {
      index ++
      currentMonth = month
      months[index] = []
    }
    months[index].push(expense)
  }

  return months
}

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