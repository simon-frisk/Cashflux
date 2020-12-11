import React, { useEffect } from 'react'
import {ScrollView, TouchableOpacity} from 'react-native'

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
    <ScrollView horizontal={true}>
      {colors.map(color => 
        <TouchableOpacity 
          style={{
            width: 40, 
            height: 40,
            borderRadius: '12%',
            marginRight: 6, 
            marginVertical: 3, 
            backgroundColor: color,
            overflow: 'hidden',
            borderWidth: 4,
            borderColor: current == color ? '#ffee00' : 'grey',
          }}
          onPress={() => setColor(color)}
          key={color}
        />
      )}
    </ScrollView>
  )
}