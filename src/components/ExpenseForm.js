import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import dataContext from '../dataContext'
import SButton from './SButton'
import STextField from './STextField'
import SDatePicker from './SDatePicker'
import SText from './SText'
import SSelectionSlider from './SSelectionSlider'
import useStyle from '../util/useStyle'


export default function ExpenseForm({text, setText, category, setCategory, date, setDate, cost, setCost, submit, submitTitle}) {
  const [error, setError] = useState('')
  const {categories} = useContext(dataContext)
  const style = useStyle()

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
    setError('')
  }

  return (
    <View>
      <STextField placeholder='Text' value={text} onChangeText={setText} />
      <STextField placeholder='Cost' value={cost} onChangeText={setCost} keyboardType='number-pad' />
      <SSelectionSlider
        items={categories.map(c => c.id)}
        selected={category}
        setSelected={setCategory}
        keyExtractor={category => category.toString()}
        textExtractor={categoryId => categories.find(category => category.id == categoryId).name}
      />
      <SDatePicker date={date} onDateChange={setDate} />
      {!!error && <SText color={style.errorColor}>{error}</SText>}
      <SButton text={submitTitle} action={handleSubmit} />
    </View>
  )
}