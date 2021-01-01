import React, { useEffect, useState, useContext } from 'react'
import { Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SButton from './components/SButton'
import SPageContainer from './components/SPageContainer'
import SText from './components/SText'
import analytics from '@react-native-firebase/analytics'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import STextField from './components/STextField'
import dataContext from './dataContext'
import useStyle from './util/useStyle'

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
  const style = useStyle()

  return (
    <SPageContainer>
      <SText fontSize={37} style={{marginTop: '40%'}}>Sign up</SText>
      <Signup />
      <SText fontSize={25} style={{marginTop: 25}}>Already have an account?</SText>
      <SButton text='Sign in' action={() => navigation.navigate('Signin')} style={{backgroundColor: style.interfaceColor}} />
    </SPageContainer>
  )
}

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const {signupemail} = useContext(dataContext)
  const style = useStyle()

  async function submit() {
    const result = await signupemail(email, password)
    if(result) setError(result)
    else {
      analytics().logSignUp({method: 'email'})
    }
  }

  return (
    <>
      <STextField placeholder='email' value={email} onChangeText={setEmail} autoCapitalize='none' keyboardType='email-address' icon={<MaterialIcons name="email" />} />
      <STextField placeholder='password' value={password} onChangeText={setPassword} secureTextEntry={true} icon={<FontAwesome name="user-secret" />} />
      {!!error && <SText color={style.errorColor}>{error}</SText>}
      <SButton text='Sign up' action={submit} />
    </>
  )
}