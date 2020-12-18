import React from 'react'
import {ScrollView, TouchableOpacity} from 'react-native'
import useStyle from '../util/useStyle'
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
}) =>  {
  const style = useStyle()

  return (
    <ScrollView horizontal={true}>
      {items.map(item => (
        <TouchableOpacity
          key={keyExtractor(item)}
          style={{
            backgroundColor: item == selected ? selectColor || style.secondaryColor : style.interfaceColor,
            marginHorizontal: 4,
            padding: 8,
            borderRadius: 10,
            marginBottom: 10,
            marginTop: 5,
            alignSelf: 'center',
            ...boxStyle
          }}
          onPress={() => setSelected(item)}
        >
          <SText fontSize={fontSize || 20} color='white'>{textExtractor(item)}</SText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}