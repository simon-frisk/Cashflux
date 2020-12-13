import React, { useContext, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import SText from './components/SText'
import { Octicons } from '@expo/vector-icons'
import SModal from './components/SModal'
import STextField from './components/STextField'
import dataContext from './dataContext'
import * as WebBrowser from 'expo-web-browser'
import SSelectionSlider from './components/SSelectionSlider'
import SButton from './components/SButton'

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
        <Account />
        <SText fontSize={35}>More</SText>
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
      <SText fontSize={35}>Currency</SText>
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

function Account() {
  const {user, signOutUser} = useContext(dataContext)

  return (
    <View>
      <SText fontSize={35}>Account</SText>
      {!!user && (
        <>
          <SText>Signed in as {user.user.email}</SText>
          <SButton text='Signout' action={signOutUser} />
        </>
      )}
      {! user && (
        <>
          <SText>Create or log in to and account to save your data and sync it across devices</SText>
          <View>
            <Signupform />
            <Signinform />
          </View>
        </>
      )}
    </View>
  )
}

function Signupform() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const {signupwithemailandpassword} = useContext(dataContext)

  async function submit() {
    const result = await signupwithemailandpassword(email, password)
    setError(result)
  }

  return (
    <View>
      <SText fontSize={25}>Sign up</SText>
      <STextField placeholder='email' value={email} onChangeText={setEmail} autoCapitalize='none' />
      <STextField placeholder='password' value={password} onChangeText={setPassword} secureTextEntry={true} />
      {!!error && <SText color='red'>{error}</SText>}
      <SButton text='Sign up' action={submit} />
    </View>
  )
}

function Signinform() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const {signinwithemailandpassword} = useContext(dataContext)

  async function submit() {
    const result = await signinwithemailandpassword(email, password)
    setError(result)
  }

  return (
    <View>
      <SText fontSize={25}>Sign in</SText>
      <STextField placeholder='email' value={email} onChangeText={setEmail} autoCapitalize='none' />
      <STextField placeholder='password' value={password} onChangeText={setPassword} secureTextEntry={true} />
      {!!error && <SText color='red'>{error}</SText>}
      <SButton text='Sign in' action={submit} />
    </View>
  )
}