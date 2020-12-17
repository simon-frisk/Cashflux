import React, { useContext, useState } from 'react'
import SText from './components/SText'
import SButton from './components/SButton'
import SModal from './components/SModal'
import { View, Alert } from 'react-native'
import dataContext from './dataContext'
import CategoryForm from './components/CategoryForm'
import useStyle from './util/useStyle'

export default function Categories() {
  const [show, setShow] = useState(false)
  const {categories} = useContext(dataContext)
  const style = useStyle()

  return (
    <View>
       <View
        style={{ backgroundColor: style.foregroundColor, padding: 12, borderRadius: 15, marginVertical: 5 }}
      >
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {categories.map(category => (
            <View style={{flexDirection: 'row', paddingVertical: 3, width: '50%' }} key={category.id.toString()}>
              <View style={{backgroundColor: category.color, width: 20, height: 20, borderRadius: 10, marginRight: 4}} />
              <SText style={{flexShrink: 1}}>{category.name}</SText>
            </View>
          ))}
        </View>
        <SButton text='Categories' action={() => setShow(true)} style={{backgroundColor: '#777'}} />
      </View>
      <SModal show={show} title='Categories' close={() => setShow(false)}>
        <AddCategory />
        {categories.map(category => <CategoryMenu key={category.id.toString()} category={category} /> )}
      </SModal>
    </View>
  )
}

function CategoryMenu({category}) {
  const [name, setName] = useState(category.name)
  const [emoji, setEmoji] = useState(category.emoji)
  const [color, setColor] = useState(category.color)

  const {updateCategory} = useContext(dataContext)

  return (
    <View style={{marginVertical: 10}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <SText fontSize={30}>{name}</SText>
        <DeleteCategory category={category} />
      </View>
      <CategoryForm
        name={name} setName={setName}
        emoji={emoji} setEmoji={setEmoji}
        color={color} setColor={setColor}
        submit={() => updateCategory({...category, name, emoji, color})}
        effect={true}
      />
    </View>
  )
}

function DeleteCategory({category}) {
  const {deleteCategory, expenses} = useContext(dataContext)
  const style = useStyle()

  function handle() {
    let expensesLeft = false
    for (const expense of expenses) {
      if(expense.category.id === category.id) {
        expensesLeft = true
      }
    }

    if(expensesLeft)
      Alert.alert('Expenses left', 'There are still expenses left in this category. Before deleting it, all those expenses have to be deleted.')
    else deleteCategory(category.id)
  }

  return (
    <SButton style={{backgroundColor: style.errorColor, width: '30%'}} text='Delete' action={handle} />
  )
}

function AddCategory() {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('')
  const [color, setColor] = useState('')

  const {addCategory} = useContext(dataContext)

  return (
    <>
      <SText fontSize={25}>Add category</SText>
      <CategoryForm
        name={name} setName={setName}
        emoji={emoji} setEmoji={setEmoji}
        color={color} setColor={setColor}
        submit={() => addCategory({name, emoji, color})}
        submitText='Add category'
      />
    </>
  )
}