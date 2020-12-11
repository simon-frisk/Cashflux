import React from 'react'
import { ScrollView, StatusBar } from 'react-native'
import Charts from './Charts'
import useData from './useData'
import AddExpense from './AddExpense'
import Categories from './Categories'
import dataContext from './dataContext'
import ExpenseList from './ExpenseList'

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
        <ExpenseList />
      </dataContext.Provider>
    </ScrollView>
  );
}

