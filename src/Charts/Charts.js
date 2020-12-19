import React, { useContext, useState } from 'react'
import { Dimensions, ScrollView, View, Image } from 'react-native'
import SText from '../components/SText'
import dataContext from '../dataContext'
import Barchart from './Barchart'
import Piechart from './Piechart'
import ExpenseSnake from './ExpenseSnake'
import useStyle from '../util/useStyle'

export default function Charts() {
    const components = [Piechart, Barchart, ExpenseSnake]
    const {expenses} = useContext(dataContext)
    const [currentIndex, setCurrentIndex] = useState(0)
    const style = useStyle()
    const width = Dimensions.get('window').width - 30

    if(expenses.length == 0)
        return (
            <View style={{height: 220, paddingTop: 40, alignItems: 'center', justifyContent: 'center'}}>
                <SText>Add an expense to view charts</SText>
            </View>
        )
    
    return (
        <View>
            <ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onScroll={event => setCurrentIndex(Math.round(event.nativeEvent.contentOffset.x / width))}
                scrollEventThrottle={16}
            >
                {components.map((Component, index) => (
                    <Component width={width} active={index == currentIndex} key={index} />
                ))}
            </ScrollView>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                {components.map((_, index) => (
                    <View
                        key={index}
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: index == currentIndex ? style.text : style.interfaceColor,
                            margin: 5
                        }}
                    />
                ))}
            </View>
        </View>
    )
}