import React from 'react'
import { TextInput } from "react-native"

export default props => {
  return <TextInput 
    {...props} 
    style={{
      backgroundColor: '#eee', 
      padding: 8, 
      borderRadius: 9,
      fontSize: 16,
      color: '#333',
      fontFamily: 'Arial Rounded MT Bold',
      marginVertical: 5,
      ...props.style
    }}
    placeholderTextColor='#aaa'
    clearButtonMode='while-editing'
    keyboardAppearance='dark'
  />
}