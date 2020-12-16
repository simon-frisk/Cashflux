import React from 'react'
import { TextInput } from "react-native"
import useStyle from '../util/useStyle'

export default props => {
  const style = useStyle()

  return <TextInput 
    {...props} 
    style={{
      backgroundColor: '#eee', 
      padding: 8, 
      borderRadius: 9,
      fontSize: 16,
      color: '#333',
      fontFamily: style.font,
      marginVertical: 5,
      ...props.style
    }}
    placeholderTextColor='#aaa'
    clearButtonMode='while-editing'
    keyboardAppearance='dark'
  />
}