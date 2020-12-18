import React, { useContext, useState } from 'react'
import { View, Alert } from 'react-native'
import SPageContainer from './components/SPageContainer'
import SText from './components/SText'
import SButton from './components/SButton'
import useStyle from './util/useStyle'
import dataContext from './dataContext'
import CategoryForm from './components/CategoryForm'

export default function Category({route, navigation}) {
  const {category} = route.params
  const style = useStyle()

  const [name, setName] = useState(category.name)
  const [emoji, setEmoji] = useState(category.emoji)
  const [color, setColor] = useState(category.color)

  const {updateCategory, deleteCategory, expenses} = useContext(dataContext)

  function handleUpdate() {
    updateCategory({...category, name, emoji, color})
  }

  function handleDelete() {
    let expensesLeft = false
    for (const expense of expenses) {
      if(expense.category.id === category.id) {
        expensesLeft = true
      }
    }
    if(expensesLeft)
      Alert.alert('Expenses left', 'There are still expenses left in this category. Before deleting it, all those expenses have to be deleted.')
    else {
      deleteCategory(category.id)
      navigation.goBack()
    }
  }

  return (
    <SPageContainer>
      <SText fontSize={30}>{name}</SText>
      <View style={{marginVertical: 10}}>
        <CategoryForm
          name={name} setName={setName}
          emoji={emoji} setEmoji={setEmoji}
          color={color} setColor={setColor}
          submit={handleUpdate}
          submitText='Update'
        />
      </View>
      <SButton
        style={{backgroundColor: style.errorColor, width: '30%', alignSelf: 'flex-end'}} 
        text='Delete' 
        action={handleDelete}
      />
    </SPageContainer>
  )
}