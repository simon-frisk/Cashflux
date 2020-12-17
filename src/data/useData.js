import { useState, useEffect } from 'react'
import * as firebaseApi from './firebase'

export default function useData() {
  const [currency, setCurrency] = useState('kr')
  const [categories, setCategories] = useState([])
  const [expenses, setExpenses] = useState([])
  const [theme, setTheme] = useState('Dark')
  const [user, setUser] = useState()
  const [initialLoadDone, setInitialLoadDone] = useState(false)

  useEffect(() => loadUser(), [])
  useEffect(() => subscribeData(), [user])

  function loadUser() {
    return firebaseApi.subscribeUserChange(async newUser => {
      if(!newUser)
        newUser = (await firebaseApi.signupananym()).user
      setUser(newUser)
    })
  }

  function subscribeData() {
    if(!user) return
    return firebaseApi.subscribeData(user.uid, data => {
      if(data)  {
        setCurrency(data.currency)
        setCategories(data.categories)
        setExpenses(data.expenses)
        setTheme(data.theme)
      } else saveData(expenses, categories, currency, theme)
      setInitialLoadDone(true)
    })
  }

  async function saveData(expenses, categories, currency, theme) {
    if(!user) return
    expenses.sort((e1, e2) => new Date(e1.date) < new Date(e2.date))
    firebaseApi.storeData(user.uid, {
      expenses, categories, currency, theme
    })
  }

  function addExpense(expense) {
    const current_ids = expenses.map(expense => expense.id)
    const id = current_ids.length != 0 ? Math.max(...current_ids) + 1 : 0
    expense.id = id
    const newExpenses = [...expenses, expense]
    saveData(newExpenses, categories, currency, theme)
  }

  function updateExpense(updated) {
    const newExpenses = expenses.map(expense => {
      if(expense.id == updated.id) return updated
      else return expense
    })
    saveData(newExpenses, categories, currency, theme)
  }

  function deleteExpense(id) {
    const newExpenses = expenses.filter(expense => expense.id != id)
    saveData(newExpenses, categories, currency, theme)
  }

  function addCategory(category) {
    const current_ids = categories.map(category => category.id)
    const id = current_ids.length != 0 ? Math.max(...current_ids) + 1 : 0
    category.id = id
    const newCategories = [category, ...categories]
    saveData(expenses, newCategories, currency, theme)
  }

  function updateCategory(updated) {
    const newCategories = categories.map(category => {
      if(category.id != updated.id) return category
      else return updated
    })
    saveData(expenses, newCategories, currency, theme)
  }

  function deleteCategory(id) {
    const newCategories = categories.filter(category => category.id != id)
    saveData(expenses, newCategories, currency, theme)
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

  async function linkemail(email, password) {
    try {
      const user = await firebaseApi.linkemail(email, password)
      setUser({...user})
    } catch(error) {
      return error.message
    }
  }

  async function signinemail(email, password) {
    try {
      const oldUser = user
      await firebaseApi.signinemail(email, password)
      firebaseApi.deleteUser(oldUser)
    } catch(error) {
      return error.message
    }
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
    currency,
    setCurrency: currency => saveData(expenses, categories, currency, theme),
    user,
    linkemail, signinemail,
    signout: firebaseApi.signout,
    theme,
    setTheme: theme => saveData(expenses, categories, currency, theme),
    initialLoadDone
  }
}
