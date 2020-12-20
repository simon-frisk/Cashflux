import React, { useState } from 'react'
import { View } from 'react-native'
import SColorPicker from './SColorPicker'
import SText from './SText'
import STextField from './STextField'
import SEmojiPicker from './SEmojiPicker'
import SButton from './SButton'
import useStyle from '../util/useStyle'

export default function CategoryForm({
  name, setName,
  emoji, setEmoji,
  color, setColor,
  submit, submitText,
}) {
  const style = useStyle()
  const [error, setError] = useState('')

  function handleSubmit() {
    if(name == '') {
      setError('Name not specified')
      return
    }
    if(emoji == '') {
      setError('Emoji not specified')
      return
    }
    if(!color) {
      setError('Color not specified')
      return
    }
    submit()
    setError('')
  }

  return (
    <View>
      <View style={{
        backgroundColor: style.foregroundColor,
        padding: 15,
        borderRadius: 15,
        marginVertical: 10
      }}>
        <STextField placeholder='Name' value={name} onChangeText={setName} />
        <SEmojiPicker emoji={emoji} setEmoji={setEmoji} />
        <SColorPicker color={color} setColor={setColor} />
      </View>
      {!!error && <SText color={style.errorColor}>{error}</SText>}
      <SButton text={submitText} action={handleSubmit} />
    </View>
  )
}