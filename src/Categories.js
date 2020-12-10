import React, { useContext, useEffect, useState } from 'react'
import SText from './components/SText'
import STextField from './components/STextField'
import SButton from './components/SButton'
import SModal from './components/SModal'
import { View } from 'react-native'
import SColorPicker from './components/SColorPicker'
import dataContext from './dataContext'

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

  function update() {
    updateCategory({
      ...category,
      name,
      emoji,
      color
    })
  }

  function deleteCat() {
    deleteCategory(category.id)
  }

  return (
    <View style={{marginVertical: 10}}>
      <SText fontSize={25}>{name}</SText>
      <SColorPicker color={color} setColor={setColor} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <STextField style={{width: '49%'}} placeholder='Name' value={name} onChangeText={setName} />
        <EmojiPicker style={{width: '49%'}} emoji={emoji} setEmoji={setEmoji} />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <SButton style={{width: '49%'}} text='Save' action={update} />
        <SButton style={{backgroundColor: 'red', width: '49%'}} text='Delete' action={deleteCat} />
      </View>
    </View>
  )
}

function AddCategory() {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('')
  const [color, setColor] = useState('')

  const {addCategory} = useContext(dataContext)

  function submit() {
    addCategory({
      name,
      emoji,
      color
    })
    setName('')
    setEmoji('')
  }

  return (
    <>
      <SText fontSize={25}>Add category</SText>
      <SColorPicker color={color} setColor={setColor} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <STextField placeholder='Name' value={name} onChangeText={setName} style={{width: '49%'}} />
        <EmojiPicker emoji={emoji} setEmoji={setEmoji} style={{width: '49%'}} />
      </View>
      <SButton text='Add category' action={submit} />
    </>
  )
}

function EmojiPicker({emoji, setEmoji, ...props}) {
  return <STextField maxLength={2} placeholder='Emoji' value={emoji} onChangeText={setEmoji} {...props} />
}