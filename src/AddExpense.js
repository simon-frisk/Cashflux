import React, { useContext, useEffect, useState } from 'react'
import dataContext from './dataContext'
import ExpenseForm from './components/ExpenseForm'
import SPageContainer from './components/SPageContainer'
import {boundary} from './Subscription'

export default function AddExpense({navigation}) {
  const {addExpense, expenses, subscription} = useContext(dataContext)

  useEffect(() => {
    if(expenses.length > boundary && !subscription) {
      navigation.replace('Subscription')
    }
  })

  const [category, setCategory] = useState()
  const [date, setDate] = useState(new Date())
  const [text, setText] = useState('')
  const [cost, setCost] = useState('')

  return (
    <SPageContainer>
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
          navigation.goBack()
        }}
      />
    </SPageContainer>
  )
}