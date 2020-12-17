import React from 'react'
import { TouchableOpacity } from 'react-native'
import useStyle from '../util/useStyle'
import SText from './SText'

export default ({text, action, ...props}) => {
    const style = useStyle()

    return (
        <TouchableOpacity 
        onPress={action} 
        style={{
            backgroundColor:style.primaryColor, 
            borderRadius: 15, 
            marginVertical: 5, 
            padding: 7,
            ...props.style
        }}>
            <SText fontSize={20} style={{textAlign:'center'}} color='white'>
                {text}
            </SText>
        </TouchableOpacity>
    )
}