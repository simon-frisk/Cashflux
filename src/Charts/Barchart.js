import React, { useContext, useEffect, useState } from 'react'
import { Animated, ScrollView, View } from 'react-native'
import SText from '../components/SText'
import dataContext from '../dataContext'
import { getMonthlyCategories } from '../util/DateTools'
import InView from 'react-native-component-inview'
import { currencies, getCostString } from '../util/currency'

export default function BarChart({width}) {
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
            key={month.string}
          />
        ))}
      </ScrollView>
  )
}

function MonthBar({currency, month, categories, highestMonthCost}) {
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
          const height = current / highestMonthCost * 220
            if(height < 5) return
            else return (
              <BarBlock height={height} category={category} key={category.name.toString() + month.string} />
            )
        })}
        <SText fontSize={25}>{month.string}</SText>
      </View>
    </View>
  )
}

function BarBlock({height, category}) {
  const [heightAnimation] = useState(new Animated.Value(0))
  const [inView, setInView] = useState(false)

  useEffect(() => {
    Animated.timing(heightAnimation, {
      toValue: inView ? height : height * 0.5,
      duration: 1000,
      useNativeDriver: false
    }).start()
  }, [inView])

  return (
    <InView onChange={setInView}>
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
    </InView>
  )
}