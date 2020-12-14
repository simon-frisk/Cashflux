import React, { useContext, useState } from 'react'
import { Dimensions, ScrollView, View } from 'react-native'
import SText from './components/SText'
import { PieChart } from 'react-native-svg-charts'
import dataContext from './dataContext'
import { getMonthlyExpenses, getMonthlyCategories } from './util/DateTools'
import SSelectionSlider from './components/SSelectionSlider'

export default function Charts() {
    const components = [ExpensePie, BarChart]
    
    return (
        <View style={{marginBottom: 15}}>
            <ScrollView
                horizontal={true}
                pagingEnabled={true}
                style={{height: 300}}
                showsHorizontalScrollIndicator={false}
                bounces={false}
            >
                {components.map(Component => (
                    <View style={{width: Dimensions.get('window').width - 30}} key={components.indexOf(Component)}>
                        <Component />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

function ExpensePie() {
    // Expense pie chart
    const {expenses, categories, currency} = useContext(dataContext)
    const [monthIndex, setMonthIndex] = useState(0)

    const monthlyCategories = getMonthlyCategories(expenses)
    
    const pieData = categories
        .map(category => ({
            value: monthlyCategories[monthIndex][category.id] || 0,
            svg: {
                fill: category.color,
            },
            key: category.id,
            arc: { cornerRadius: 100,  }
        }))
    
    return (
        <View>
            <View>
                <PieChart style={{ height: 220, marginVertical: 15 }} innerRadius='70%' padAngle={.07} data={pieData} />
                <View style={{position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <SText fontSize={30}>{monthlyCategories[monthIndex].total}{currency}</SText>
                </View>
            </View>
            <SSelectionSlider
                items={monthlyCategories}
                selected={monthlyCategories[monthIndex]}
                setSelected={month => setMonthIndex(monthlyCategories.indexOf(month))}
                keyExtractor={month => month.string}
                textExtractor={month => month.string}
                selectColor='#47f'
            />
        </View>
    )
}

function BarChart() {
    const {expenses, categories, currency} = useContext(dataContext)

    const monthlyCategories = getMonthlyCategories(expenses)
    const highestMonth = Math.max(...monthlyCategories.map(category => category.total))

    if(!highestMonth) return (
        <View style={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
            <SText>Add expenses to see barchart</SText>
        </View>
    )
    
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            bounces={false}
        >
            {monthlyCategories.map(month => {
                return (
                    <View style={{marginHorizontal: 6, justifyContent: 'flex-end'}} key={month.string}>
                        <>
                            <SText fontSize={15}>{month.total}{currency}</SText>
                            {categories.map(category => {
                                const current = month[category.id] || 0
                                const height = current / highestMonth * 220
                                if(height < 5) return
                                else return (
                                    <View 
                                        style={{
                                            width: 50, 
                                            height, 
                                            backgroundColor: category.color, 
                                            marginVertical: 2, 
                                            borderRadius: 5,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        key={month.string + category.id.toString()}
                                    >
                                        {height > 25 && <SText>{category.emoji}</SText>}
                                    </View>
                                )
                            })}
                            <SText fontSize={25}>{month.string}</SText>
                        </>
                    </View>
                )
            })}
        </ScrollView>
    )
}