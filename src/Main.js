import 'react-native-gesture-handler';
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { enableScreens } from 'react-native-screens'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { StatusBar } from 'expo-status-bar'
import useData from './data/useData'
import dataContext from './dataContext'
import Home from './Home/Home'
import useStyle from './util/useStyle'
import Options from './Options'
import Expense from './Expense'
import AddExpense from './AddExpense'
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

enableScreens()
const Stack = createNativeStackNavigator();

export default function Main() {
  const data = useData()
  const style = useStyle(data.theme)

  if (!data.initialLoadDone)
    return (
      <View style={{backgroundColor: style.backgroundColor, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    )
  
  return (
    <dataContext.Provider value={data}>
      <StatusBar style={style.themeMode == 'Dark' ? 'light' : 'dark'} />
      <NavigationContainer theme={style.navigationTheme}>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} options={{headerShown: false}} />
          <Stack.Screen name='Options' component={Options} />
          <Stack.Screen name='Expense' component={Expense} />
          <Stack.Screen name='Addexpense' component={AddExpense} options={{title:'Add expense'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </dataContext.Provider>
  )
}
