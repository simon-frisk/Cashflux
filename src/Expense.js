import React, { useContext, useState } from 'react'
import SButton from './components/SButton'
import dataContext from './dataContext'
import ExpenseForm from './components/ExpenseForm'
import useStyle from './util/useStyle'
import SPageContainer from './components/SPageContainer'

export default function Expense({route, navigation}) {
  const { expense } = route.params

  const style = useStyle()
  const {updateExpense, deleteExpense} = useContext(dataContext)

  const [category, setCategory] = useState(expense.category.id)
  const [date, setDate] = useState(new Date(expense.date))
  const [text, setText] = useState(expense.text)
  const [cost, setCost] = useState(String(expense.cost))


  return (
    <SPageContainer>
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
      <SButton
        action={() => {
          deleteExpense(expense.id)
          navigation.goBack()
        }}
        text='Delete'
        style={{backgroundColor: style.errorColor}}
      />
    </SPageContainer>
  )
}