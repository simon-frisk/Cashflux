import React, { useContext, useEffect, useState } from 'react'
import { Animated, ScrollView, View } from 'react-native'
import SText from '../components/SText'
import dataContext from '../dataContext'
import { getCostString } from '../util/currency'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function BarChart({width, active}) {
  const {categories, currency, monthStatistics} = useContext(dataContext)
  const [selectedMonth, setSelectedMonth] = useState(null)
  const highestMonthCost = Math.max(...monthStatistics.months.map(month => month.total))
  
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      style={{width}}
      contentContainerStyle={{paddingBottom: 20}}
    >
      {monthStatistics.months.map((month, index) => (
        <MonthBar
          currency={currency}
          selected={index == selectedMonth}
          toggleSelected={() => setSelectedMonth(index == selectedMonth ? null : index)}
          month={month}
          categories={categories}
          highestMonthCost={highestMonthCost}
          active={active}
          isTransparent={selectedMonth !== null && selectedMonth !== index}
          key={month.string}
        />
      ))}
    </ScrollView>
  )
}

function MonthBar({currency, month, categories, highestMonthCost, active, selected, toggleSelected, isTransparent}) {
  const [zoomAnimation] = useState(new Animated.Value(1))
  const [opacityAnimation] = useState(new Animated.Value(1))

  useEffect(() => {
    Animated.timing(zoomAnimation, {
      toValue: selected ? 1.07 : 1,
      duration: 1000,
      useNativeDriver: true
    }).start()
  }, [selected])

  useEffect(() => {
    Animated.timing(opacityAnimation, {
      toValue: isTransparent ? 0.4 : 1,
      duration: 1000,
      useNativeDriver: true
    }).start()
  }, [isTransparent])

  return (
    <Animated.View
      style={{
        height: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginHorizontal: 7,
        marginBottom: 15,
        opacity: opacityAnimation,
        transform: [
          {
            scale: zoomAnimation
          }
        ]
      }}
    >
      <TouchableOpacity onPress={() => toggleSelected()}>
        <SText fontSize={15}>{getCostString(month.total, currency)}</SText>
        {categories.map(category => {
            return (
              <BarBlock 
                isSelected={selected} 
                month={month} 
                highestMonthCost={highestMonthCost} 
                category={category} 
                key={category.name.toString() + month.string} 
                active={active}
              />
            )
        })}
        <SText fontSize={25}>{month.string.split(' ')[0]}</SText>
      </TouchableOpacity>
    </Animated.View>
  )
}

function BarBlock({isSelected, month, highestMonthCost, category, active}) {
  const [heightAnimation] = useState(new Animated.Value(0))
  const [height, setHeight] = useState(getHeight())

  useEffect(() => {
    setHeight(getHeight())
  }, [isSelected, month, highestMonthCost, category])

  useEffect(() => {
    Animated.timing(heightAnimation, {
      toValue: active ? height : height * 0.5,
      duration: 1000,
      useNativeDriver: false
    }).start()
  }, [active, height])

  function getHeight() {
    const current = month.categories[category.id]
    if(month.total == 0) return 0
    const height = isSelected
      ? current.cost / month.total * 280
      : current.cost / highestMonthCost * 280
    return height
  }

  if(height < 5) return <View />
    
  return (
    <Animated.View
      style={{
        height: heightAnimation,
        width: 55,
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