import React, { useContext, useEffect, useState } from 'react'
import functions from '@react-native-firebase/functions'
import SText from './components/SText'
import IAP from 'react-native-iap'
import { Linking, Platform, TouchableOpacity, View } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import useStyle from './util/useStyle'
import SButton from './components/SButton'
import SPageContainer from './components/SPageContainer'
import STextButton from './components/STextButton'
import dataContext from './dataContext'

export const boundary = 25

const productIds = Platform.select({
  ios: [
    'com.cashflux.1monthstandardsubscription',
    'com.cashflux.1yearstandardsubscription',
  ]
})

function goToStoreSubscriptionPage() {
  if(Platform.OS == 'ios')
    Linking.openURL('https://apps.apple.com/account/subscriptions')
  //TODO: Add android
}

export default function Subscription() {
  const style = useStyle()
  const {subscription: storedSubscription} = useContext(dataContext)

  useEffect(init, [])
  const [subscriptions, setSubscriptions] = useState([])

  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  function init() {
    IAP.flushFailedPurchasesCachedAsPendingAndroid()
    IAP.getSubscriptions(productIds)
      .then(subscriptions => setSubscriptions(subscriptions))
    
    const purchaseUpdateListener = IAP.purchaseUpdatedListener(async purchase => {
      const receipt = purchase.transactionReceipt
      if(receipt) {
        await IAP.finishTransaction(purchase, false)
        const response = await functions().httpsCallable('validateIOSIAP')({ receipt })
        if(!response.data.success)
          setError(response.data.error)
      } else {
        setError('Failed to process subscription')
      }
      setProcessing(false)
    })

    const purchaseErrorSubscription = IAP.purchaseErrorListener(() => {
      setError('Failed to process subcription')
      setProcessing(false)
    })

    return () => {
      purchaseUpdateListener.remove()
      purchaseErrorSubscription.remove()
    }
  }
  
  return (
    <SPageContainer>
      {!storedSubscription && (
        <View style={{paddingHorizontal: 40, height: 500, justifyContent: 'center'}}>
          <SText fontSize={45} style={{marginBottom: 10}}>Expense Tracking Redefined</SText>
          <SText color={style.lightText}>Premium subscription gives you unlimited access. Leveling up your personal economy.</SText>
          <SButton text='Get Premium' />
          <SText style={{marginTop: 20}} fontSize={10} color={style.lightText}>
            Free accounts are limited to {boundary} expenses
          </SText>
        </View>
      )}
      <View>
        <SText fontSize={35}>Plans</SText>
        {!!error && (
          <SText color={style.errorColor}>{error}</SText>
        )}
        <View>
          {subscriptions.map(subscription => (
            <View key={subscription.productId} style={{marginVertical: 10}}>
              <TouchableOpacity
                style={{
                  padding: 15,
                  borderWidth: (storedSubscription == subscription.productId) ? 3 : 1,
                  borderColor: (storedSubscription == subscription.productId) ? style.primaryColor : style.light,
                  borderRadius: 15,
                  alignItems: 'center',
                }}
                onPress={() => {
                  if(processing)
                    return
                  else if(storedSubscription)
                    goToStoreSubscriptionPage()
                  else
                    IAP.requestSubscription(subscription.productId); setProcessing(true); setError('')}
                }
              >
                <SText fontSize={10} color={style.lightText}>{subscription.description}</SText>
                <SText fontSize={12}>{subscription.title}</SText>
                <SText fontSize={25}>{subscription.localizedPrice}</SText>
              </TouchableOpacity>
              {storedSubscription == subscription.productId && (
                <SText fontSize={12}>Currently active</SText>
              )}
            </View>
          ))}
        </View>
        {storedSubscription && (
          <SButton
            text='Manage Subscription'
            action={goToStoreSubscriptionPage}
          />
        )}
        <SText fontSize={35}>Terms</SText>
        <SText color={style.lightText} fontSize={11}>
          Your payment will be charged your iTunes account once you confirm purchase. Your iTunes account will be charged again when the
          subscription renews at the end of the subscription period unless auto renew is turned off at least 24 hours before the end of the
          current period. You can manage your auto renew in your Apple Id Account Settings any time after purchase. No cancellation of the current
          subscription is allowed during active subscription period.
        </SText>
        <STextButton text='Privacy policy' action={() => WebBrowser.openBrowserAsync('https://cashflux.simonfrisk.com/privacypolicy')} />
        <STextButton text='End user license agreement' action={() => WebBrowser.openBrowserAsync('https://cashflux.simonfrisk.com/eula')} />
      </View>
    </SPageContainer>
  )
}