import React, { useContext, useState, useEffect } from 'react'
import { View, Alert, Animated, TouchableOpacity } from 'react-native'
import SPageContainer from './components/SPageContainer'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SText from './components/SText'
import useStyle from './util/useStyle'
import dataContext from './dataContext'
import { ScrollView } from 'react-native-gesture-handler'
import { getCostString } from './util/currency'
import SBottomBar from './components/SBottomBar'
import STextButton from './components/STextButton'

export default function Category({route, navigation}) {
  const { deleteCategory, expenses, categories, currency, monthStatistics} = useContext(dataContext)
  const category = categories.find(category => category.id == route.params.category.id)
  const style = useStyle()

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
    <>
      <SPageContainer>
        <CategoryGraph category={category} />
        <CategoryStats category={category} currency={currency} monthStatistics={monthStatistics} />
      </SPageContainer>
      <SBottomBar>
        <STextButton text='Edit' icon={<AntDesign name='edit' />} action={() => navigation.navigate('Editcategory', {category})} />
        <STextButton text='Delete' icon={<AntDesign name='delete' />} color={style.errorColor} action={handleDelete} />
      </SBottomBar>
    </>
  )
}

function CategoryGraph({category}) {
  const {currency, monthStatistics} = useContext(dataContext)

  const highestMonthCost = Math.max(...monthStatistics.months.map(month => month.total))
  const style = useStyle()
  
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={{alignItems: 'flex-end', marginVertical: 15}}
    >
      {monthStatistics.months.map(month => {
        const cost = month.categories[category.id].cost
        return (
          <View key={month.string}>
            <View
              style={{
                height: month.total / highestMonthCost * 200, 
                width: 50,
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
            <SText fontSize={22}>{month.string.split(' ')[0]}</SText>
            <SText color={style.lightText}>{getCostString(cost, currency)}</SText>
            <SText color={style.lightText}>{month.categories[category.id].percentage}%</SText>
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

function CategoryStats({category, currency, monthStatistics}) {
  const style = useStyle()
  const stat = monthStatistics.avg12Months.categories[category.id]

  return (
    <View style={{
      padding: 10,
      backgroundColor: style.foregroundColor,
      borderRadius: 10,
      marginBottom: 20
    }}>
      <SText fontSize={20}>Average last {monthStatistics.avg12Months.numMonths} months</SText>
      <SText>{getCostString(stat.cost, currency)}</SText>
      <SText>{stat.percentage}%</SText>
    </View>
  )
}