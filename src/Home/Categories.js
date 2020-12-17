import React, { useContext, useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SText from '../components/SText'
import dataContext from '../dataContext'
import CategoryForm from '../components/CategoryForm'

export default function Categories() {
  const {categories} = useContext(dataContext)
  const navigation = useNavigation()

  return (
    <View>
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
                width: 70, 
                height: 70, 
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SText fontSize={40}>+</SText>
            </View>
            <SText fontSize={13}>Add category</SText>
          </TouchableOpacity>
          {categories.map(category => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Category', {category})}
              style={{alignItems: 'center', marginRight: 10}}
              key={category.id.toString()}
            >
              <View 
                style={{
                  width: 70, 
                  height: 70, 
                  borderRadius: 35,
                  borderColor: category.color, 
                  borderWidth: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SText fontSize={35}>{category.emoji}</SText>
              </View>
              <SText fontSize={13}>{category.name}</SText>
            </TouchableOpacity>
          ))}
        </ScrollView>
    </View>
  )
}