import React, { useState } from 'react'
import SText from './components/SText'
import STextField from './components/STextField'
import SButton from './components/SButton'
import SModal from './components/SModal'
import { View } from 'react-native'

export default function Categories({categories, addCategory, updateCategory}) {
  const [show, setShow] = useState(false)

  return (
    <View>
       <View style={{flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10}}>
        {categories.map(category => (
          <View style={{flexDirection: 'row', paddingVertical: 3, width: '33%'}}>
            <View style={{backgroundColor: category.color, width: 20, height: 20, borderRadius: '50%', marginRight: 4}} />
            <SText>{category.name}</SText>
          </View>
        ))}
      </View>
      <SButton style={{backgroundColor: 'grey'}} text='Categories' action={() => setShow(true)} />
      <SModal show={show}>
        <SText fontSize={30} color='#47f'>Categories</SText>
        <SButton style={{backgroundColor: 'grey'}} text='Cancel' action={() => setShow(false)} />
        {categories.map(category => <CategoryMenu category={category} updateCategory={updateCategory} /> )}
        <AddCategory addCategory={addCategory} />
      </SModal>
    </View>
  )
}

function CategoryMenu({category, updateCategory}) {
  const [name, setName] = useState(category.name)
  const [emoji, setEmoji] = useState(category.emoji)

  function update() {
    updateCategory({
      ...category,
      name,
      emoji,
      color: ['blue', 'green', 'pink', 'aqua', 'orange'][Math.floor(Math.random() * 5)],
    })
  }

  return (
    <View style={{marginVertical: 10}}>
      <SText fontSize={25}>{name}</SText>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <STextField style={{width: '40%'}} placeholder='Name' value={name} onChangeText={setName} />
        <EmojiPicker style={{width: '40%'}} emoji={emoji} setEmoji={setEmoji} />
      </View>
      <SButton text='Save' action={update} />
    </View>
  )
}

function AddCategory({addCategory}) {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('')

  function submit() {
    addCategory({
      name,
      emoji,
      color: ['orange', 'blue', 'green', 'pink', 'aqua'][Math.floor(Math.random() * 5)],
    })
  }

  return (
    <>
      <STextField placeholder='Name' value={name} onChangeText={setName} />
      <EmojiPicker emoji={emoji} setEmoji={setEmoji} />
      <SButton text='Add category' action={submit} />
    </>
  )
}

function EmojiPicker({emoji, setEmoji, ...props}) {
  return <STextField maxLength={1} placeholder='Emoji' value={emoji} onChangeText={setEmoji} {...props} />
}