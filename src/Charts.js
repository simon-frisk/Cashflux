import React, { useContext } from 'react'
import { View } from 'react-native'
import SText from './components/SText'
import { PieChart } from 'react-native-svg-charts'
import dataContext from './dataContext'

export default function ExpensePie() {
    // Page for Expense pie chart
    const {expenses, categories} = useContext(dataContext)
    const getTime = date => date.split(' ')[1] + date.split(' ')[3]
    const time = getTime(new Date().toDateString())

    const pieData = categories
        .map(category => ({
            value: expenses.filter(expense => (expense.category.id === category.id && getTime(expense.date) === time)).reduce((total, expense) => total + expense.cost, 0),
            svg: {
                fill: category.color,
            },
            key: category.id,
            arc: { cornerRadius: 7,  }
            }))
    
    const total = expenses
                    .filter(expense => getTime(expense.date) === time)
                    .reduce((total, expense) => total + expense.cost, 0)

    return <View>
                <SText fontSize={22}>This month</SText>
                <View>
                    <PieChart style={{ height: 200, marginTop: 10}} innerRadius='70%' labelRadius='10px' padAngle={.04} data={pieData} />
                    <View style={{position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <SText fontSize={35}>{total}</SText>
                    </View>
                </View>
            </View>
}