import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { firebase } from '../../firebase/config'
import { NavigationContainer } from '@react-navigation/native' 
import { LoginNavigator } from './stacks'
import TabNavigator from './tabs'
import {decode, encode} from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const navigationProps = {
    headerTintColor: 'white',
    headerTitleStyle: { fontSize: 18 },
  }

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .onSnapshot(function(document) {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  }
  
  return(
    <NavigationContainer>
      { user ? (
          <TabNavigator user={user} navigationProps={navigationProps}/>
        ) : (
          <LoginNavigator  navigationProps={navigationProps}/>
      )}
    </NavigationContainer>
  )
}
