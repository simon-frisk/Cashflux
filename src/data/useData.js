import AsyncStorage from '@react-native-community/async-storage'
import { useState, useEffect } from 'react'
import { signupemail, signinemail, signout, storeDataFirebase, subscribeFirebase } from './firebase'
import { getDataLocal, storeDataLocal } from './localStorage'

export default function useData() {
  const [expenses, setExpenses] = useState([])
  const [categories, setCategories] = useState([])
  const [currency, setCurrency] = useState('')
  const [user, setUser] = useState()

  const [loading, setLoading] = useState(true)

  useEffect(() => { initialLoad() }, [])
  useEffect(() => { userChange() }, [user])
  useEffect(() => { storeData() })
  
  async function initialLoad() {
    const userJSON = await AsyncStorage.getItem('user')
    setUser(JSON.parse(userJSON))
  }

  async function userChange() {
    await AsyncStorage.setItem('user', JSON.stringify(user))
    if(user) {
      subscribeFirebase(user.user.uid, data => {
        setCategories(data.categories || [])
        setExpenses(data.expenses || [])
        setCurrency(data.currency || 'kr')
        setLoading(false)
      })
    } else {
      let data = await getDataLocal()
      setCategories(data.categories || [])
      setExpenses(data.expenses || [])
      setCurrency(data.currency || 'kr')
      setLoading(false)
    }
  }

  async function storeData() {
    if(!loading) {
      if(user) {
        storeDataFirebase(user.user.uid, {
          expenses, categories, currency
        })
      }
      await storeDataLocal({ categories, expenses, currency })
    }
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
    if(!expenses) return null
    return expenses.map(expense => {
      const category = categories.find(category => category.id == expense.category)
      return {
        ...expense,
        category
      }
    })
  }

  async function signupwithemailandpassword(email, password) {
    try {
      const user = await signupemail(email, password)
      setUser(user)
    } catch(error) {
      return error.message
    }
  }

  async function signinwithemailandpassword(email, password) {
    try {
      const user = await signinemail(email, password)
      setUser(user)
    } catch(error) {
      return error.message
    }
  }

  async function signOutUser() {
    setUser(null)
    signout()
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
    currency, setCurrency,
    user,
    signinwithemailandpassword,
    signupwithemailandpassword,
    signOutUser,
    loading
  }
}