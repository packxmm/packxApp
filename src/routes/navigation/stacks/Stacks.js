import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'; 
import Login from '../../../scenes/login'
import Registration from '../../../scenes/registration'
import Intro from '../../../scenes/intro/intro' 
import FacilityCreate from '../../../scenes/facility/FacilityCreate'
import FacilityCategoryCreate from '../../../scenes/facility/FacilityCategoryCreate';
import Profile from '../../../scenes/profile'
import Detail from '../../../scenes/details'
import Home from '../../../scenes/home'; 
import PackageLists from '../../../scenes/package';

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
      <Stack.Screen name="Login" component={Login} options={{title: ''}}/>
      <Stack.Screen name="Registration" component={Registration} options={{title: ''}}/>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export const FacilityNavigator= (props) => {
  const user = props.user
  const navigationProps = props.navigationProps;
  return (
    <Stack.Navigator headerMode="screen" screenOptions={navigationProps}> 
      <Stack.Screen name="CreateFacility" options={{title: ''}}>
        {props => <FacilityCreate {...props} extraData={user} navigationProps={navigationProps}/>}
      </Stack.Screen>
      <Stack.Screen name="CreateCategory" options={{title: ''}}>
        {props => <FacilityCategoryCreate {...props} extraData={user}  navigationProps={navigationProps}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export const TripsNavigator = (props) => {
  const user = props.user 
  const navigationProps = props.navigationProps
  return (
    <Stack.Navigator headerMode="screen" screenOptions={navigationProps}>
      { user.type === "facility" && (
          <Stack.Screen name="Trips" options={{headerShown: false}}>
            {props => <Trips {...props} extraData={user}/>}
          </Stack.Screen> 
      )} 
    </Stack.Navigator>
  )
}

export const PackageNavigator = (props) => {
  const user = props.user
  const navigationProps = props.navigationProps
  return (
    <Stack.Navigator headerMode="screen" screenOptions={navigationProps}>
      <Stack.Screen name="Package" options={{headerShown: false}}>
        {props => <PackageLists {...props} extraData={user}/>}
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