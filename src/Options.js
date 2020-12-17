import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import SText from './components/SText'
import STextField from './components/STextField'
import dataContext from './dataContext'
import * as WebBrowser from 'expo-web-browser'
import SSelectionSlider from './components/SSelectionSlider'
import SButton from './components/SButton'
import useStyle from './util/useStyle'
import SPageContainer from './components/SPageContainer'

const currencies = ['kr', '$', '£', '€', '¥', 'CHf']

export default function Options() {
  const style = useStyle()

  return (
    <SPageContainer>
      <CurrencySelector />
      <ThemeSelector />
      <Account />
      <SText fontSize={35}>More</SText>
      <SText>For privacy policy and support, visit {' '}
        <SText
          color={style.primaryColor}
          onPress={() =>
            WebBrowser.openBrowserAsync('https://cashflux.simonfrisk.com')
          }
        >cashflux website</SText>
      </SText>
    </SPageContainer>
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

function ThemeSelector() {
  const { theme, setTheme } = useContext(dataContext)
  
  return (
    <>
      <SText fontSize={35}>Theme</SText>
      <SSelectionSlider
        items={['System', 'Light', 'Dark']}
        selected={theme}
        setSelected={setTheme}
        keyExtractor={theme => theme}
        textExtractor={theme => theme}
      />
    </>
  )
}

function Account() {
  const {user, signout} = useContext(dataContext)

  return (
    <View>
      <SText fontSize={35}>Account</SText>
      {user.isAnonymous === false ? (
        <>
          <SText>Signed in {user.email}</SText>
          <SButton text='Signout' action={signout} />
        </>
      ) : (
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
  const {linkemail} = useContext(dataContext)
  const style = useStyle()

  async function submit() {
    const result = await linkemail(email, password)
    setError(result)
  }

  return (
    <View>
      <SText fontSize={25}>Sign up</SText>
      <STextField placeholder='email' value={email} onChangeText={setEmail} autoCapitalize='none' />
      <STextField placeholder='password' value={password} onChangeText={setPassword} secureTextEntry={true} />
      {!!error && <SText color={style.errorColor}>{error}</SText>}
      <SButton text='Sign up' action={submit} />
    </View>
  )
}

function Signinform() {
  const style = useStyle()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const {signinemail} = useContext(dataContext)

  async function submit() {
    const result = await signinemail(email, password)
    setError(result)
  }

  return (
    <View>
      <SText fontSize={25}>Sign in</SText>
      <STextField placeholder='email' value={email} onChangeText={setEmail} autoCapitalize='none' />
      <STextField placeholder='password' value={password} onChangeText={setPassword} secureTextEntry={true} />
      {!!error && <SText color={style.errorColor}>{error}</SText>}
      <SButton text='Sign in' action={submit} />
    </View>
  )
}