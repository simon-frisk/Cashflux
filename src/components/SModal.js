import React from 'react'
import { Modal, View } from "react-native";

export default function SModal({show, children}) {
  return (
    <Modal
      animationType='slide'
      presentationStyle='formSheet'
      visible={show}
    >
        <View 
          style={{backgroundColor: '#111', flex: 1, paddingVertical: 40, paddingHorizontal: 20}}>
            <View>
              {children}
            </View>
        </View>
    </Modal>
  )
}