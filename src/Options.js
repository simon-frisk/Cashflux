import React, { useContext, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import SText from './components/SText'
import { Octicons } from '@expo/vector-icons'
import SModal from './components/SModal'
import dataContext from './dataContext'
import * as WebBrowser from 'expo-web-browser'
import SSelectionSlider from './components/SSelectionSlider'

const currencies = ['kr', '$', '£', '€', '¥', 'CHf']

export default () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <TouchableOpacity onPress={() => setShowModal(true)} style={{position: 'absolute', top: 0, right: 0, padding: 10, margin: 30, zIndex: 10}}>
        <Octicons
          name="gear"
          size={30}
          color="white"
        />
      </TouchableOpacity>
      <SModal show={showModal} close={() => setShowModal(false)} title='Options'>
        <CurrencySelector />
        <SText fontSize={30}>More</SText>
        <SText>For privacy policy and support, visit {' '}
          <SText
            color='#47f'
            onPress={() =>
              WebBrowser.openBrowserAsync('https://cashflux.simonfrisk.com')
            }
          >cashflux website</SText>
        </SText>
      </SModal>
    </>
  )
}

function CurrencySelector() {
  const {currency, setCurrency} = useContext(dataContext)

  return (
    <>
      <SText fontSize={28}>Currency</SText>
      <SSelectionSlider
        items={currencies}
        selected={currency}
        setSelected={setCurrency}
        keyExtractor={currency => currency}
        textExtractor={currency => currency}
        boxStyle={{paddingHorizontal: 10}}
      />
    </>
  )
}