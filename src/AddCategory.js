import React, { useContext, useState } from 'react'
import CategoryForm from './components/CategoryForm'
import SPageContainer from './components/SPageContainer'
import dataContext from './dataContext'

export default function AddCategory({navigation}) {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('')
  const [color, setColor] = useState('')

  const {addCategory} = useContext(dataContext)

  return (
    <SPageContainer>
      <CategoryForm
        name={name} setName={setName}
        emoji={emoji} setEmoji={setEmoji}
        color={color} setColor={setColor}
        submit={() => {
          addCategory({name, emoji, color})
          navigation.goBack()
        }}
        submitText='Add category'
      />
    </SPageContainer>
  )
}