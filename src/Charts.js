import React from 'react'
import { FlatList, View, Dimensions } from 'react-native'
import SText from './components/SText'
import { PieChart, StackedBarChart } from 'react-native-svg-charts'

export default function Charts({categories, expenses}) {

    const totalCost = expenses.reduce((total, expense) => total + expense.cost, 0)
    if(totalCost == 0)
        return <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <SText fontSize={20}>No expenses added</SText>
                </View>

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
    const pieData = categories
        .map(category => ({
            value: expenses.filter(expense => expense.category.id == category.id).reduce((total, expense) => total + expense.cost, 0),
            svg: {
                fill: category.color,
            },
            key: category.id,
            arc: { cornerRadius: 7,  }
            }))

    return <PieChart style={{ height: 200}} innerRadius='70%' labelRadius='10px' padAngle={.04} data={pieData} />
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
            console.log(expense, index)
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