import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import SText from './components/SText'
import STextField from './components/STextField';
import SButton from './components/SButton';

export default ({categories, addCategory}) => {
  return (
    <>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', marginVertical: 5}}>
        {categories.map(category => (
          <View style={{flexDirection: 'row', paddingVertical: 3, width: '33%'}}>
            <View style={{backgroundColor: category.color, width: 20, height: 20, borderRadius: '50%', marginRight: 4}} />
            <SText>{category.name}</SText>
          </View>
        ))}
      </View>
      <AddCategory addCategory={addCategory} />
    </>
  )
}

function AddCategory({addCategory}) {
  const [isToggled, toggle] = useState(false)
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('')

  function submit() {
    addCategory({
      name,
      emoji,
      color: 'orange',
      emoji,
    })
  }

  return (
    <>
      <TouchableOpacity onPress={() => toggle(true)} style={{width: '100%'}}>
        <Ionicons name="ios-add" size={35} color="#eee" />
      </TouchableOpacity>
      {isToggled && (
        <>
          <STextField placeholder='Name' value={name} onChangeText={setName} />
          <STextField maxLength={1} placeholder='Emoji' value={emoji} onChangeText={setEmoji} />
          <SButton text='Add category' action={submit} />
        </>
      )}
    </>
  )
}