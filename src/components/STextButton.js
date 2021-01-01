import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import SText from './SText'
import useStyle from '../util/useStyle'


export default function STextButton(props) {
  const style = useStyle()

  return (
    <TouchableOpacity onPress={props.action}>
      <View style={{flexDirection: 'row', alignItems:'center'}}>
        {props.icon && <props.icon.type {...props.icon.props} size={20} color={props.color || style.primaryColor} />}
        <SText
          color={props.color || style.primaryColor}
          fontSize={20}
          style={{marginLeft: 5}}
        >{props.text}</SText>
      </View>
    </TouchableOpacity>
  )
}