import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import ExpenseChart from './src/ExpenseChart'
import SText from './src/SText'
import SButton from './src/SButton'
import AddExpenseModal from './src/AddExpenseModal';


export default function App() {
  return (
    <ScrollView style={{
      flex: 1,
      paddingVertical: 40,
      paddingHorizontal: 20,
      backgroundColor: '#333',
    }}>
      <StatusBar barStyle="dark-content" />
      <ExpenseChart />
      <SText fontSize={35}>Recordings</SText>
      <SButton text='+' action={() => {}} />
      <AddExpenseModal />
    </ScrollView>
  );
}

