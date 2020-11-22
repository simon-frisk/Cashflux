import React from 'react'
import { Modal, ScrollView, View } from "react-native";

export default function SModal({show, children}) {
  return (
    <Modal
      animationType='slide'
      presentationStyle='formSheet'
      visible={show}
    >
        <ScrollView 
          style={{backgroundColor: '#111'}}
          contentContainerStyle={{paddingVertical: 40, paddingHorizontal: 20}}>
            <View>
              {children}
            </View>
        </ScrollView>
    </Modal>
  )
}