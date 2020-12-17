import React from 'react'
import {Text} from 'react-native'
import useStyle from '../util/useStyle'

export default props => {
    const style = useStyle()

    return (
        <Text
            {...props}
            style={{
                fontSize: props.fontSize || 17,
                ...style.font,
                color: props.color || style.text,
                ...props.style
            }}
        >
                {props.children}
        </Text>
    )
}