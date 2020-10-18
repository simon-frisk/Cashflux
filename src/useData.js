import {useState}from'react'

export default function useData() {
  const [expenses, setExpenses] = useState([{text: 'New Ipad', cost: 110, category: 'Tech'}, {text: 'Dinner', cost: 80, category: 'Food'}])
  const [categories, setCategories] = useState([{name: 'Tech', color: '#47f', emoji: '📱'}, {name: 'Food', color: '#f77', emoji: '🍌'}])

  return {expenses, setExpenses, categories, setCategories}
}