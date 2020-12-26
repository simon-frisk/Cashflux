import React from 'react'
import { View } from 'react-native'
import useStyle from '../util/useStyle'

export default function SBottomBar({children}) {
  const style = useStyle()

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 30,
        paddingHorizontal: 30,
        paddingTop: 10,
        backgroundColor: style.backgroundColor,
        borderTopWidth: .3,
        borderTopColor: style.lightText
      }}
    >
      {children}
    </View>
  )
}