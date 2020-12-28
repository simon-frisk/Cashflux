import { useState, useEffect } from 'react'
import * as Statistics from '../util/Statistics'
import analytics from '@react-native-firebase/analytics'
import * as firebaseApi from './firebase'
import firestore from '@react-native-firebase/firestore'

export default function useData() {
  const [currency, setCurrency] = useState('kr')
  const [categories, setCategories] = useState([])
  const [expenses, setExpenses] = useState([])
  const [theme, setTheme] = useState('Dark')
  const [subscription, setSubsription] = useState()
  const [user, setUser] = useState()
  const [monthStatistics, setMonthStatistics] = useState()
  const [loading, setLoading] = useState(true)
  const [initialAuthCheckDone, setInitialAuthCheckDone] = useState(false)

  useEffect(() => firebaseApi.subscribeUserChange(user => {
    setUser(user);
    setInitialAuthCheckDone(true)
  }), [])

  useEffect(() => {
    setLoading(true)
    subscribeData()
  }, [user])

  useEffect(() => {
    if(!user && initialAuthCheckDone) setLoading(false)
  }, [initialAuthCheckDone])

  useEffect(() => {setMonthStatistics(Statistics.getCatgegoryStatistics(categories, mapExpenses()))}, [expenses, categories])

  function subscribeData() {
    if(!user) {
      if(initialAuthCheckDone)
        setLoading(false)
      return
    }
    return firebaseApi.subscribeData(user.uid, data => {
      if(data)  {
        setCurrency(data.currency)
        setCategories(data.categories)
        setExpenses(data.expenses)
        setTheme(data.theme)
        setSubsription(data.subscription ? data.subscription.plan : null)
      } else {
        firestore().collection('users').doc(user.uid).set({
          currency, 
          categories, 
          expenses,
          theme,
          subscription: null
        })
      }
      setLoading(false)
    })
  }

  async function addExpense(expense) {
    const current_ids = expenses.map(expense => expense.id)
    const id = current_ids.length != 0 ? Math.max(...current_ids) + 1 : 0
    expense.id = id
    const newExpenses = [...expenses, expense]
    await firestore().collection('users').doc(user.uid).update({
      expenses: newExpenses
    })
    analytics().setUserProperty('numExpenses', newExpenses.length.toString())
    analytics().logEvent('AddExpense')
  }

  async function updateExpense(updated) {
    const newExpenses = expenses.map(expense => {
      if(expense.id == updated.id) return updated
      else return expense
    })
    await firestore().collection('users').doc(user.uid).update({
      expenses: newExpenses
    })
    analytics().logEvent('UpdateExpense')
  }
  
  async function deleteExpense(id) {
    const newExpenses = expenses.filter(expense => expense.id != id)
    await firestore().collection('users').doc(user.uid).update({
      expenses: newExpenses
    })
    analytics().logEvent('DeleteExpense')
  }
  
  async function addCategory(category) {
    const current_ids = categories.map(category => category.id)
    const id = current_ids.length != 0 ? Math.max(...current_ids) + 1 : 0
    category.id = id
    const newCategories = [category, ...categories]
    await firestore().collection('users').doc(user.uid).update({
      categories: newCategories
    })
    analytics().logEvent('AddCategory')
  }

  async function updateCategory(updated) {
    const newCategories = categories.map(category => {
      if(category.id != updated.id) return category
      else return updated
    })
    await firestore().collection('users').doc(user.uid).update({
      categories: newCategories
    })
    analytics().logEvent('UpdateCategory')
  }

  async function deleteCategory(id) {
    const newCategories = categories.filter(category => category.id != id)
    await firestore().collection('users').doc(user.uid).update({
      categories: newCategories
    })
    analytics().logEvent('DeleteCategory')
  }

  async function updateCurrency(currency) {
    await firestore().collection('users').doc(user.uid).update({
      currency
    })
  }

  async function updateTheme(theme) {
    await firestore().collection('users').doc(user.uid).update({
      theme
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
    setCurrency: updateCurrency,
    user,
    signupemail, signinemail,
    signout: firebaseApi.signout,
    theme,
    setTheme: updateTheme,
    subscription,
    loading,
    monthStatistics
  }
}
