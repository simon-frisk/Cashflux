import React from 'react'
import { TextInput, View } from "react-native"
import useStyle from '../util/useStyle'

export default React.forwardRef((props, ref) => {
  const style = useStyle()

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: style.themeMode == 'Dark' ? style.foregroundColor : '#ddd', 
        padding: 8, 
        borderRadius: 9,
        marginVertical: 5,
        ...props.style
      }}
    >
      {props.icon && <props.icon.type {...props.icon.props} size={22} color={style.lightText} style={{marginRight: 5}} />}
      <TextInput 
        placeholderTextColor={style.lightText}
        clearButtonMode='while-editing'
        keyboardAppearance='dark'
        {...props} 
        style={{
          flex: 1,
          fontSize: 16,
          color: style.text,
          ...style.font,
        }}
        ref={ref}
      />
    </View>
  )
  })