import 'react-native-gesture-handler';
import React from 'react'
import Charts from '../Charts/Charts'
import CategoryScroller from '../components/CategoryScroller'
import ExpenseList from './ExpenseList'
import SButton from '../components/SButton'
import SPageContainer from '../components/SPageContainer'

export default function Home({navigation}) {
  return (
    <SPageContainer style={{paddingTop: 0}}>
        <Charts />
        <CategoryScroller />
        <SButton text='Add expense' action={() => navigation.navigate('Addexpense')} />
        <ExpenseList />
      </SPageContainer>
  )
}