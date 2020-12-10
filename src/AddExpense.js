import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import SButton from './components/SButton'
import STextField from './components/STextField'
import SModal from './components/SModal'
import SText from './components/SText'
import CategoryPicker from './components/CategoryPicker'
import dataContext from './dataContext'
import SDatePicker from './components/SDatePicker'

export default () => {
  const [show, setShow] = useState(false)

  const {addExpense, categories} = useContext(dataContext)

  const [category, setCategory] = useState(1)
  const [date, setDate] = useState(new Date())
  const [text, setText] = useState('')
  const [cost, setCost] = useState('')

  return (
    <View>
      <SButton text='Add expense' action={() => setShow(true)} />
      <SModal show={show}>
        <SText fontSize={30} color='#47f'>Add Expense</SText>
        <STextField placeholder='Text' value={text} onChangeText={setText} />
        <STextField placeholder='Cost' value={cost} onChangeText={setCost} />
        <CategoryPicker categories={categories} category={category} setCategory={setCategory} />
        <SDatePicker date={date} onDateChange={setDate} />
        <SButton text='Add Expense' action={() => {
          addExpense({date: date.toDateString(), text, cost: Number(cost), category})
          setText('')
          setCost('')
          setDate(new Date())
          setCategory(1)
          setShow(false)
        }} />
        <SButton style={{backgroundColor: 'grey'}} text='Cancel' action={() => setShow(false)} />
      </SModal>
    </View>
  )
}