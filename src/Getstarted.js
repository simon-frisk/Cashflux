import React, { useEffect, useState} from 'react'
import { Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SButton from './components/SButton'
import SPageContainer from './components/SPageContainer'
import SText from './components/SText'
import CategoryScroller from './components/CategoryScroller'
import CurrencySelector from './components/CurrrencySelector'

export default function GetStarted() {
  const [intro, setIntro] = useState(true)

  if(intro) return <Intro onDone={() => setIntro(false)} />
  else return <Account />
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


function Account() {
  const navigation = useNavigation()

  return (
    <SPageContainer>
      <SText fontSize={35}>Account</SText>
      <SButton 
        text='Sign up' 
        action={() => navigation.navigate('Signup')}
      />
      <SButton 
        text='Sign in' 
        action={() => navigation.navigate('Signin')}
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