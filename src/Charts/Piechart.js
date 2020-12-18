import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import SText from '../components/SText'
import { PieChart } from 'react-native-svg-charts'
import dataContext from '../dataContext'
import { getMonthlyCategories } from '../util/DateTools'
import SSelectionSlider from '../components/SSelectionSlider'
import { Text } from 'react-native-svg'
import useStyle from '../util/useStyle'
import { currencies, getCostString } from '../util/currency'

export default function ExpensePie({width}) {
  const style = useStyle()

  const {expenses, categories, currency} = useContext(dataContext)
  const [monthIndex, setMonthIndex] = useState(0)
  const monthlyCategories = getMonthlyCategories(expenses)
  
  const pieData = categories
      .map(category => ({
          value: monthlyCategories[monthIndex][category.id] || 0,
          emoji: category.emoji,
          svg: {
              fill: category.color,
          },
          key: category.id,
          arc: { cornerRadius: 10,  }
      }))
  
  return (
    <View style={{width, paddingTop: 30}}>
      <View>
        <PieChart style={{ height: 230 }} innerRadius='68%' padAngle={ .05 } data={pieData}>
          <Labels />
        </PieChart>
        <View style={{position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <SText fontSize={30}>{getCostString(monthlyCategories[monthIndex].total, currency)}</SText>
        </View>
      </View>
      <SSelectionSlider
        items={monthlyCategories}
        selected={monthlyCategories[monthIndex]}
        setSelected={month => setMonthIndex(monthlyCategories.indexOf(month))}
        keyExtractor={month => month.string}
        textExtractor={month => month.string}
        selectColor={style.primaryColor}
        boxStyle={{marginTop: 20}}
      />
    </View>
  )
}

function Labels({slices}) {
  return slices.map((slice, index) => {
    if(slice.endAngle - slice.startAngle < 0.3) return <View key={index} />
    return (
      <Text
        key={index}
        x={slice.pieCentroid[0]}
        y={slice.pieCentroid[1]}
        textAnchor={'middle'}
        alignmentBaseline={'middle'}
        fontSize={27}
      >
        {slice.data.emoji}
      </Text>
    )
  })
}