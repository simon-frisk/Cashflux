import React from 'react'
import { Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import SText from './SText'
import { AntDesign } from '@expo/vector-icons'; 

export default function SModal({show, close, title, children}) {
  return (
    <Modal
      animationType='slide'
      presentationStyle='pageSheet'
      visible={show}
    >
        <TouchableWithoutFeedback
          onPressOut={close}>
            <View
              style={{
                height: 50,
                width: '100%',
                backgroundColor: '#333',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomColor: '#666',
                borderBottomWidth: .5
            }}
            >
              <SText fontSize={20}>{title}</SText>
              <TouchableOpacity onPress={close} style={{position: 'absolute', right: 20}}>
                <AntDesign name="closecircle" size={20} color="white" />
              </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
        <ScrollView 
          style={{backgroundColor: '#111'}}
          contentContainerStyle={{
              paddingTop: 40,
              paddingBottom: 200,
              paddingHorizontal: 20
            }}
          >
            <View>
              {children}
            </View>
        </ScrollView>
    </Modal>
  )
}