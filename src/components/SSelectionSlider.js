import React from 'react'
import {FlatList, TouchableOpacity} from 'react-native'
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
}) => {

  return (
    <FlatList
      data={items}
      horizontal={true}
      keyExtractor={(item) => keyExtractor(item)}
      renderItem={({item}) => (
        <TouchableOpacity
          style={{
            backgroundColor: item == selected ? selectColor || '#f80' : '#777',
            marginHorizontal: 4,
            padding: 8,
            borderRadius: 10,
            marginVertical: 5,
            ...boxStyle
          }}
          onPress={() => setSelected(item)}
        >
          <SText fontSize={fontSize || 20}>{textExtractor(item)}</SText>
        </TouchableOpacity>
      )}
    />
  )
}