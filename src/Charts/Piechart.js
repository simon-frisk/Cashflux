import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import SText from '../components/SText'
import { PieChart } from 'react-native-svg-charts'
import dataContext from '../dataContext'
import SSelectionSlider from '../components/SSelectionSlider'
import { Text } from 'react-native-svg'
import { getCostString } from '../util/currency'

export default function ExpensePie({width}) {
  const {categories, currency, monthStatistics} = useContext(dataContext)
  const [monthIndex, setMonthIndex] = useState(0)
  
  const pieData = categories
      .map(category => ({
          value: monthStatistics.months[monthIndex].categories[category.id].cost,
          emoji: category.emoji,
          svg: {
              fill: category.color,
          },
          key: category.id,
          arc: { cornerRadius: 10,  }
      }))
  
  return (
    <View style={{width, paddingTop: 70}}>
      <View>
        <PieChart style={{ height: 250 }} innerRadius='68%' padAngle={ .04 } data={pieData}>
          <Labels />
        </PieChart>
        <View style={{position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <SText fontSize={30}>{getCostString(monthStatistics.months[monthIndex].total, currency)}</SText>
        </View>
      </View>
      <SSelectionSlider
        items={monthStatistics.months}
        selected={monthStatistics.months[monthIndex]}
        setSelected={month => setMonthIndex(monthStatistics.months.indexOf(month))}
        keyExtractor={month => month.string}
        textExtractor={month => month.string}
        boxStyle={{marginTop: 40}}
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
        fontSize={25}
      >
        {slice.data.emoji}
      </Text>
    )
  })
}