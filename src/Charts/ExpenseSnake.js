import React, { useContext } from 'react'
import { ScrollView, View } from 'react-native'
import dataContext from '../dataContext'
import SText from '../components/SText'
import { getCostString } from '../util/currency'
import { getMonthString } from '../util/DateTools'
import useStyle from '../util/useStyle'

export default function ExpenseSnake({width}) {
  const {expenses, currency} = useContext(dataContext)
  const style = useStyle()

  let lastMonth

  return (
    <ScrollView
      style={{width, height: 360}}
      contentContainerStyle={{paddingTop: 40}}
    >
      {expenses.map(expense => {
        const isNewMonth = lastMonth != getMonthString(expense.date)
        lastMonth = getMonthString(expense.date)

        return (
          <View key={expense.id.toString()}>
            <View>
              {isNewMonth && (
                <SText fontSize={25}>{lastMonth}</SText>
              )}
            </View>
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
                  height: expense.cost / 15,
                  borderRadius: 5,
                  marginRight: 10,
                  marginVertical: 2
                }}
                />
              <SText fontSize={15} color={style.lightText}>
                {getCostString(expense.cost, currency)} - {expense.text}
              </SText>
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}