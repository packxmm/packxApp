import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { firebase } from '../../firebase/config'
import { colors } from 'theme'
import {Text, TouchableOpacity, Image, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import * as Notifications from 'expo-notifications'
import { DefaultTheme, DarkTheme } from '@react-navigation/native' 
import { FacilityNavigator, HomeNavigator, LoginNavigator } from './stacks'
import TabNavigator from './tabs'
import {decode, encode} from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const scheme = useColorScheme()

  const navigationProps = {
    headerTintColor: 'white'
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

   (async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    await firebase.firestore().collection("tokens").doc(user.id).set({ token: token.data, email: user.id })
  })();

  if (loading) {
    return (
      <></>
    )
  }

  return(
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      { user ? (
          <TabNavigator user={user} navigationProps={navigationProps}/>
        ) : (
          <LoginNavigator navigationProps={navigationProps}/>
      )}
    </NavigationContainer>
  )
}