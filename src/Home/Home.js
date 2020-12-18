import 'react-native-gesture-handler';
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons'
import Charts from '../Charts/Charts'
import CategoryScroller from '../components/CategoryScroller'
import ExpenseList from './ExpenseList'
import useStyle from '../util/useStyle'
import SButton from '../components/SButton'
import SPageContainer from '../components/SPageContainer'

export default function Home({navigation}) {
  return (
    <SPageContainer>
        <OptionsButton />
        <Charts />
        <CategoryScroller />
        <SButton text='Add expense' action={() => navigation.navigate('Addexpense')} />
        <ExpenseList />
      </SPageContainer>
  )
}

function OptionsButton() {
  const navigation = useNavigation()
  const style = useStyle()

  return (
    <TouchableOpacity
        onPress={() => navigation.navigate('Options')}
        style={{
          position: 'absolute',
          right: 10,
          top: 25,
          zIndex: 10,
          width: 80,
          height: 35,
          borderRadius: 10,
          backgroundColor: style.interfaceColor,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Octicons
          name="gear"
          size={20}
          color="white"
        />
      </TouchableOpacity>
  )
}