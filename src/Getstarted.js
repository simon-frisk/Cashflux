import React, { useContext, useEffect, useState} from 'react'
import { View, Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SButton from './components/SButton'
import SPageContainer from './components/SPageContainer'
import SText from './components/SText'
import CategoryScroller from './components/CategoryScroller'
import dataContext from './dataContext'
import useStyle from './util/useStyle'
import CurrencySelector from './components/CurrrencySelector'

export default function GetStarted() {
  const [stage, setStage] = useState(0)

  if(stage == 0) return <Intro onDone={() => setStage(1)} />
  else if(stage == 1) return <Account onDone={() => setStage(2)} />
  else return <Settings />
}


function Intro({onDone}) {
  const [opacityAnimation] = useState(new Animated.Value(0))
  const [index, setIndex] = useState(0)
  const [mode, setMode] = useState('in')

  const data = [
    {
      text: 'Welcome to Cashflux!'
    },
    {
      text: "Let's get started!"
    }
  ]

  useEffect(() => {
    Animated.timing(opacityAnimation, {
      toValue: mode == 'in' ? 1 : 0,
      duration: 2000,
      useNativeDriver: true
    }).start()
    setTimeout(() => {
      if(mode == 'out') {
        if(index != data.length - 1) setIndex(index + 1)
        else onDone()
      }
      setMode(mode == 'in' ? 'out' : 'in')
    }, 2200)
  }, [mode])

  return (
    <Animated.View
      style={{
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        opacity: opacityAnimation
      }}
    >
      <SText fontSize={30}>{data[index].text}</SText>
    </Animated.View>
  )
}


function Account({onDone}) {
  const navigation = useNavigation()
  const {user} = useContext(dataContext)
  const style = useStyle()

  useEffect(() => {
    if(user.isAnonymous == false) onDone()
  }, [user])

  return (
    <SPageContainer>
      <SText fontSize={35}>Account</SText>
      <SText>
        Cashflux can be used without an account, but it's recommended to have one
        to sync data between devices and prevent data loss. If you have an account
        from before, sign in to import all data. This can also be done later on
        the options page.
      </SText>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 25}}>
          <SButton 
            text='Sign up' 
            action={() => navigation.navigate('Signup')}
            style={{width: '48%'}}
          />
          <SButton 
            text='Sign in' 
            action={() => navigation.navigate('Signin')}
            style={{width: '48%'}}
          />
        </View>
        <SButton
          text="Continue without account"
          style={{backgroundColor: style.interfaceColor}}
          action={onDone}
        />
    </SPageContainer>
  )
}

function Settings() {
  const navigation = useNavigation()

  return (
    <SPageContainer>
      <SText fontSize={35}>Categories</SText>
      <SText>
        Cashflux uses categories to organize expenses. Create your first ones here!
      </SText>
      <CategoryScroller />
      <CurrencySelector />
      <SButton text='Finish' action={() => navigation.replace('Home')} />
    </SPageContainer>
  )
}