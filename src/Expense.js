import React, { useContext, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import SText from './components/SText'
import SModal from './components/SModal'
import SButton from './components/SButton'
import { Entypo } from '@expo/vector-icons'
import dataContext from './dataContext'
import SDatePicker from './components/SDatePicker'
import STextField from './components/STextField'

export default ({expense}) => {
  const [showModal, setShowModal] = useState(false)
  const {deleteExpense} = useContext(dataContext)

  return (
    <View style={{paddingVertical: 8, borderTopColor: '#bbb', borderTopWidth: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <View>
          <SText fontSize={23}>{expense.text}</SText>
          <SText color='#bbb'>{expense.category.emoji} {expense.category.name} - {expense.date} - {expense.cost}kr</SText>
        </View>
        <TouchableOpacity onPress={() => setShowModal(true)} ><Entypo name="dots-three-vertical" size={28} color="white" /></TouchableOpacity>
      </View>
      <SModal show={showModal} close={() => setShowModal(false)} title='Expense'>
        <UpdateExpense expense={expense} close={() => setShowModal(false)} />
        <SButton action={() => deleteExpense(expense.id)} text='Delete' style={{backgroundColor: '#f44'}} />
      </SModal>
    </View>
  )
}

const UpdateExpense = ({expense, close}) => {
  const [category, setCategory] = useState(expense.category.id)
  const [date, setDate] = useState(new Date(expense.date))
  const [text, setText] = useState(expense.text)
  const [cost, setCost] = useState(String(expense.cost))

  const {updateExpense} = useContext(dataContext)

  function update() {
    updateExpense({
      ...expense, 
      category,
      date: date.toDateString(),
      text,
      cost: Number(cost)
    })
    close()
  }

  return (
    <>
      <STextField placeholder='Text' value={text} onChangeText={setText} />
      <STextField placeholder='Cost' value={cost} onChangeText={setCost} />
      <SDatePicker date={date} onDateChange={setDate} />
      <SButton text='Save' action={update} />
    </>
  )
}