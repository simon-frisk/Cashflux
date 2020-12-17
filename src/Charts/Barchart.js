import React, { useContext, useEffect, useState } from 'react'
import { Animated, ScrollView, View } from 'react-native'
import SText from '../components/SText'
import dataContext from '../dataContext'
import { getMonthlyCategories } from '../util/DateTools'
import InView from 'react-native-component-inview'

export default function BarChart() {
  const {expenses, categories, currency} = useContext(dataContext)

  const monthlyCategories = getMonthlyCategories(expenses)
  const highestMonth = Math.max(...monthlyCategories.map(category => category.total))

  if(!highestMonth) 
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
        <SText>Add expenses to see barchart</SText>
      </View>
    )
  
  return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        {monthlyCategories.map(month => {
          return (
            <View style={{marginHorizontal: 6, justifyContent: 'flex-end'}} key={month.string}>
              <SText fontSize={15}>{month.total}{currency}</SText>
              {categories.map(category => {
                  const current = month[category.id] || 0
                  const height = current / highestMonth * 220
                  if(height < 5) return
                  else return <BarBlock height={height} category={category} key={category.name.toString() + month.string} />
              })}
              <SText fontSize={25}>{month.string}</SText>
            </View>
          )
        })}
      </ScrollView>
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
          width: 50,
          backgroundColor: category.color, 
          marginVertical: 2, 
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {height > 25 && <SText>{category.emoji}</SText>}
      </Animated.View>
    </InView>
  )
}