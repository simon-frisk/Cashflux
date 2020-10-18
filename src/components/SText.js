import React from 'react'
import {Text} from 'react-native'

export default props => (
    <Text {...props} style={{...props.style, fontSize: props.fontSize || 17, fontFamily: 'Arial Rounded MT Bold', color:'white'}}>{props.children}</Text>
)