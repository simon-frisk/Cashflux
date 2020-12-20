import React from 'react'
import { TextInput } from "react-native"
import useStyle from '../util/useStyle'

export default React.forwardRef((props, ref) => {
  const style = useStyle()

  return <TextInput 
  placeholderTextColor={style.themeMode == 'Dark' ? '#aaa' : '#888'}
  clearButtonMode='while-editing'
  keyboardAppearance='dark'
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
    ref={ref}
    />
  })