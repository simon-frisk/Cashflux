import React, { useEffect } from 'react'
import {ScrollView, TouchableOpacity} from 'react-native'
import useStyle from '../util/useStyle'

const colors = [
  '#f57f17',
  '#64dd17',
  '#00e5ff',
  '#64b5f6',
  '#ff4081',
  '#78909c',
  '#e53935',
  '#4a148c',
  '#f48fb1',
  '#3949ab'
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