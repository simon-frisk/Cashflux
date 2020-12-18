import React, { useContext, useState } from 'react'
import * as Analytics from 'expo-firebase-analytics'
import CategoryForm from './components/CategoryForm'
import SPageContainer from './components/SPageContainer'
import SText from './components/SText'
import dataContext from './dataContext'

export default function AddCategory({navigation}) {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('')
  const [color, setColor] = useState('')

  const {addCategory} = useContext(dataContext)

  return (
    <SPageContainer>
      <SText fontSize={30}>Add category</SText>
      <CategoryForm
        name={name} setName={setName}
        emoji={emoji} setEmoji={setEmoji}
        color={color} setColor={setColor}
        submit={() => {
          addCategory({name, emoji, color})
          navigation.goBack()
          Analytics.logEvent('AddCategory')
        }}
        submitText='Add category'
      />
    </SPageContainer>
  )
}