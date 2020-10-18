import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

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
        setExpenses([])
        setCategories([])
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
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses))
      await AsyncStorage.setItem('categories', JSON.stringify(categories))
    } catch(error) { }
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
    expenses: mapExpenses()
  }
}