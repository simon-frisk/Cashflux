import React, { useContext } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import dataContext from '../dataContext'
import CategoryIcon from './CategoryIcon'
import SNewCategoryButton from './SNewCategoryButton'

export default function Categories() {
  const {categories} = useContext(dataContext)
  const navigation = useNavigation()

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{
        paddingVertical: 10,
      }}
    >
      <SNewCategoryButton />
      {categories.map(category => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Category', {category})}
          style={{marginRight: 10}}
          key={category.id.toString()}
        >
          <CategoryIcon emoji={category.emoji} color={category.color} size={50} text={category.name} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}