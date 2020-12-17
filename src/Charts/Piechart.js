import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import SText from '../components/SText'
import { PieChart } from 'react-native-svg-charts'
import dataContext from '../dataContext'
import { getMonthlyCategories } from '../util/DateTools'
import SSelectionSlider from '../components/SSelectionSlider'

export default function ExpensePie() {
  const {expenses, categories, currency} = useContext(dataContext)
  const [monthIndex, setMonthIndex] = useState(0)
  const monthlyCategories = getMonthlyCategories(expenses)

  if(monthlyCategories.length == 1 && monthlyCategories[0].total == 0)
      return (
          <View style={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
              <SText>Add expenses to see piechart</SText>
          </View>
      )
  
  const pieData = categories
      .map(category => ({
          value: monthlyCategories[monthIndex][category.id] || 0,
          svg: {
              fill: category.color,
          },
          key: category.id,
          arc: { cornerRadius: 10,  }
      }))
  
  return (
      <View>
          <View>
              <PieChart style={{ height: 220, marginVertical: 15 }} innerRadius='70%' padAngle={.04} data={pieData} />
              <View style={{position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <SText fontSize={30}>{monthlyCategories[monthIndex].total}{currency}</SText>
              </View>
          </View>
          <SSelectionSlider
              items={monthlyCategories}
              selected={monthlyCategories[monthIndex]}
              setSelected={month => setMonthIndex(monthlyCategories.indexOf(month))}
              keyExtractor={month => month.string}
              textExtractor={month => month.string}
              selectColor='#47f'
          />
      </View>
  )
}