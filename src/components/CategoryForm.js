import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import SColorPicker from './SColorPicker'
import SText from './SText'
import STextField from './STextField'
import SEmojiPicker from './SEmojiPicker'
import SButton from './SButton'

export default function CategoryForm({
  name, setName,
  emoji, setEmoji,
  color, setColor,
  submit, submitText,
  shouldReset
}) {
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
    if(shouldReset) {
      setName('')
      setEmoji('')
      setColor(null)
    }
    setError(false)
  }

  return (
    <View>
      <SColorPicker color={color} setColor={setColor} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <STextField style={{width: '49%'}} placeholder='Name' value={name} onChangeText={setName} />
        <SEmojiPicker style={{width: '49%'}} emoji={emoji} setEmoji={setEmoji} />
      </View>
      {!!error && <SText color='red'>{error}</SText>}
      <SButton text={submitText} action={handleSubmit} />
    </View>
  )
}