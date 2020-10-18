import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import SText from './components/SText'
import STextField from './components/STextField'
import SButton from './components/SButton'

export default ({categories, addCategory, updateCategory}) => {
  return (
    <>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10}}>
        {categories.map(category => (
          <View style={{flexDirection: 'row', paddingVertical: 3, width: '33%'}}>
            <View style={{backgroundColor: category.color, width: 20, height: 20, borderRadius: '50%', marginRight: 4}} />
            <SText>{category.name}</SText>
          </View>
        ))}
      </View>
      <CategoriesMenu addCategory={addCategory} categories={categories} updateCategory={updateCategory} />
    </>
  )
}

function CategoriesMenu({addCategory, categories, updateCategory}) {
  const [isToggled, toggle] = useState(false)
  return (
    <>
      <TouchableOpacity style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}} onPress={() => toggle(!isToggled)}>
        <SText fontSize={25} color='#47f'>Categories</SText>
        <Entypo name={`chevron-${isToggled ? 'up' : 'down'}`} size={30} color="white" />
      </TouchableOpacity>
      {isToggled && (
        <>
          {categories.map(category => (
            <CategoryMenu category={category} key={category.id} updateCategory={updateCategory} />
          ))}
          <AddCategory addCategory={addCategory} />
        </>
      )}
    </>
  )
}

function CategoryMenu({category, updateCategory}) {
  const [name, setName] = useState(category.name)

  function submit() {
    updateCategory({
      ...category,
      name,
      color: ['blue', 'green', 'pink', 'aqua', 'orange'][Math.floor(Math.random() * 5)],
    })
  }

  return (
    <View>
      <STextField placeholder='Name' value={name} onChangeText={setName} />
      <SButton text='Save' action={submit} />
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
      <STextField maxLength={1} placeholder='Emoji' value={emoji} onChangeText={setEmoji} />
      <SButton text='Add category' action={submit} />
    </>
  )
}