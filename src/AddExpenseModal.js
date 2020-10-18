import React, { useState } from 'react'
import {Modal, Alert} from 'react-native'
import SText from './SText'

export default () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <Modal
            visible={isModalOpen}
            presentationStyle='formSheet'
            onRequestClose={() => setIsModalOpen(false)}
        >
            <SText>Hello</SText>
        </Modal>
    )
}