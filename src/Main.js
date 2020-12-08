import React from 'react'
import { ScrollView, StatusBar } from 'react-native'
import Charts from './Charts'
import useData from './useData'
import Expense from './Expense'
import AddExpense from './AddExpense'
import Categories from './Categories'


export default function Main() {
  const data = useData()

  return (
    <ScrollView style={{backgroundColor: '#111'}} contentContainerStyle={{
      paddingTop: 40,
      paddingHorizontal: 20
    }}>
      <StatusBar barStyle="light-content" />
      <Charts categories={data.categories} expenses={data.expenses} />
      <Categories categories={data.categories} addCategory={data.addCategory} updateCategory={data.updateCategory} deleteCategory={data.deleteCategory} />
      <AddExpense categories={data.categories} addExpense={data.addExpense} />
      {data.expenses.map(expense => <Expense expense={expense} deleteExpense={data.deleteExpense} key={expense.id} />)}
    </ScrollView>
  );
}

