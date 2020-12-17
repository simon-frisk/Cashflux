import React from 'react'
import { ScrollView } from "react-native"
import useStyle from "../util/useStyle"

export default function SPageContainer(props) {
  const style = useStyle()
  
  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 40,
        paddingHorizontal: 15
      }}
    >
      {props.children}
    </ScrollView>
  )
}