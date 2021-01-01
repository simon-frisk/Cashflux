import React, { useContext, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import SText from '../components/SText'
import { useNavigation } from '@react-navigation/native'
import dataContext from '../dataContext'
import { getMonthlyExpenses, getDayString } from '../util/DateTools'
import useStyle from '../util/useStyle'
import { getCostString } from '../util/currency'

export default () => {
  const {expenses} = useContext(dataContext)
  const style = useStyle()

  const monthlyExpenses = getMonthlyExpenses(expenses)
  const defaultMonth = monthlyExpenses.length != 0 ? monthlyExpenses[0].string : null
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth)
  const monthExpenses = monthlyExpenses.find(month => month.string == selectedMonth)
  
  return (
    <View
      style={{marginTop: 15, marginBottom: 30}}
    >
      <FlatList
        data={monthlyExpenses.map(month => month.string)}
        horizontal={true}
        keyExtractor={month => month}
        contentContainerStyle={{paddingBottom: 7, alignItems: 'center'}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item: month}) => (
          <TouchableOpacity
            onPress={() => setSelectedMonth(month)}
            style={{
              borderBottomColor: style.primaryColor,
              borderBottomWidth: selectedMonth == month ? 4 : 0,
              marginRight: 10,
            }}
          >
            <SText
              fontSize={selectedMonth == month ? 25 : 20}
              color={selectedMonth == month ? style.text : style.lightText}
            >{month}</SText>
          </TouchableOpacity>
        )}
      />
      <View
        style={{
          borderTopColor: style.light, 
          borderTopWidth: .5,
          borderBottomColor: style.light, 
          borderBottomWidth: .5
        }}
      >
        {!!monthExpenses && monthExpenses.expenses.map(expense => (
          <Expense expense={expense} key={expense.id.toString()} />
        ))}
      </View>
    </View>
  )
}

function Expense({expense}) {
  const navigation = useNavigation()
  const style = useStyle()
  const {currency} = useContext(dataContext)

  return (
    <TouchableOpacity 
      style={{
        paddingVertical: 5, 
        borderTopColor: style.light, 
        borderTopWidth: .5,
        borderBottomColor: style.light, 
        borderBottomWidth: .5
      }} 
      onPress={() => navigation.navigate('Expense', {expense})}
    >
      <SText fontSize={25}>{expense.text}</SText>
      <SText color={style.lightText}>{expense.category.emoji} {expense.category.name} - {getDayString(expense.date)} - {getCostString(expense.cost, currency)}</SText>
    </TouchableOpacity>
  )
}