import React, { useContext, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import SText from './components/SText'
import SModal from './components/SModal'
import SButton from './components/SButton'
import { Entypo } from '@expo/vector-icons'
import dataContext from './dataContext'

export default ({expense}) => {
  const [showModal, setShowModal] = useState(false)
  const {deleteExpense} = useContext(dataContext)

  return (
    <View style={{paddingVertical: 8, borderTopColor: '#bbb', borderTopWidth: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <SText fontSize={23}>{expense.text}</SText>
      <TouchableOpacity onPress={() => setShowModal(true)} ><Entypo name="dots-three-vertical" size={24} color="white" /></TouchableOpacity>
      </View>
      <SText color='#bbb'>{expense.category.emoji} {expense.category.name} - {expense.date} - {expense.cost}kr</SText>
      <SModal show={showModal}>
        <SText fontSize={30}>Edit expense</SText>
        <UpdateExpense expense={expense} />
        <SButton action={() => deleteExpense(expense.id)} text='Delete' style={{backgroundColor: '#f44'}} />
        <SButton action={() => setShowModal(false)} text='Cancel' style={{backgroundColor: 'grey'}} />
      </SModal>
    </View>
  )
}

const UpdateExpense = ({expense}) => {
  const [category, setCategory] = useState(expense.category.id)
  const [date, setDate] = useState(expense.date)
  const [text, setText] = useState(expense.text)
  const [cost, setCost] = useState(expense.cost)

  const {updateExpense} = useContext(dataContext)

  function update() {
    updateExpense({
      ...expense, 
      category,
      date,
      text,
      cost
    })
  }

  return (
    <>
      <STextField placeholder='Text' value={text} onChangeText={setText} />
      <STextField placeholder='Cost' value={cost} onChangeText={setCost} />
      <DatePicker date={date} onDateChange={setDate} />
      <SButton text='Add Expense' action={() => {
        addExpense({date: date.toDateString(), text, cost: Number(cost), category})
        setText('')
        setCost('')
        setDate(new Date())
        setCategory(1)
        setShow(false)
      }}/>
      <SButton text='Save' action={update} />
    </>
  )
}