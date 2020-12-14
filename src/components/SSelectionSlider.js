import React from 'react'
import {ScrollView, TouchableOpacity} from 'react-native'
import SText from './SText'

export default ({
  items,
  selected,
  setSelected, 
  selectColor, 
  fontSize, 
  boxStyle, 
  keyExtractor,
  textExtractor
}) =>  (
    <ScrollView horizontal={true}>
      {items.map(item => (
        <TouchableOpacity
          key={keyExtractor(item)}
          style={{
            backgroundColor: item == selected ? selectColor || '#f80' : '#777',
            marginHorizontal: 4,
            padding: 8,
            borderRadius: 10,
            marginBottom: 15,
            marginTop: 5,
            alignSelf: 'center',
            ...boxStyle
          }}
          onPress={() => setSelected(item)}
        >
          <SText fontSize={fontSize || 20}>{textExtractor(item)}</SText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )