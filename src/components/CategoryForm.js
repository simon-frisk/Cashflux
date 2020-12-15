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
  effect
}) {
  const [error, setError] = useState('')
  
  useEffect(() => {
    if(effect) handleSubmit()
  }, [name, emoji, color])

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
    if(!effect) {
      setName('')
      setEmoji('')
      setColor(null)
    }
    setError('')
  }

  return (
    <View>
      <SColorPicker color={color} setColor={setColor} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <STextField style={{width: '49%'}} placeholder='Name' value={name} onChangeText={setName} />
        <SEmojiPicker style={{width: '49%'}} emoji={emoji} setEmoji={setEmoji} />
      </View>
      {!!error && <SText color='#ff453a'>{error}</SText>}
      {!effect && <SButton text={submitText} action={handleSubmit} />}
    </View>
  )
}