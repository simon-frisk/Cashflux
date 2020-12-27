import React from 'react'
import { SafeAreaView, View } from 'react-native'
import useStyle from '../util/useStyle'

export default function SBottomBar({children}) {
  const style = useStyle()

  return (
    <SafeAreaView 
      style={{
        flex: 1, 
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: style.backgroundColor,
        borderTopWidth: 1,
        borderTopColor: style.light,
        
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 30,
          paddingVertical: 10,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  )
}