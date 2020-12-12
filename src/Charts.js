import React, { useContext, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import SText from './components/SText'
import { PieChart } from 'react-native-svg-charts'
import dataContext from './dataContext'
import {getMonthString, getMonthlyExpenses} from './util/MonthTools'

export default function ExpensePie() {
    // Page for Expense pie chart
    const {expenses, categories, currency} = useContext(dataContext)
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(0)

    const monthlyExpenses = getMonthlyExpenses(expenses)
    
    if(!monthlyExpenses.length) return <View />

    const pieData = categories
        .map(category => ({
            value: monthlyExpenses[selectedMonthIndex].filter(expense => expense.category.id === category.id).reduce((total, expense) => total + expense.cost, 0),
            svg: {
                fill: category.color,
            },
            key: category.id,
            arc: { cornerRadius: 10,  }
            }))
    
    const total = monthlyExpenses[selectedMonthIndex].reduce((total, expense) => total + expense.cost, 0)

    return (
        <View>
            <MonthSelector months={monthlyExpenses} month={selectedMonthIndex} setMonth={setSelectedMonthIndex} />
            <View>
                <PieChart style={{ height: 200, marginVertical: 15 }} innerRadius='70%' padAngle={.05} data={pieData} />
                <View style={{position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <SText fontSize={30}>{total}{currency}</SText>
                </View>
            </View>
        </View>
    )
}

function MonthSelector({months, month, setMonth}) {
    return (
        <FlatList data={months} horizontal={true} keyExtractor={(item) => item} renderItem={({item}) => (
            <TouchableOpacity
                style={{
                    backgroundColor: months.indexOf(item) == month ? '#47f' : '#777',
                    marginHorizontal: 3, padding: 7, borderRadius: 10
                }}
                onPress={() => setMonth(months.indexOf(item))}
            >
                <SText>{getMonthString(item[0].date)}</SText>
            </TouchableOpacity>
            )} />
    )
}