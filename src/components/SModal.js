import React from 'react'
import { Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import SText from './SText'
import { AntDesign } from '@expo/vector-icons'; 
import useStyle from '../util/useStyle';

export default function SModal({show, close, title, children}) {
  const style = useStyle()

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
                backgroundColor: style.interfaceColor,
                alignItems: 'center',
                justifyContent: 'center',
            }}
            >
              <SText fontSize={20} color='white'>{title}</SText>
              <TouchableOpacity onPress={close} style={{position: 'absolute', right: 20}}>
                <AntDesign name="closecircle" size={22} color={style.lightText} />
              </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
        <ScrollView 
          style={{backgroundColor: style.backgroundColor}}
          contentContainerStyle={{
              paddingTop: 25,
              paddingBottom: 200,
              paddingHorizontal: 15
            }}
          >
            <View>
              {children}
            </View>
        </ScrollView>
    </Modal>
  )
}