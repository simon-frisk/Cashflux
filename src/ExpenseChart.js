import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import SText from './components/SText'

export default function ExpenseChart() {
    const categories = [{
        name: 'Food',
        value: 110,
        id: 123,
    },
    {
        name: 'Stuff',
        value: 200,
        id: 234,
    },
    {
        name: 'Crap',
        value: 35,
        id: 765,
    }]

    return (
        <>
            <SText fontSize={35}>Expenses</SText>
            <Svg height={200} width="100%" viewBox="0 0 100 100">
                <Circle cx="50" cy="50" r="40" stroke="orange" strokeWidth="10" />
            </Svg>
            {categories.map(category => <SText key={category.id}>{category.name}: {category.value}kr</SText>)}
        </>
    )
}