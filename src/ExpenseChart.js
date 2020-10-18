import React from 'react'
import { PieChart } from 'react-native-svg-charts'

export default function ExpenseChart({categories, expenses}) {
 
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