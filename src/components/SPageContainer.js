import React from 'react'
import { ScrollView } from "react-native"

export default function SPageContainer(props) {
  //Container for whole page
  
  return (
      <ScrollView
        contentContainerStyle={{
          width: '92%',
          alignSelf: 'center',
          paddingTop: 30,
          paddingBottom: 60,
          maxWidth: 600,
          ...props.style
        }}
      >
        {props.children}
      </ScrollView>
  )
}