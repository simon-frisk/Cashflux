import React, { useContext, useState } from 'react'
import * as Analytics from 'expo-firebase-analytics'
import SButton from './components/SButton'
import SPageContainer from './components/SPageContainer'
import SText from './components/SText'
import STextField from './components/STextField'
import dataContext from './dataContext'
import useStyle from './util/useStyle'

export default function Signup({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const {linkemail} = useContext(dataContext)
  const style = useStyle()

  async function submit() {
    const result = await linkemail(email, password)
    if(result) setError(result)
    else {
      navigation.goBack()
      Analytics.logEvent('Signup')
    }
  }

  return (
    <SPageContainer>
      <STextField placeholder='email' value={email} onChangeText={setEmail} autoCapitalize='none' keyboardType='email-address' />
      <STextField placeholder='password' value={password} onChangeText={setPassword} secureTextEntry={true} />
      {!!error && <SText color={style.errorColor}>{error}</SText>}
      <SButton text='Sign up' action={submit} />
    </SPageContainer>
  )
}