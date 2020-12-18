import React, { useContext } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SText from '../components/SText'
import dataContext from '../dataContext'

export default function Categories() {
  const {categories} = useContext(dataContext)
  const navigation = useNavigation()

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{paddingVertical: 10}}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate('Addcategory')}
        style={{alignItems: 'center', marginRight: 10}}
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
          style={{alignItems: 'center', marginRight: 10}}
          key={category.id.toString()}
        >
          <View 
            style={{
              width: 50, 
              height: 50, 
              borderRadius: 25,
              borderColor: category.color,
              borderWidth: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SText fontSize={30}>{category.emoji}</SText>
          </View>
          <SText fontSize={10}>{category.name}</SText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}