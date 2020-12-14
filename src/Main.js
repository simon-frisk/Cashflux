import React from 'react'
import { ActivityIndicator, ScrollView, StatusBar, View } from 'react-native'
import Charts from './Charts'
import useData from './data/useData'
import AddExpense from './AddExpense'
import Categories from './Categories'
import dataContext from './dataContext'
import ExpenseList from './ExpenseList'
import Options from './Options'

export default function Main() {
  const data = useData()

  if (data.loading)
    return (
      <View style={{backgroundColor: '#111', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    )
  
  return (
    <dataContext.Provider value={data}>
      <ScrollView style={{backgroundColor: '#111'}} contentContainerStyle={{
        paddingTop: 40,
        paddingHorizontal: 20
      }}>
          <StatusBar barStyle="light-content" />
          <Options />
          <Charts />
          <Categories />
          <AddExpense />
          <ExpenseList />
      </ScrollView>
    </dataContext.Provider>
  )
}

