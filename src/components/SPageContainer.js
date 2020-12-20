import React from 'react'
import { ScrollView } from "react-native"
import useStyle from "../util/useStyle"

export default function SPageContainer(props) {
  const style = useStyle()
  
  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 40,
        paddingHorizontal: 15,
        ...props.style
      }}
    >
      {props.children}
    </ScrollView>
  )
}