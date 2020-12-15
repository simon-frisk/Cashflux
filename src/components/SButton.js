import React from 'react'
import { TouchableOpacity } from 'react-native'
import SText from './SText'

export default ({text, action, ...props}) => (
    <TouchableOpacity onPress={action} style={{backgroundColor:'#47f', borderRadius: 15, marginVertical: 5, padding: 7, ...props.style}}><SText fontSize={20} style={{textAlign:'center'}}>{text}</SText></TouchableOpacity>
)