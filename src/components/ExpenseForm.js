import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import dataContext from '../dataContext'
import SButton from './SButton'
import STextField from './STextField'
import SDatePicker from './SDatePicker'
import SText from './SText'
import SSelectionSlider from './SSelectionSlider'


export default function ExpenseForm({text, setText, category, setCategory, date, setDate, cost, setCost, submit, submitTitle, effect}) {
  const [error, setError] = useState('')
  const {categories} = useContext(dataContext)

  useEffect(() => {
    if(effect) handleSubmit()
  }, [text, category, date, cost])

  function handleSubmit() {
    if(category == null) {
      setError('Category has to be selected')
      return
    }
    if(cost == '') {
      setError('Cost has to be specified')
      return
    }
    if(isNaN(Number(cost))) {
      setError('Invalid cost')
      return
    }
    if(text == '') {
      setError('Text has to be specified')
      return
    }
    submit()
    if(!effect) {
      setText('')
      setCost('')
      setDate(new Date())
      setCategory(1)
    }
    setError('')
  }

  return (
    <View>
      <STextField placeholder='Text' value={text} onChangeText={setText} />
      <STextField placeholder='Cost' value={cost} onChangeText={setCost} />
      <SSelectionSlider
        items={categories.map(c => c.id)}
        selected={category}
        setSelected={setCategory}
        keyExtractor={category => category.toString()}
        textExtractor={categoryId => categories.find(category => category.id == categoryId).name}
      />
      <SDatePicker date={date} onDateChange={setDate} />
      {!!error && <SText color='red'>{error}</SText>}
      {!effect && <SButton text={submitTitle} action={handleSubmit} />}
    </View>
  )
}