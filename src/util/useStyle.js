import { useColorScheme } from 'react-native-appearance'
import { Platform } from 'react-native'

const dark = {
  backgroundColor: '#111',
  foregroundColor: '#333',
  interfaceColor: '#333',
  primaryColor: "rgb(10, 132, 255)",
  secondaryColor: '#f80',
  errorColor: '#ff453a',
  text: 'white',
  lightText: '#aaa'
}

const light = {
  backgroundColor: 'rgb(242, 242, 242)',
  foregroundColor: 'white',
  interfaceColor: '#999',
  primaryColor: "rgb(0, 122, 255)",
  secondaryColor: '#f80',
  errorColor: '#ff453a',
  text: 'black',
  lightText: '#666'
}

function getNavigationTheme(theme, isDark) {
  return {
    dark: isDark,
    colors: {
      primary: theme.primaryColor,
      background: theme.backgroundColor,
      card: theme.foregroundColor,
      text: theme.text,
      border: isDark ? "rgb(39, 39, 41)" : "rgb(216, 216, 216)",
    }
  }
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
    themeMode,
    navigationTheme: getNavigationTheme(theme, themeMode == 'Dark')
  }
}