import React, { useContext } from 'react'
import * as Analytics from 'expo-firebase-analytics'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as WebBrowser from 'expo-web-browser'
import dataContext from './dataContext'
import SText from './components/SText'
import SSelectionSlider from './components/SSelectionSlider'
import SButton from './components/SButton'
import SPageContainer from './components/SPageContainer'
import useStyle from './util/useStyle'
import CurrencySelector from './components/CurrrencySelector'

export default function Options() {
  return (
    <SPageContainer>
      <CurrencySelector />
      <ThemeSelector />
      <Account />
      <More />
    </SPageContainer>
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
  const navigation = useNavigation()

  function handleSignout() {
    signout()
    Analytics.logEvent('Signout')
  }

  return (
    <View>
      <SText fontSize={35}>Account</SText>
      {user.isAnonymous === false ? (
        <>
          <SText>Signed in {user.email}</SText>
          <SButton text='Signout' action={handleSignout} />
        </>
      ) : (
        <>
          <SText>Create or log in to an account to save your data and sync it across devices</SText>
          <View style={{flexDirection: 'row'}}>
            <SButton 
              text='Sign up' 
              action={() => navigation.navigate('Signup')}
              style={{marginVertical: 10, marginRight: 10}}
            />
            <SButton 
              text='Sign in' 
              action={() => navigation.navigate('Signin')}
              style={{marginVertical: 10, marginRight: 10}}
            />
          </View>
        </>
      )}
    </View>
  )
}

function More() {
  const style = useStyle()

  return (
    <View>
      <SText fontSize={35}>More</SText>
      <SText>For privacy policy and support, visit {' '}
        <SText
          style={{color: style.primaryColor}}
          onPress={() =>
            WebBrowser.openBrowserAsync('https://cashflux.simonfrisk.com')
          }
        >cashflux website</SText>
      </SText>
    </View>
  )
}