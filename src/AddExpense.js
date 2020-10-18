import React, { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import SButton from './components/SButton'
import STextField from './components/STextField'
import SText from './components/SText';


export default ({categories, addExpense}) => {
  const [category, setCategory] = useState(1)
  const [date, setDate] = useState(Date.now())
  const [text, setText] = useState('')
  const [cost, setCost] = useState('')

  return (
    <View style={{marginVertical: 10}}>
      <STextField placeholder='Text' value={text} onChangeText={setText} />
      <View style={{flexDirection: 'row'}}>
        <STextField placeholder='Cost' style={{width: 100, marginRight: 5}} value={cost} onChangeText={setCost} />
        <CategoryPicker categories={categories} category={category} setCategory={setCategory} />
      </View>
      <DatePicker date={date} setDate={setDate} />
      <SButton text='Add Expense' action={() => {
        addExpense({date: new Date(date).toDateString(), text, cost: Number(cost), category})
        setText('')
        setCost('')
        setDate(Date.now())
        setCategory(1)
      }} />
    </View>
  )
}

function CategoryPicker({categories, category, setCategory}) {
  return (
    <FlatList data={categories}  horizontal={true} renderItem={({item}) => (
      <TouchableOpacity style={{backgroundColor: item.id == category ? '#f80' : '#777', marginHorizontal: 3, padding: 5, borderRadius: 5, marginVertical: 5}} onPress={() => setCategory(item.id)}>
        <SText >{item.name}</SText>
      </TouchableOpacity>
    )} />
  )
}

function DatePicker({date, setDate}) {
  const [year, setYear] = useState(new Date(date).getFullYear().toString())
  const [month, setMonth] = useState(new Date(date).getMonth().toString())
  const [day, setDay] = useState(new Date(date).getDate().toString())

  useEffect(() => {
    if(year && month && day) {
      date = new Date()
      date.setYear(year)
      date.setMonth(month)
      date.setDate(date)
      setDate(date)
    }
  }, [day, month, year])

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <STextField style={{width: '45%'}} maxLength={4} value={year} onChangeText={setYear} />
      <STextField style={{width: '25%'}} maxLength={2} value={month} onChangeText={setMonth} />
      <STextField style={{width: '25%'}} maxLength={2} value={day} onChangeText={setDay} />
    </View>
  )
}