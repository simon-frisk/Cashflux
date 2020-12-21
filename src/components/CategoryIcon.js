import React from 'react'
import { View } from 'react-native'
import SText from './SText'

export default function CategoryIcon({emoji, color, size, text}) {
  return (
    <View style={{alignItems: 'center'}}>
      <View
        style={{
          backgroundColor: color, 
          width: size, 
          height: size, 
          borderRadius: size / 2,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <SText fontSize={size / 2}>{emoji}</SText>
      </View>
      {text && <SText fontSize={size / 5}>{text}</SText>}
    </View>
  )
}