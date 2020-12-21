import { useColorScheme } from 'react-native-appearance'
import { Platform } from 'react-native'
import { useContext } from 'react'
import dataContext from '../dataContext'

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
  interfaceColor: '#aaa',
  primaryColor: "rgb(0, 122, 255)",
  secondaryColor: '#f80',
  errorColor: '#ff453a',
  text: 'black',
  lightText: '#777'
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

export default function useStyle() {
  const { theme: selectedTheme } = useContext(dataContext)
  const systemThemeMode = useColorScheme()
  const themeMode = selectedTheme == 'System'
    ? systemThemeMode == 'dark' ? 'Dark' : 'Light'
    : selectedTheme
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