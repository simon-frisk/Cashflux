import React, { useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import SButton from './components/SButton'
import STextField from './components/STextField'
import SText from './components/SText'
import { Entypo } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'


export default ({categories, addExpense}) => {
  const [isToggled, toggle] = useState(false)

  const [category, setCategory] = useState(1)
  const [date, setDate] = useState(new Date())
  const [text, setText] = useState('')
  const [cost, setCost] = useState('')

  return (
    <View style={{marginVertical: 10}}>
      <TouchableOpacity style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}} onPress={() => toggle(!isToggled)}>
        <SText fontSize={25} color='#47f'>Add Expense</SText>
        <Entypo name={`chevron-${isToggled ? 'up' : 'down'}`} size={30} color="white" />
      </TouchableOpacity>
      {isToggled && (
        <View>
          <STextField placeholder='Text' value={text} onChangeText={setText} />
          <View style={{flexDirection: 'row'}}>
            <STextField placeholder='Cost' style={{width: 100, marginRight: 5}} value={cost} onChangeText={setCost} />
            <CategoryPicker categories={categories} category={category} setCategory={setCategory} />
          </View>
          <DatePicker date={date} onDateChange={setDate} />
          <SButton text='Add Expense' action={() => {
            addExpense({date: date.toDateString(), text, cost: Number(cost), category})
            setText('')
            setCost('')
            setDate(new Date())
            setCategory(1)
          }} />
      </View>
      )}
    </View>
  )
}

function CategoryPicker({categories, category, setCategory}) {
  return (
    <FlatList data={categories}  horizontal={true} renderItem={({item}) => (
      <TouchableOpacity style={{backgroundColor: item.id == category ? '#f80' : '#777', marginHorizontal: 3, padding: 5, borderRadius: 5, marginVertical: 5}} onPress={() => setCategory(item.id)}>
        <SText>{item.name}</SText>
      </TouchableOpacity>
    )} />
  )
}

function DatePicker({date, onDateChange}) {
  const [show, setShow] = useState(false)

  return (
    <View>
      <SText style={{textAlign: 'center'}}>{date.toDateString()}</SText>
      {show && (
        <DateTimePicker
          value={date}
          mode='date'
          display='default'
          onChange={(_, selectedDate) => {
            const currentDate = selectedDate || date
            setShow(Platform.OS === 'ios')
            onDateChange(currentDate)
          }}
        />
      )}
      <SButton text='Change date' action={() => setShow(!show)} />
    </View>
  )
}