import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function ExpenseChart() {

    return (
        <View style={{marginBottom: 6}}>
            <Svg height={200} width="100%" viewBox="0 0 100 100">
                <Circle cx="50" cy="50" r="40" stroke="orange" strokeWidth="15" />
            </Svg>
        </View>
    )
}