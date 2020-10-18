import React from 'react'
import { TouchableOpacity } from 'react-native'
import SText from './SText'

export default ({text, action}) => (
    <TouchableOpacity onPress={action} style={{backgroundColor:'#47f', borderRadius: 5, marginVertical: 5}}><SText fontSize={25} style={{textAlign:'center', padding: 8}}>{text}</SText></TouchableOpacity>
)