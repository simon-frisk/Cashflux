import { useState, useEffect } from 'react'
import * as firebaseApi from './firebase'

export default function useData() {
  const [currency, setCurrency] = useState('kr')
  const [categories, setCategories] = useState([])
  const [expenses, setExpenses] = useState([])
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
      } else saveData(expenses, categories, currency)
      setInitialLoadDone(true)
    })
  }

  async function saveData(expenses, categories, currency) {
    if(!user) return
    firebaseApi.storeData(user.uid, {
      expenses, categories, currency
    })
  }

  function addExpense(expense) {
    const current_ids = expenses.map(expense => expense.id)
    const id = current_ids.length != 0 ? Math.max(...current_ids) + 1 : 0
    expense.id = id
    const newExpenses = [...expenses, expense]
    newExpenses.sort((a, b) => new Date(a.date) < new Date(b.date))
    saveData(newExpenses, categories, currency)
  }

  function updateExpense(updated) {
    const newExpenses = expenses.map(expense => {
      if(expense.id == updated.id) return updated
      else return expense
    })
    saveData(newExpenses, categories, currency)
  }

  function deleteExpense(id) {
    const newExpenses = expenses.filter(expense => expense.id != id)
    saveData(newExpenses, categories, currency)
  }

  function addCategory(category) {
    const current_ids = categories.map(category => category.id)
    const id = current_ids.length != 0 ? Math.max(...current_ids) + 1 : 0
    category.id = id
    const newCategories = [category, ...categories]
    saveData(expenses, newCategories, currency)
  }

  function updateCategory(updated) {
    const newCategories = categories.map(category => {
      if(category.id != updated.id) return category
      else return updated
    })
    saveData(expenses, newCategories, currency)
  }

  function deleteCategory(id) {
    const newCategories = categories.filter(category => category.id != id)
    saveData(expenses, newCategories, currency)
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
    setCurrency: currency => saveData(expenses, categories, currency),
    user,
    linkemail, signinemail,
    signout: firebaseApi.signout,
    initialLoadDone
  }
}
