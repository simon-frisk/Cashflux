import React, { useContext, useState } from 'react'
import CategoryForm from './components/CategoryForm'
import SPageContainer from './components/SPageContainer'
import dataContext from './dataContext'

export default function AddCategory({navigation, route}) {
  const category = route.params.category
  const [name, setName] = useState(category.name)
  const [emoji, setEmoji] = useState(category.emoji)
  const [color, setColor] = useState(category.color)

  const {updateCategory} = useContext(dataContext)

  function handleUpdate() {
    updateCategory({...category, name, emoji, color})
  }

  return (
    <SPageContainer>
      <CategoryForm
        name={name} setName={setName}
        emoji={emoji} setEmoji={setEmoji}
        color={color} setColor={setColor}
        submit={() => {
          handleUpdate()
          navigation.goBack()
        }}
        submitText='Update'
      />
    </SPageContainer>
  )
}