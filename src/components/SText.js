import React from 'react'
import {Text} from 'react-native'

export default props => (
    <Text {...props} style={{ fontSize: props.fontSize || 17, fontFamily: 'Arial Rounded MT Bold', color: props.color || 'white', ...props.style}}>{props.children}</Text>
)