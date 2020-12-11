import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import dataContext from '../dataContext'
import SButton from './SButton'
import STextField from './STextField'
import CategoryPicker from './CategoryPicker'
import SDatePicker from './SDatePicker'
import SText from './SText'


export default function ExpenseForm({text, setText, category, setCategory, date, setDate, cost, setCost, submit, submitTitle}) {
  const [error, setError] = useState('')
  const {categories} = useContext(dataContext)

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
    setText('')
    setCost('')
    setDate(new Date())
    setCategory(1)
    setError(false)
  }

  return (
    <View>
      <STextField placeholder='Text' value={text} onChangeText={setText} />
      <STextField placeholder='Cost' value={cost} onChangeText={setCost} />
      <CategoryPicker categories={categories} category={category} setCategory={setCategory} />
      <SDatePicker date={date} onDateChange={setDate} />
      {!!error && <SText color='red'>{error}</SText>}
      <SButton text={submitTitle} action={handleSubmit} />
    </View>
  )
}