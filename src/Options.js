import React, { useContext } from 'react'
import analytics from '@react-native-firebase/analytics'
import { Cell, Section, TableView } from 'react-native-tableview-simple'
import { ScrollView } from 'react-native'
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
      <TableView appearance={style.themeMode == 'Dark' ? 'Dark' : 'light'} customAppearances={{
        Dark: {
            colors: {
              background: '#1a1a1a',
              muted: '#59595d',
              separatorColor: '#555',
              body: '#FFF',
              primary: '#0f64ee',
              secondary: '#aeaeae',
            },
        }
      }}>
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
  const {signout} = useContext(dataContext)

  function handleSignout() {
    signout()
    analytics().logEvent('Signout')
  }

  return (
    <Section header='Account'>
      <Cell title='Sign out' onPress={handleSignout} />
    </Section>
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