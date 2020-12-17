import { useColorScheme } from 'react-native-appearance'
import { Platform } from 'react-native'

const dark = {
  backgroundColor: '#111',
  foregroundColor: '#333',
  interfaceColor: '#333',
  primaryColor: '#47f',
  secondaryColor: '#f80',
  errorColor: '#ff453a',
  text: 'white',
  lightText: '#aaa'
}

const light = {
  backgroundColor: '#eee',
  foregroundColor: 'white',
  interfaceColor: '#999',
  primaryColor: '#36e',
  secondaryColor: '#f80',
  errorColor: '#ff453a',
  text: 'black',
  lightText: '#666'
}

let modeState = 'System'

export default function useStyle(mode) {
  if(mode) modeState = mode
  const systemThemeMode = useColorScheme()
  const themeMode = modeState == 'System'
    ? systemThemeMode == 'dark' ? 'Dark' : 'Light'
    : modeState
  const theme = themeMode == 'Dark' ? dark : light

  const font = Platform.select({
    ios: { fontFamily: 'Arial Rounded MT Bold' },
    android: { fontFamily: 'Roboto' },
  })

  return {
    font,
    ...theme,
    themeMode
  }
}