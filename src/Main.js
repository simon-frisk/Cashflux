import React from 'react'
import { ScrollView, StatusBar } from 'react-native'
import ExpenseChart from './ExpenseChart'
import useData from './useData'
import Expense from './Expense'
import AddExpense from './AddExpense'


export default function Main() {
  const data = useData()

  return (
    <ScrollView style={{backgroundColor: '#111'}} contentContainerStyle={{
      paddingVertical: 40,
      paddingHorizontal: 20,
    }}>
      <ExpenseChart categories={data.categories} expenses={data.expenses} />
      <StatusBar barStyle="light-content" />
      <AddExpense categories={data.categories} addExpense={data.addExpense} />
      {data.expenses.map(expense => <Expense expense={expense} deleteExpense={data.deleteExpense} key={expense.id} />)}
    </ScrollView>
  );
}

