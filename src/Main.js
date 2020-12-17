import React from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Charts from './Charts/Charts'
import useData from './data/useData'
import AddExpense from './AddExpense'
import Categories from './Categories'
import dataContext from './dataContext'
import ExpenseList from './ExpenseList'
import Options from './Options'
import useStyle from './util/useStyle'

export default function Main() {
  const data = useData()
  const style = useStyle(data.theme)

  if (!data.initialLoadDone)
    return (
      <View style={{backgroundColor: style.backgroundColor, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    )
  
  return (
    <dataContext.Provider value={data}>
      <ScrollView style={{backgroundColor: style.backgroundColor}} contentContainerStyle={{
        paddingTop: 40,
        paddingHorizontal: 15
      }}>
          <StatusBar style={style.themeMode == 'Dark' ? 'light' : 'dark'} />
          <Options />
          <Charts />
          <Categories />
          <AddExpense />
          <ExpenseList />
      </ScrollView>
    </dataContext.Provider>
  )
}

