import React from 'react'
import { Dimensions, ScrollView, View } from 'react-native'
import Barchart from './Barchart'
import Piechart from './Piechart'

export default function Charts() {
    const components = [Piechart, Barchart]
    
    return (
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
    )
}