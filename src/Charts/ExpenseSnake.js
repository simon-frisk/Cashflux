import React, { useContext } from 'react'
import { ScrollView, View } from 'react-native'
import dataContext from '../dataContext'
import SText from '../components/SText'
import { getCostString } from '../util/currency'
import useStyle from '../util/useStyle'

export default function ExpenseSnake({width}) {
  const {monthStatistics, currency} = useContext(dataContext)
  const style = useStyle()

  return (
    <ScrollView
      style={{width, height: 405}}
      contentContainerStyle={{paddingTop: 40}}
    >
      {monthStatistics.months.map(month => {
        return (
          <View key={month.string}>
            <SText fontSize={25}>{month.string}</SText>
              {month.expenses.map(expense => (
                <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                  <View
                    style={{
                      backgroundColor: expense.category.color,
                      width: 30,
                      height: expense.cost / 17,
                      borderRadius: 5,
                      marginRight: 10,
                      marginVertical: 2
                    }}
                  />
                  <SText fontSize={15} color={style.lightText}>
                    {getCostString(expense.cost, currency)} - {expense.text}
                  </SText>
                </View>
              ))}
          </View>
        )
      })}
    </ScrollView>
  )
}