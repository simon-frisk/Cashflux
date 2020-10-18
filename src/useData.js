import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

//[{text: 'New Ipad', cost: 110, category: 1, id: 1, date: 'Sun Oct 18 2020'}, {text: 'Dinner', cost: 80, category: 2, id: 2, date: 'Sat Oct 17 2020'}, {text: 'Linalg book', cost: 200, category: 3, id: 3, date: 'Sat Oct 17 2020'}]
//[{name: 'Tech', color: '#47f', emoji: '📱', id: 1}, {name: 'Food', color: '#f77', emoji: '🍌', id: 2}, {name: 'Books', color: '#fff', emoji: '📚', id: 3}]


export default function useData() {
  const [isInitialSyncDone, setIsInitialSyncDone] = useState(false)
  const [expenses, setExpenses] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if(!isInitialSyncDone) {
      initialDataSync()
    }
    else {
      saveData()
    }
  })

  async function initialDataSync() {
    try {
      const expensesJSON = await AsyncStorage.getItem('expenses')
      const categoriesJSON = await AsyncStorage.getItem('categories')
      if (!expensesJSON || !categoriesJSON){
        setCategories([])
        setExpenses([])
      }
      else {
        setCategories(JSON.parse(categoriesJSON))
        setExpenses(JSON.parse(expensesJSON))
      }
      setIsInitialSyncDone(true)
    } catch(error) {}
  }

  async function saveData() {
    try {
      await AsyncStorage.setItem('categories', JSON.stringify(categories))
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses))
    } catch(error) { }
  }

  function addExpense(expense) {
    const current_ids = expenses.map(expense => expense.id)
    const id = current_ids.length != 0 ? Math.max(...current_ids) + 1 : 0
    expense.id = id
    setExpenses([...expenses, expense])
  }

  function deleteExpense(id) {
    setExpenses(expenses.filter(expense => expense.id != id))
  }

  function mapExpenses() {
    return expenses.map(expense => {
      const category = categories.find(category => category.id == expense.category)
      return {
        ...expense,
        category
      }
    })
  }

  return {
    expenses: mapExpenses(),
    categories,
    addExpense,
    deleteExpense
  }
}