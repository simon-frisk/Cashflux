import {useState}from'react'

export default function useData() {
  const [expenses, setExpenses] = useState([{text: 'New Ipad', cost: 110, category: 1, id: 1, date: 'Sun Oct 18 2020'}, {text: 'Dinner', cost: 80, category: 2, id: 2, date: 'Sat Oct 17 2020'}, {text: 'Linalg book', cost: 200, category: 3, id: 3, date: 'Sat Oct 17 2020'}])
  const [categories, setCategories] = useState([{name: 'Tech', color: '#47f', emoji: '📱', id: 1}, {name: 'Food', color: '#f77', emoji: '🍌', id: 2}, {name: 'Books', color: '#fff', emoji: '📚', id: 3}])

  function mapExpenses() {
    return expenses.map(expense => {
      return {
        ...expense,
        category: categories.find(category => category.id == expense.category)
      }
    })
  }

  return {
    expenses: mapExpenses()
  }
}