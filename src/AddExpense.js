import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import SButton from './components/SButton'
import SModal from './components/SModal'
import dataContext from './dataContext'
import ExpenseForm from './components/ExpenseForm'

export default () => {
  const [show, setShow] = useState(false)

  const {addExpense} = useContext(dataContext)

  const [category, setCategory] = useState(null)
  const [date, setDate] = useState(new Date())
  const [text, setText] = useState('')
  const [cost, setCost] = useState('')

  return (
    <View>
      <SButton text='Add expense' action={() => setShow(true)} />
      <SModal show={show} close={() => {setShow(false)}} title='Add expense'>
        <ExpenseForm
          submitTitle='Add expense'
          text={text}
          setText={setText}
          date={date}
          setDate={setDate}
          category={category}
          setCategory={setCategory}
          cost={cost}
          setCost={setCost}
          submit={() => {
            addExpense({date: date.toDateString(), text, cost: Number(cost), category})
            setShow(false)
          }}
        />
      </SModal>
    </View>
  )
}