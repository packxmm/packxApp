import React from 'react'
import { createStackNavigator } from '@react-navigation/stack' ; 
import { NavigationContainer } from '@react-navigation/native' 
import Login from '../../../scenes/login'
import Registration from '../../../scenes/registration'
import Intro from '../../../scenes/intro/intro'
import Home from '../../../scenes/home' 
import FacilityCreate from '../../../scenes/facility/FacilityCreate'
import FacilityCategoryCreate from '../../../scenes/facility/FacilityCategoryCreate';
import Profile from '../../../scenes/profile'
import Detail from '../../../scenes/details'
import TabNavigator from '../tabs';

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator()

// ------------------------------------
// Navigators
// ------------------------------------

export const LoginNavigator = (props) => {
  const navigationProps = props.navigationProps
  return (
    <Stack.Navigator headerMode="screen" screenOptions={navigationProps}> 
      <Stack.Screen name="Intro" component={Intro} options={{headerShown: false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="Registration" component={Registration} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export const FacilityNavigator= (props) => {
  const user = props.user
  const navigationProps = props.navigationProps;
  return (
    <Stack.Navigator headerMode="screen" screenOptions={navigationProps}> 
      <Stack.Screen name="CreateFacility">
        {props => <FacilityCreate {...props} extraData={user}/>}
      </Stack.Screen>
      <Stack.Screen name="CreateCategory">
        {props => <FacilityCategoryCreate {...props} extraData={user}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export const HomeNavigator = (props) => {
  const user = props.user
  const navigationProps = props.navigationProps;
  return ( 
    <Stack.Navigator headerMode="screen" screenOptions={navigationProps}>
        <Stack.Screen name="Home" options={{headerShown: false}}>
          {props => <Home {...props} extraData={user}/>}
        </Stack.Screen>
      <Stack.Screen name="CreateFacility"  options={{headerShown: false}}>
        {props => <FacilityNavigator {...props} extraData={user}/>}
      </Stack.Screen>
  </Stack.Navigator>
  )
}

export const ProfileNavigator = (props) => {
  const user = props.user
  const navigationProps = props.navigationProps
  return (
    <Stack.Navigator headerMode="screen" screenOptions={navigationProps}>
      <Stack.Screen name="Profile" options={{headerShown: false}}>
        {props => <Profile {...props} extraData={user}/>}
      </Stack.Screen>
      <Stack.Screen name="Detail" options={{headerShown: false}}>
        {props => <Detail {...props} extraData={user}/>}
      </Stack.Screen>
    </Stack.Navigator>
  )
}