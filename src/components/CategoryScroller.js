import React, { useContext } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SText from '../components/SText'
import dataContext from '../dataContext'
import CategoryIcon from './CategoryIcon'

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
      <TouchableOpacity
        onPress={() => navigation.navigate('Addcategory')}
        style={{alignItems: 'center', marginHorizontal: 10}}
      >
        <View 
          style={{
            width: 50, 
            height: 50, 
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SText fontSize={40}>+</SText>
        </View>
        <SText fontSize={10}>Add category</SText>
      </TouchableOpacity>
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