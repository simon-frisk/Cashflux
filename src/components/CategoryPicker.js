import React from 'react'
import {FlatList, TouchableOpacity} from 'react-native'

export default function CategoryPicker({categories, category, setCategory}) {
  return (
    <FlatList data={categories}  horizontal={true} keyExtractor={(item) => item.id.toString()} renderItem={({item}) => (
      <TouchableOpacity style={{backgroundColor: item.id == category ? '#f80' : '#777', marginHorizontal: 3, padding: 7, borderRadius: 5, marginVertical: 5}} onPress={() => setCategory(item.id)}>
        <SText>{item.name}</SText>
      </TouchableOpacity>
    )} />
  )
}