import React from 'react'
import { FlatList, View, Dimensions } from 'react-native'
import SText from './components/SText'
import { PieChart, StackedBarChart } from 'react-native-svg-charts'

export default function Charts({categories, expenses}) {
    const components = [ExpensePie, ExpenseBars]

    return <FlatList
                data={components}
                renderItem={data => <View style={{width: Dimensions.get('window').width - 40}}>
                        <data.item categories={categories} expenses={expenses} />
                    </View>}
                horizontal={true}
                pagingEnabled={true}
                style={{padding: 10}}
            />
            
}

function ExpensePie({categories, expenses}) {
    // Page for Expense pie chart
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

function ExpenseBars({categories, expenses}) {
    
    function barData() {
        const barData = []
        const numWeeks = 6;
        const object = categories.reduce((obj, c) => {
            obj[c.name] = 1
            return obj
        }, {})
        for (let i = 0; i < numWeeks; i++)
            barData.push({...object})
        expenses.forEach(expense => {
            const index = Math.floor((Date.now() - new Date(expense.date)) / (1000 * 3600 * 24 * 7))
            if(index >= numWeeks || isNaN(index)) return
            barData[index][expense.category.name] += expense.cost
        })
        return barData
    }

    return <StackedBarChart
            style={{ height: 200 }}
            keys={categories.map(c => c.name)}
            colors={categories.map(c => c.color)}
            data={barData()}
            contentInset={{ top: 30, bottom: 30, left: 10, right: 10 }}
        />
}