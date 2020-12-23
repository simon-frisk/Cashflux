import React, { useContext } from 'react'
import * as Analytics from 'expo-firebase-analytics'
import { Cell, Section, TableView } from 'react-native-tableview-simple'
import { View, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as WebBrowser from 'expo-web-browser'
import dataContext from './dataContext'
import useStyle from './util/useStyle'
import CurrencySelector from './components/CurrrencySelector'
import SPageContainer from './components/SPageContainer'

export default function Options() {
  const style = useStyle()

  return (
    <ScrollView>
      <SPageContainer><CurrencySelector /></SPageContainer>
      <TableView appearance={style.themeMode == 'Dark' ? 'dark' : 'light'}>
        <ThemeSelector />
        <Account />
        <More />
      </TableView>
    </ScrollView>
  )
}

function ThemeSelector() {
  const { theme, setTheme } = useContext(dataContext)

  return (
    <Section header='Theme'>
      <Cell title='Light' accessory={theme == 'Light' ? 'Checkmark' : null} onPress={() => setTheme('Light')} />
      <Cell title='Dark' accessory={theme == 'Dark' ? 'Checkmark' : null} onPress={() => setTheme('Dark')} />
      <Cell title='System' accessory={theme == 'System' ? 'Checkmark' : null} onPress={() => setTheme('System')} />
    </Section>
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
        {user.isAnonymous === false ? (
          <Section header='Account'>
            <Cell title='Sign out' onPress={handleSignout} />
        </Section>
        ) : (
          <Section header='Account'>
            <Cell title='Sign in' onPress={() => navigation.navigate('Signin')} />
            <Cell title='Sign up' onPress={() => navigation.navigate('Signup')} />
          </Section>
        )}
    </View>
  )
}

function More() {
  return (
    <Section header='More'>
      <Cell title='Cashflux website' onPress={() =>
        WebBrowser.openBrowserAsync('https://cashflux.simonfrisk.com')
      } />
      <Cell title='Privacy Policy' onPress={() =>
        WebBrowser.openBrowserAsync('https://cashflux.simonfrisk.com/privacypolicy')
      } />
      <Cell title='Contact and suport' onPress={() =>
        WebBrowser.openBrowserAsync('https://cashflux.simonfrisk.com/contact')
      } />
    </Section>
  )
}