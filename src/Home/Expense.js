import React, { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'
import SText from '../components/SText'
import { getDayString } from '../util/DateTools'
import useStyle from '../util/useStyle'
import dataContext from '../dataContext'

export default ({expense}) => {
  const navigation = useNavigation()
  const style = useStyle()
  const {currency} = useContext(dataContext)

  return (
    <View style={{paddingVertical: 5, borderTopColor: style.themeMode == 'Dark' ? style.interfaceColor : '#ddd', borderTopWidth: 1.5}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <View>
          <SText fontSize={25}>{expense.text}</SText>
          <SText color={style.lightText}>{expense.category.emoji} {expense.category.name} - {getDayString(expense.date)} - {expense.cost}{currency}</SText>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Expense', {expense})}>
          <Entypo name="dots-three-vertical" size={28} style={{padding: 10}} color={style.lightText} />
        </TouchableOpacity>
      </View>
    </View>
  )
}