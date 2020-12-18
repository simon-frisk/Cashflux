import React, { useContext } from 'react'
import { Dimensions, ScrollView, View, Image } from 'react-native'
import SText from '../components/SText'
import dataContext from '../dataContext'
import Barchart from './Barchart'
import Piechart from './Piechart'
import ChartImage from '../../assets/Charts.png'

export default function Charts() {
    const components = [Piechart, Barchart]
    const {expenses} = useContext(dataContext)

    if(expenses.length == 0)
        return (
            <View style={{height: 150, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={ChartImage} style={{ width: 200, height: 100 }} /> 
                <SText>Add an expense to view charts</SText>
            </View>
        )
    
    return (
        <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            bounces={false}
        >
            {components.map(Component => (
                <Component width={Dimensions.get('window').width - 30} key={components.indexOf(Component)} />
            ))}
        </ScrollView>
    )
}