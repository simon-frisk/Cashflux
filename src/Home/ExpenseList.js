import React, { useContext, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import SText from '../components/SText'
import { useNavigation } from '@react-navigation/native'
import dataContext from '../dataContext'
import { getDayString } from '../util/DateTools'
import useStyle from '../util/useStyle'
import { getCostString } from '../util/currency'
import { useEffect } from 'react/cjs/react.development'

export default () => {
  const {monthStatistics} = useContext(dataContext)
  const style = useStyle()
  function getDefaultMonth() {
    return monthStatistics.months.length != 0 ? monthStatistics.months[0] : null
  }

  const [selectedMonth, setSelectedMonth] = useState(getDefaultMonth())

  useEffect(() => {
    setSelectedMonth(getDefaultMonth())
  }, [monthStatistics])

  return (
    <View
      style={{marginTop: 15, marginBottom: 30}}
    >
      <FlatList
        data={monthStatistics.months}
        horizontal={true}
        keyExtractor={month => month.string}
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
            >{month.string}</SText>
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
        {!!selectedMonth && selectedMonth.expenses.map(expense => (
          <Expense expense={expense} key={expense.id.toString()} />
        ))}
      </View>
      {!!selectedMonth && selectedMonth.expenses.length == 0 && (
        <View style={{justifyContent: 'center', alignItems: 'center', height: 100}}>
          <SText>No expenses this month</SText>
        </View>
      )}
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