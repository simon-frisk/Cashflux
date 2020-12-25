import React from 'react'
import { TouchableOpacity } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons'
import Charts from '../Charts/Charts'
import CategoryScroller from '../components/CategoryScroller'
import ExpenseList from './ExpenseList'
import SButton from '../components/SButton'
import SPageContainer from '../components/SPageContainer'
import useStyle from '../util/useStyle'

export default function Home({navigation}) {
  const style = useStyle()

  return (
    <SPageContainer style={{paddingTop: 0}}>
        <Charts />
        <CategoryScroller />
        <SButton text='Add expense' action={() => navigation.navigate('Addexpense')} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Options')}
          style={{
            backgroundColor: style.interfaceColor, 
            width: '30%', 
            padding: 8,
            borderRadius: 15,
            alignSelf: 'flex-end',
            alignItems: 'center',
            marginTop: 7
          }}
        >
          <Octicons
            name="gear"
            size={22}
            color='white'
          />
        </TouchableOpacity>
        <ExpenseList />
      </SPageContainer>
  )
}