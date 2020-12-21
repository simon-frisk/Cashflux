import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, View } from 'react-native'
import SText from '../components/SText'

export default function SNewCategoryButton() {
  const navigation = useNavigation()

  return (
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
  )
}