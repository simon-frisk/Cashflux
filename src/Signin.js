import React, { useContext, useState } from 'react'
import SButton from './components/SButton'
import SPageContainer from './components/SPageContainer'
import SText from './components/SText'
import STextField from './components/STextField'
import dataContext from './dataContext'
import useStyle from './util/useStyle'

export default function Signin({navigation}) {
  const style = useStyle()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const {signinemail} = useContext(dataContext)

  async function submit() {
    const result = await signinemail(email, password)
    if(result) setError(result)
    else navigation.goBack()
  }

  return (
    <SPageContainer>
      <STextField placeholder='email' value={email} onChangeText={setEmail} autoCapitalize='none' />
      <STextField placeholder='password' value={password} onChangeText={setPassword} secureTextEntry={true} />
      {!!error && <SText color={style.errorColor}>{error}</SText>}
      <SButton text='Sign in' action={submit} />
    </SPageContainer>
  )
}