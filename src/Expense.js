import React, { useContext, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import SText from './components/SText'
import SModal from './components/SModal'
import SButton from './components/SButton'
import { Entypo } from '@expo/vector-icons'
import dataContext from './dataContext'
import ExpenseForm from './components/ExpenseForm'
import { getDayString } from './util/DateTools'

export default ({expense}) => {
  const [showModal, setShowModal] = useState(false)
  const {deleteExpense, currency} = useContext(dataContext)

  return (
    <View style={{paddingVertical: 5, borderTopColor: '#bbb', borderTopWidth: .5}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <View>
          <SText fontSize={23}>{expense.text}</SText>
          <SText color='#bbb'>{expense.category.emoji} {expense.category.name} - {getDayString(expense.date)} - {expense.cost}{currency}</SText>
        </View>
        <TouchableOpacity onPress={() => setShowModal(true)} ><Entypo name="dots-three-vertical" size={28} color="white" /></TouchableOpacity>
      </View>
      <SModal show={showModal} close={() => setShowModal(false)} title='Expense'>
        <UpdateExpense expense={expense} />
        <SButton action={() => deleteExpense(expense.id)} text='Delete' style={{backgroundColor: '#f44'}} />
      </SModal>
    </View>
  )
}

const UpdateExpense = ({expense}) => {
  const [category, setCategory] = useState(expense.category.id)
  const [date, setDate] = useState(new Date(expense.date))
  const [text, setText] = useState(expense.text)
  const [cost, setCost] = useState(String(expense.cost))

  const {updateExpense} = useContext(dataContext)

  return (
    <ExpenseForm
      text={text}
      setText={setText}
      date={date}
      setDate={setDate}
      category={category}
      setCategory={setCategory}
      cost={cost}
      setCost={setCost}
      submit={() => updateExpense({...expense, date: date.toDateString(), text, cost: Number(cost), category})}
      effect={true}
    />
  )
}