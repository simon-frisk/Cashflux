import AsyncStorage from '@react-native-community/async-storage'
import { useState, useEffect } from 'react'
import { signupemail, signinemail, signupananym, signout, subscribeData, storeData } from './firebase'

export default function useData() {
  const [expenses, setExpenses] = useState([])
  const [categories, setCategories] = useState([])
  const [currency, setCurrency] = useState('kr')
  const [user, setUser] = useState()

  const [loading, setLoading] = useState(true)

  useEffect(() => { initialLoad() }, [])
  useEffect(() => { saveData() })

  async function initialLoad() {
    const userJSON = await AsyncStorage.getItem('user')
    let loadedUser = JSON.parse(userJSON)
    if(!userJSON)
      loadedUser = await signupananym()
    subscribeData(loadedUser.user.uid, data => {
      setUser(loadedUser)
      console.log('upd')
      if(data) {
        setCategories(data.categories)
        setExpenses(data.expenses)
        setCurrency(data.currency)
      }
      setLoading(false)
    })
  }

  async function saveData() {
    if(!loading)
      storeData(user.user.uid, {
        expenses, categories, currency
      })
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
    storeData()
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
