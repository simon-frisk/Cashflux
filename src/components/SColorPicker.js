import React, { useEffect } from 'react'
import {ScrollView, TouchableOpacity} from 'react-native'

const colors = [
  '#F44336',
  '#F48FB1',
  '#9C27B0',
  '#303F9F',
  '#03A9F4',
  '#009688',
  '#4CAF50',
  '#FFEB3B',
  '#FF9800',
  '#795548',
  '#9E9E9E',
  '#607D8B',
  '#222'
]

export default function SColorPicker({color: current, setColor}) {

  useEffect(() => {
    if(!current) setColor(colors[0])
  }, [])

  return (
    <ScrollView horizontal={true} contentContainerStyle={{alignItems: 'center'}} showsHorizontalScrollIndicator={false}>
      {colors.map(color => {
        const width = current == color ? 45 : 30
        return (
          <TouchableOpacity 
            style={{
              width: width, 
              height: width,
              borderRadius: 10,
              marginRight: 5,
              marginVertical: 5,
              backgroundColor: color,
              borderWidth: 2,
              borderColor: 'black',
              overflow: 'hidden',
            }}
            onPress={() => setColor(color)}
            key={color}
          />
        )
      })}
    </ScrollView>
  )
}