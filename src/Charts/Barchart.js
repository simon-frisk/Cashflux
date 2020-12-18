import React, { useContext, useEffect, useState } from 'react'
import { Animated, Platform, ScrollView, View } from 'react-native'
import SText from '../components/SText'
import dataContext from '../dataContext'
import { getMonthlyCategories } from '../util/DateTools'
import { getCostString } from '../util/currency'

export default function BarChart({width, active}) {
  const {expenses, categories, currency} = useContext(dataContext)

  const monthlyCategories = getMonthlyCategories(expenses)
  const highestMonthCost = Math.max(...monthlyCategories.map(category => category.total))
  
  return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={{width}}
      >
        {monthlyCategories.map(month => (
          <MonthBar
            currency={currency}
            month={month}
            categories={categories}
            highestMonthCost={highestMonthCost}
            active={active}
            key={month.string}
          />
        ))}
      </ScrollView>
  )
}

function MonthBar({currency, month, categories, highestMonthCost, active}) {
  return (
    <View
      style={{
        height: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginHorizontal: 5,
      }}
    >
      <View>
        <SText fontSize={15}>{getCostString(month.total, currency)}</SText>
        {categories.map(category => {
          const current = month[category.id] || 0
          const height = current / highestMonthCost * 250
            if(height < 5) return
            else return (
              <BarBlock height={height} category={category} key={category.name.toString() + month.string} active={active} />
            )
        })}
        <SText fontSize={25}>{month.string}</SText>
      </View>
    </View>
  )
}

function BarBlock({height, category, active}) {
  const [heightAnimation] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(heightAnimation, {
      toValue: active ? height : height * 0.5,
      duration: 1000,
      useNativeDriver: false
    }).start()
  }, [active])

  return (
    <Animated.View
      style={{
        height: heightAnimation,
        width: 60,
        backgroundColor: category.color, 
        marginVertical: 2, 
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {height > 22 && <SText fontSize={15}>{category.emoji}</SText>}
    </Animated.View>
  )
}