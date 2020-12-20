import React, {useRef} from 'react'
import STextField from './STextField'

export default function EmojiPicker({emoji, setEmoji}) {
  const ref = useRef()

  return (
    <STextField
      maxLength={2}
      ref={ref}
      value={emoji}
      placeholder='Emoji'
      onChangeText={newText => {
        setEmoji(newText)
        if(newText.length == 2)
          ref.current.blur()
      }}
      style={{
        width: 70,
        textAlign: 'center'
      }}
    />
  )
}