import 'react-native-gesture-handler'
import React, { useRef, useContext, useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { enableScreens } from 'react-native-screens'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import * as Analytics from 'expo-firebase-analytics'
import { StatusBar } from 'expo-status-bar'
import useData from './data/useData'
import dataContext from './dataContext'
import Home from './Home/Home'
import useStyle from './util/useStyle'
import Options from './Options'
import Expense from './Expense'
import AddExpense from './AddExpense'
import Category from './Category'
import AddCategory from './AddCategory'
import Signup from './Signup'
import Signin from './Signin'
import Getstarted from './Getstarted'
import EditCategory from './EditCategory'
import shareToShared from './util/shareToShared'

enableScreens()
const Stack = createNativeStackNavigator()

function Main() {
  const {initialLoadDone, user, categories, monthStatistics, currency, theme} = useContext(dataContext)
  const style = useStyle()
  const routeNameRef = useRef()
  const navigationRef = useRef()

  useEffect(() => {
    shareToShared(monthStatistics, categories, currency, style.themeMode)
  }, [monthStatistics, currency, theme])

  if (!initialLoadDone)
    return (
      <View style={{backgroundColor: style.backgroundColor, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    )
  
  return (
    <View style={{backgroundColor: style.backgroundColor, height: '100%'}}>
      <StatusBar style={style.themeMode == 'Dark' ? 'light' : 'dark'} />
      <NavigationContainer
        theme={style.navigationTheme}
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current.getCurrentRoute().name
          Analytics.setCurrentScreen(routeNameRef.current)
        }}
        onStateChange={() => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name
          if (previousRouteName !== currentRouteName)
            Analytics.setCurrentScreen(currentRouteName)
          routeNameRef.current = currentRouteName
        }}
      >
        <Stack.Navigator 
          initialRouteName={
            user.isAnonymous && categories.length == 0
              ? 'Getstarted'
              : 'Home'
          }
          screenOptions={{
            headerTitleStyle: {
              ...style.font
            }
          }}
        >
          <Stack.Screen
            name='Home'
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen name='Options' component={Options} />
          <Stack.Screen name='Expense' component={Expense} />
          <Stack.Screen name='Addexpense' component={AddExpense} options={{title:'Add expense'}} />
          <Stack.Screen name='Category' component={Category} options={({route}) => ({title: categories.find(category => category.id == route.params.category.id).name})} />
          <Stack.Screen name='Addcategory' component={AddCategory} options={{title: 'Add category'}} />
          <Stack.Screen name='Editcategory' component={EditCategory} options={{title: 'Edit category'}} />
          <Stack.Screen name='Signup' component={Signup} />
          <Stack.Screen name='Signin' component={Signin} />
          <Stack.Screen name='Getstarted' component={Getstarted} options={{title: 'Get started', headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

export default function () {
  const data = useData()

  return (
    <dataContext.Provider value={data}>
      <Main />
    </dataContext.Provider>
  )
}