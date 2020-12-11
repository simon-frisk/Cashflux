import React, { useContext, useState } from 'react'
import SText from './components/SText'
import STextField from './components/STextField'
import SButton from './components/SButton'
import SModal from './components/SModal'
import { View } from 'react-native'
import SColorPicker from './components/SColorPicker'
import dataContext from './dataContext'
import SEmojiPicker from './components/SEmojiPicker'
import CategoryForm from './components/CategoryForm'

export default function Categories() {
  const [show, setShow] = useState(false)
  const {categories} = useContext(dataContext)

  return (
    <View>
       <View style={{flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10}}>
        {categories.map(category => (
          <View style={{flexDirection: 'row', paddingVertical: 3, width: '33%'}} key={category.id}>
            <View style={{backgroundColor: category.color, width: 20, height: 20, borderRadius: '50%', marginRight: 4}} />
            <SText>{category.name}</SText>
          </View>
        ))}
      </View>
      <SButton style={{backgroundColor: 'grey'}} text='Categories' action={() => setShow(true)} />
      <SModal show={show} title='Categories' close={() => setShow(false)}>
        <AddCategory />
        {categories.map(category => <CategoryMenu key={category.id} category={category} /> )}
      </SModal>
    </View>
  )
}

function CategoryMenu({category}) {
  const [name, setName] = useState(category.name)
  const [emoji, setEmoji] = useState(category.emoji)
  const [color, setColor] = useState(category.color)

  const {updateCategory, deleteCategory} = useContext(dataContext)

  function deleteCat() {
    deleteCategory(category.id)
  }

  return (
    <View style={{marginVertical: 10}}>
      <SText fontSize={25}>{name}</SText>
      <CategoryForm
        name={name} setName={setName}
        emoji={setEmoji} setEmoji={setEmoji}
        color={color} setColor={setColor}
        submit={() => updateCategory({...category, name, emoji, color})}
        submitText={'Update'}
      />
      <SButton style={{backgroundColor: 'red'}} text='Delete' action={deleteCat} />
    </View>
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
        shouldReset={true}
      />
    </>
  )
}