import React, { useState } from 'react'
import { View } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import SColorPicker from './SColorPicker'
import SText from './SText'
import STextField from './STextField'
import SEmojiPicker from './SEmojiPicker'
import SButton from './SButton'
import useStyle from '../util/useStyle'
import CategoryIcon from './CategoryIcon'

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
      <View style={{justifyContent: 'center', height: 150, alignItems: 'center'}}>
        <CategoryIcon color={color} emoji={emoji} size={100} />
      </View>
      <STextField placeholder='Name' value={name} onChangeText={setName} icon={<Entypo name="pencil" />} />
      <SColorPicker color={color} setColor={setColor} />
      <SEmojiPicker emoji={emoji} setEmoji={setEmoji} />
      {!!error && <SText color={style.errorColor}>{error}</SText>}
      <SButton text={submitText} action={handleSubmit} />
    </View>
  )
}