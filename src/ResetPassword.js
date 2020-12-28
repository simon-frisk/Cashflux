import React, {useState} from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import auth from '@react-native-firebase/auth'
import STextField from './components/STextField'
import SButton from './components/SButton'
import SPageContainer from './components/SPageContainer'

export default function ResetPassword({navigation}) {
  const [email, setEmail] = useState('')

  return (
    <SPageContainer>
      <STextField placeholder='email' value={email} onChangeText={setEmail} autoCapitalize='none' keyboardType='email-address' icon={<MaterialIcons name="email" />} />
      <SButton
        text='Reset password'
        action={() => {
          auth().sendPasswordResetEmail(email)
          navigation.goBack()
        }}
      />
    </SPageContainer>
  )
}