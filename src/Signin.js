import React, { useContext, useState } from 'react'
import analytics from '@react-native-firebase/analytics'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SButton from './components/SButton'
import SPageContainer from './components/SPageContainer'
import SText from './components/SText'
import STextField from './components/STextField'
import dataContext from './dataContext'
import useStyle from './util/useStyle'
import { TouchableOpacity } from 'react-native'

export default function Signin({navigation}) {
  const style = useStyle()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const {signinemail} = useContext(dataContext)

  async function submit() {
    const result = await signinemail(email, password)
    if(result) setError(result)
    else {
      analytics().logLogin({method: 'email'})
    }
  }

  return (
    <SPageContainer>
      <STextField placeholder='email' value={email} onChangeText={setEmail} autoCapitalize='none' keyboardType='email-address' icon={<MaterialIcons name="email" />} />
      <STextField placeholder='password' value={password} onChangeText={setPassword} secureTextEntry={true} icon={<FontAwesome name="user-secret" />} />
      {!!error && <SText color={style.errorColor}>{error}</SText>}
      <SButton text='Sign in' action={submit} />
      <TouchableOpacity onPress={() => navigation.navigate('Resetpassword')}>
        <SText color={style.primaryColor}>I forgot my password</SText>
      </TouchableOpacity>
    </SPageContainer>
  )
}