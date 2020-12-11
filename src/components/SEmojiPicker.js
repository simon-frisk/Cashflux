import React from 'react'
import STextField from './STextField'

export default function EmojiPicker({emoji, setEmoji, ...props}) {
  return <STextField maxLength={2} placeholder='Emoji' value={emoji} onChangeText={setEmoji} {...props} />
}