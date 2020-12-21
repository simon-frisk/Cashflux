import React, { useContext, useState, useEffect } from 'react'
import { View, Alert, Animated } from 'react-native'
import SPageContainer from './components/SPageContainer'
import SText from './components/SText'
import SButton from './components/SButton'
import useStyle from './util/useStyle'
import dataContext from './dataContext'
import CategoryForm from './components/CategoryForm'
import { ScrollView } from 'react-native-gesture-handler'
import { getMonthlyCategories } from './util/DateTools'
import { getCostString } from './util/currency'

export default function Category({route, navigation}) {
  const {categories} = useContext(dataContext)
  const category = categories.find(category => category.id == route.params.category.id)
  const style = useStyle()

  const { deleteCategory, expenses} = useContext(dataContext)

  function handleDelete() {
    let expensesLeft = false
    for (const expense of expenses) {
      if(expense.category.id === category.id) {
        expensesLeft = true
      }
    }
    if(expensesLeft)
      Alert.alert('Expenses left', 'There are still expenses left in this category. Before deleting it, all those expenses have to be deleted.')
    else {
      deleteCategory(category.id)
      navigation.goBack()
    }
  }

  return (
    <SPageContainer>
      <CategoryGraph category={category} />
      <SButton text='Edit' action={() => navigation.navigate('Editcategory', {category})} />
      <SButton
        style={{backgroundColor: style.errorColor}} 
        text='Delete' 
        action={handleDelete}
      />
    </SPageContainer>
  )
}

function CategoryGraph({category}) {
  const {expenses, currency} = useContext(dataContext)

  const monthlyCategories = getMonthlyCategories(expenses)
  const highestMonthCost = Math.max(...monthlyCategories.map(category => category.total))
  const style = useStyle()
  
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={{alignItems: 'flex-end', marginVertical: 15}}
    >
      {monthlyCategories.map(month => {
        const cost = month[category.id] || 0
        return (
          <View key={month.string}>
            <View
              style={{
                height: month.total / highestMonthCost * 200, 
                backgroundColor: style.interfaceColor,
                borderRadius: 10,
                marginRight: 10,
                justifyContent: 'flex-end',
                overflow: 'hidden'
              }}
            >
              <MonthPortion 
                height={cost / highestMonthCost * 200} 
                color={category.color}
              />
            </View>
            <SText fontSize={22}>{month.string}</SText>
            <SText color={style.lightText}>{getCostString(cost, currency)}</SText>
            <SText color={style.lightText}>{Math.round(cost / month.total * 100)}%</SText>
          </View>
        )
      })}
    </ScrollView>
  )
}

function MonthPortion({height, color}) {
  const [heightAnimation] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(heightAnimation, {
      toValue: height,
      duration: 1000,
      useNativeDriver: false
    }).start()
  }, [])

  return (
    <Animated.View
      style={{
        width: 50,
        height: heightAnimation,
        backgroundColor: color,
        borderRadius: 10
      }}
    />
  )
}