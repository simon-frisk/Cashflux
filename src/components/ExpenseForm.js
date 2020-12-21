import React, { useContext, useState } from 'react'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { Feather, FontAwesome5 } from '@expo/vector-icons'
import dataContext from '../dataContext'
import SButton from './SButton'
import STextField from './STextField'
import SDatePicker from './SDatePicker'
import SText from './SText'
import useStyle from '../util/useStyle'
import CategoryIcon from './CategoryIcon'
import SNewCategoryButton from './SNewCategoryButton'

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
      <STextField placeholder='Text' value={text} onChangeText={setText}  icon={<Feather name="file-text" />} />
      <STextField placeholder='Cost' value={cost} onChangeText={setCost} keyboardType='number-pad' icon={<FontAwesome5 name="coins" />} />
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        <SNewCategoryButton />
        {categories.map(item => (
          <TouchableOpacity 
            style={{
              backgroundColor: item.id == category ? style.secondaryColor : style.foregroundColor, 
              marginRight: 5, 
              padding: 5, 
              borderRadius: 10,
              marginVertical: 5
            }}
            onPress={() => setCategory(item.id)}
            key={item.id}
          >
            <CategoryIcon emoji={item.emoji} size={40} text={item.name} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <SDatePicker date={date} onDateChange={setDate} />
      {!!error && <SText color={style.errorColor}>{error}</SText>}
      <SButton text={submitTitle} action={handleSubmit} />
    </View>
  )
}