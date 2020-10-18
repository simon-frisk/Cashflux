import React from 'react'
import { View } from 'react-native'
import SText from './components/SText'
import { PieChart } from 'react-native-svg-charts'

export default function ExpenseChart({categories, expenses}) {

        if(expenses.reduce((total, expense) => total + expense.cost, 0) == 0) {
            return <View style={{height: 200, alignItems: 'center', justifyContent: 'center'}}><SText fontSize={20}>No expenses added</SText></View>
        }

        const pieData = categories
            .map(category => ({
                value: expenses.filter(expense => expense.category.id == category.id).reduce((total, expense) => total + expense.cost, 0),
                svg: {
                    fill: category.color,
                    onPress: () => console.log('press'),
                },
                key: category.id,
                arc: { cornerRadius: 7,  }
            }))

        return <PieChart style={{ height: 200 }} innerRadius='70%' labelRadius='10px' padAngle={.04} data={pieData} />
}