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
  const style = useStyle()

  useEffect(() => {
    if(!current) setColor(colors[0])
  }, [])

  return (
    <ScrollView horizontal={true}>
      {colors.map(color => 
        <TouchableOpacity 
          style={{
            width: 35, 
            height: 35,
            borderRadius: 12,
            marginRight: 5,
            marginVertical: 5,
            backgroundColor: color,
            overflow: 'hidden',
            borderWidth: 4,
            borderColor: current == color 
              ? style.themeMode == 'Dark' ? '#ffee00' : '#003'
              : style.themeMode == 'Dark' ? '#555' : '#aaa',
          }}
          onPress={() => setColor(color)}
          key={color}
        />
      )}
    </ScrollView>
  )
}