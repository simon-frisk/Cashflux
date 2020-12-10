import React from 'react'
import { ScrollView, StatusBar } from 'react-native'
import Charts from './Charts'
import useData from './useData'
import Expense from './Expense'
import AddExpense from './AddExpense'
import Categories from './Categories'
import dataContext from './dataContext'

export default function Main() {
  const data = useData()

  return (
    <ScrollView style={{backgroundColor: '#111'}} contentContainerStyle={{
      paddingTop: 40,
      paddingHorizontal: 20
    }}>
      <dataContext.Provider value={data}>
        <StatusBar barStyle="light-content" />
        <Charts />
        <Categories />
        <AddExpense />
        {data.expenses.map(expense => <Expense expense={expense} key={expense.id} />)}
      </dataContext.Provider>
    </ScrollView>
  );
}

