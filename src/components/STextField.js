import React from 'react'
import { TextInput } from "react-native"
import useStyle from '../util/useStyle'

export default props => {
  const style = useStyle()

  return <TextInput 
    {...props} 
    style={{
      backgroundColor: style.themeMode == 'Dark' ? '#eee' : '#ccc', 
      padding: 8, 
      borderRadius: 9,
      fontSize: 16,
      color: '#333',
      ...style.font,
      marginVertical: 5,
      ...props.style
    }}
    placeholderTextColor={style.themeMode == 'Dark' ? '#aaa' : '#888'}
    clearButtonMode='while-editing'
    keyboardAppearance='dark'
  />
}