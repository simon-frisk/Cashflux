import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import SText from './components/SText'
import { PieChart } from 'react-native-svg-charts'
import dataContext from './dataContext'
import {getMonthString, getMonthlyExpenses} from './util/MonthTools'
import SSelectionSlider from './components/SSelectionSlider'

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
            <SSelectionSlider
                items={monthlyExpenses}
                selected={monthlyExpenses[selectedMonthIndex]}
                setSelected={month => setSelectedMonthIndex(monthlyExpenses.indexOf(month))}
                keyExtractor={month => month[0].date}
                textExtractor={month => getMonthString(month[0].date)}
            />
            <View>
                <PieChart style={{ height: 200, marginVertical: 15 }} innerRadius='70%' padAngle={.05} data={pieData} />
                <View style={{position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <SText fontSize={30}>{total}{currency}</SText>
                </View>
            </View>
        </View>
    )
}