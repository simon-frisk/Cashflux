import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export default function useData() {
  const [isInitialSyncDone, setIsInitialSyncDone] = useState(false)
  const [expenses, setExpenses] = useState([])
  const [categories, setCategories] = useState([])
  const [currency, setCurrency] = useState('')

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
      const currencyData = await AsyncStorage.getItem('currency')
      if (!expensesJSON || !categoriesJSON){
        setCategories([])
        setExpenses([])
      }
      else {
        setCategories(JSON.parse(categoriesJSON))
        setExpenses(JSON.parse(expensesJSON))
      }
      if(!currencyData) setCurrency('kr')
      else setCurrency(currencyData)
      setIsInitialSyncDone(true)
    } catch(error) {}
  }

  async function saveData() {
    try {
      await AsyncStorage.setItem('categories', JSON.stringify(categories))
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses))
      await AsyncStorage.setItem('currency', currency)
    } catch(error) { }
  }

  function addExpense(expense) {
    const current_ids = expenses.map(expense => expense.id)
    const id = current_ids.length != 0 ? Math.max(...current_ids) + 1 : 0
    expense.id = id
    const newList = [...expenses, expense]
    newList.sort((a, b) => new Date(a.date) < new Date(b.date))
    setExpenses(newList)
  }

  function updateExpense(updated) {
    console.log(updated)
    setExpenses(expenses.map(expense => {
      if(expense.id == updated.id) return updated
      else return expense
    }))
  }

  function deleteExpense(id) {
    setExpenses(expenses.filter(expense => expense.id != id))
  }

  function addCategory(category) {
    const current_ids = categories.map(category => category.id)
    const id = current_ids.length != 0 ? Math.max(...current_ids) + 1 : 0
    category.id = id
    setCategories([category, ...categories])
  }

  function updateCategory(updated) {
    setCategories(categories.map(category => {
      if(category.id != updated.id) return category
      else return updated
    }))
  }

  function deleteCategory(id) {
    setCategories(categories.filter(category => category.id != id))
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
    deleteExpense,
    updateExpense,
    addCategory,
    updateCategory,
    deleteCategory,
    currency, setCurrency
  }
}