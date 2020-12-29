import React, { useContext } from 'react'
import analytics from '@react-native-firebase/analytics'
import { useNavigation } from '@react-navigation/native'
import { Cell, Section, TableView } from 'react-native-tableview-simple'
import { Alert, ScrollView } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import dataContext from './dataContext'
import useStyle from './util/useStyle'
import CurrencySelector from './components/CurrrencySelector'
import SPageContainer from './components/SPageContainer'
import SText from './components/SText'

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
              separatorColor: '#3a3a3a',
              body: '#FFF',
              primary: '#0f64ee',
              secondary: '#aeaeae',
            },
        }
      }}
    >
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
      <Cell title='Light' accessory={theme == 'Light' ? 'Checkmark' : null} onPress={() => setTheme('Light')} image={<SText>🌕</SText>} />
      <Cell title='Dark' accessory={theme == 'Dark' ? 'Checkmark' : null} onPress={() => setTheme('Dark')} image={<SText>🌑</SText>} />
      <Cell title='System' accessory={theme == 'System' ? 'Checkmark' : null} onPress={() => setTheme('System')} image={<SText>🌗</SText>} />
    </Section>
  )
}

function Account() {
  const {signout, deleteAccount} = useContext(dataContext)
  const navigation = useNavigation()

  function handleSignout() {
    signout()
    analytics().logEvent('Signout')
  }

  function handleDeleteAccount() {
    Alert.alert(
      'Warning',
      'This action will delete all data and is irreversible.',
      [
        {
          text: 'Delete account',
          onPress: deleteAccount,
          style: 'destructive'
        },
        {
          text: "Cancel",
          style: "cancel"
        },
      ]
    )
  }

  return (
    <Section header='Account'>
      <Cell title='Subscription' onPress={() => navigation.navigate('Subscription')} image={<SText>🏡</SText>} />
      <Cell title='Change password' onPress={() => navigation.navigate('Resetpassword')} image={<SText>🔓</SText>} />
      <Cell title='Sign out' onPress={handleSignout} image={<SText>👋</SText>} />
      <Cell title='Delete account' onPress={handleDeleteAccount} image={<SText>🗑</SText>} />
    </Section>
  )
}

function More() {
  return (
    <Section header='More'>
      <Cell 
        title='Cashflux website' 
        onPress={() =>
          WebBrowser.openBrowserAsync('https://cashflux.simonfrisk.com')
        }
        image={<SText>🌎</SText>}
      />
      <Cell 
        title='Privacy Policy' 
        onPress={() =>
          WebBrowser.openBrowserAsync('https://cashflux.simonfrisk.com/privacypolicy')
        }
        image={<SText>🔐</SText>}  
      />
      <Cell
        title='Contact and support'
        onPress={() =>
          WebBrowser.openBrowserAsync('https://cashflux.simonfrisk.com/contact')
        }
        image={<SText>📨</SText>}    
      />
    </Section>
  )
}