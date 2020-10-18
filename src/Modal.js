import React from 'react'
import {Modal} from 'react-native'
import SText from './components/SText'

export default ({isOpen, setIsOpen, children}) => {

    return (
        <Modal
            visible={isOpen}
            presentationStyle='formSheet'
            onRequestClose={() => setIsOpen(false)}
        >
            <SText>{children}</SText>
        </Modal>
    )
}