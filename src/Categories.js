import React from 'react'
import { View } from 'react-native'
import SText from './components/SText'

export default ({categories}) => {
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginVertical: 5}}>
      {categories.map(category => (
        <View style={{flexDirection: 'row', paddingVertical: 3, width: '33%'}}>
          <View style={{backgroundColor: category.color, width: 20, height: 20, borderRadius: '50%', marginRight: 4}} />
          <SText>{category.name}</SText>
        </View>
      ))}
    </View>
  )
}