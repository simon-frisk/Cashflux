import React from 'react'
import { TouchableOpacity } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Charts from '../Charts/Charts'
import CategoryScroller from '../components/CategoryScroller'
import ExpenseList from './ExpenseList'
import SPageContainer from '../components/SPageContainer'
import useStyle from '../util/useStyle'
import SBottomBar from '../components/SBottomBar'
import STextButton from '../components/STextButton'

export default function Home({navigation}) {
  const style = useStyle()

  return (
    <>
      <SPageContainer style={{paddingTop: 0}}>
        <Charts />
        <CategoryScroller />
        <ExpenseList />
      </SPageContainer>
      <SBottomBar>
        <TouchableOpacity onPress={() => navigation.navigate('Addexpense')}>
          <STextButton text='Add expense' icon={<AntDesign name='pluscircle' />} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Options')}>
          <Octicons
            name="gear"
            size={27}
            color={style.lightText}
          />
        </TouchableOpacity>
      </SBottomBar>
    </>
  )
}