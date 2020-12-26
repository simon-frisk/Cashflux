import { useState, useEffect } from 'react'
import * as Statistics from '../util/Statistics'
import analytics from '@react-native-firebase/analytics'
import * as firebaseApi from './firebase'

export default function useData() {
  const [currency, setCurrency] = useState('kr')
  const [categories, setCategories] = useState([])
  const [expenses, setExpenses] = useState([])
  const [theme, setTheme] = useState('Dark')
  const [user, setUser] = useState()
  const [monthStatistics, setMonthStatistics] = useState()
  const [initialLoadDone, setInitialLoadDone] = useState(false)

  useEffect(() => firebaseApi.subscribeUserChange(user => {setUser(user);setInitialLoadDone(true)}), [])
  useEffect(() => subscribeData(), [user])

  useEffect(() => {setMonthStatistics(Statistics.getCatgegoryStatistics(categories, mapExpenses()))}, [expenses, categories])

  function subscribeData() {
    if(!user) return
    return firebaseApi.subscribeData(user.uid, data => {
      if(data)  {
        setCurrency(data.currency)
        setCategories(data.categories)
        setExpenses(data.expenses)
        setTheme(data.theme)
      } else saveData(expenses, categories, currency, theme)
    })
  }

  async function saveData(expenses, categories, currency, theme) {
    if(!user) return
    expenses.sort((e1, e2) => new Date(e1.date) < new Date(e2.date))
    await firebaseApi.storeData(user.uid, {
      expenses, categories, currency, theme
    })
    analytics().setUserProperty('numCategories', categories.length.toString())
    analytics().setUserProperty('numExpenses', expenses.length.toString())
    analytics().setUserProperty('currency', currency)
    analytics().setUserProperty('theme', theme)
  }

  function addExpense(expense) {
    const current_ids = expenses.map(expense => expense.id)
    const id = current_ids.length != 0 ? Math.max(...current_ids) + 1 : 0
    expense.id = id
    const newExpenses = [...expenses, expense]
    saveData(newExpenses, categories, currency, theme)
    analytics().logEvent('AddExpense')
  }
  
  function updateExpense(updated) {
    const newExpenses = expenses.map(expense => {
      if(expense.id == updated.id) return updated
      else return expense
    })
    saveData(newExpenses, categories, currency, theme)
    analytics().logEvent('UpdateExpense')
  }
  
  function deleteExpense(id) {
    const newExpenses = expenses.filter(expense => expense.id != id)
    saveData(newExpenses, categories, currency, theme)
    analytics().logEvent('DeleteExpense')
  }
  
  function addCategory(category) {
    const current_ids = categories.map(category => category.id)
    const id = current_ids.length != 0 ? Math.max(...current_ids) + 1 : 0
    category.id = id
    const newCategories = [category, ...categories]
    saveData(expenses, newCategories, currency, theme)
    analytics().logEvent('AddCategory')
  }

  function updateCategory(updated) {
    const newCategories = categories.map(category => {
      if(category.id != updated.id) return category
      else return updated
    })
    saveData(expenses, newCategories, currency, theme)
    analytics().logEvent('UpdateCategory')
  }

  function deleteCategory(id) {
    const newCategories = categories.filter(category => category.id != id)
    saveData(expenses, newCategories, currency, theme)
    analytics().logEvent('DeleteCategory')
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

  async function signinemail(email, password) {
    try {
      await firebaseApi.signinemail(email, password)
    } catch(error) {
      return error.message
    }
  }

  async function signupemail(email, password) {
    try {
      await firebaseApi.signupemail(email, password)
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
    signupemail, signinemail,
    signout: firebaseApi.signout,
    theme,
    setTheme: theme => saveData(expenses, categories, currency, theme),
    initialLoadDone,
    monthStatistics
  }
}
