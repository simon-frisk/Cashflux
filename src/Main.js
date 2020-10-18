import React from 'react'
import { ScrollView, StatusBar } from 'react-native'
import ExpenseChart from './components/SText'
import SButton from './components/SButton'
import SText from './components/SText'
import useData from './useData'


export default function Main() {
  const data = useData()

  return (
    <ScrollView style={{
      flex: 1,
      paddingVertical: 40,
      paddingHorizontal: 20,
      backgroundColor: '#333',
    }}>
      <ExpenseChart />
      <StatusBar barStyle="light-content" />
      <SButton text='+' action={() => {}} />
      {data.expenses.map(expense => <SText>{expense.text}</SText>)}
    </ScrollView>
  );
}

