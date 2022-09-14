import React from 'react'; 
import { createStackNavigator } from '@react-navigation/stack' ; 
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, StatusBar, View, Button ,TouchableOpacity, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from 'theme'; 
import Home from '../../../scenes/home' 
// stack navigators
import { TripsNavigator, PackageNavigator,  FacilityNavigator, ProfileNavigator } from '../stacks' 
import UserHome from '../../../scenes/home/UserHome';
import TripInfo from '../../../scenes/tripinfo/TripInfo';
import TripReserved from '../../../scenes/tripreserved';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator() 

const HomeTabs = (props) => {
  const navigationProps = props.navigationProps;
  const user = props.user;
  console.log(props.route)
  return (
      <Tab.Navigator
        screenOptions={({ route , navigation}) => ({
          tabBarIcon: ({focused, color, size }) => {
            let iconName;
            if (route.name === 'HOME') {
              iconName = 'home-outline';
            } else if (route.name === 'TRIPS' || route.name === 'PACKAGE') {
              iconName = 'cube-outline';
            } else if (route.name === 'INBOX') {
              iconName = 'albums-outline';
            } else if (route.name === 'PROFILE') {
              iconName = 'person-outline';
            }
            color = focused ? '#085252' : colors.gray;
            return <View  style={{ marginTop: 15, alignItems: "center" }}>
            <Ionicons name={iconName} size={size} color={color} style={{ paddingTop: 5 }}/>
            <Text style={{fontFamily: "UbuntuMedium",fontSize: 12, color: color, paddingTop: 5 }} color={color}>{route.name} </Text>
            </View>;
          }, 
          tabBarItemStyle:{
            height: 62,
            padding: 10,
            borderRadius: 10 
          },
          tabBarStyle: {
            marginHorizontal : 10,
            marginBottom: 20,
            borderRadius: 10,
            backgroundColor: "#E5F1F2",
            height: 62,
          },
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#085252',
          tabBarActiveBackgroundColor: "#1B9494",
          headerLeft: () => (
            <TouchableOpacity style={{flex:1, flexDirection: 'row'}} onPress={() => navigation.goBack()}>
              <Image source={require('../../../../assets/images/back-arrow.png')} style={{ width: 28,resizeMode: 'center', height: 28, marginLeft: 10, }}/>
              <Text style={{color: "#c8c8c8", paddingLeft: 10, paddingTop: 2, fontSize: 18}}>Back to Home</Text>
            </TouchableOpacity>
          )
        })}
      >
          { user.type === "facility" ? (
              <>
                <Tab.Screen name="HOME" 
                  children={()=> <Home {...props} extraData={user}  navigationProps={navigationProps}/>}
                  options={{headerShown: false, title:  ''}} />  
                <Tab.Screen
                  name="TRIPS"
                  children={()=> <TripsNavigator user={user}  navigationProps={navigationProps}/>}
                  options={{headerShown: false, title:  ''}}  /> 
              </>
            ) : ( 
              <>
                <Tab.Screen name="HOME" 
                  children={()=> <UserHome  {...props} user={user}  navigationProps={navigationProps}/>}
                  options={{headerShown: false, title:  ''}} />  
                <Tab.Screen
                    name="PACKAGE"
                    children={()=> <PackageNavigator user={user}  navigationProps={navigationProps}/>}
                    options={{headerShown: false, title:  ''}}  /> 
              </>
          )}
          <Tab.Screen
          name="INBOX"
          children={()=> <ProfileNavigator user={user}  navigationProps={navigationProps}/>}
          options={{headerShown: false, title:  ''}}  /> 
          <Tab.Screen
          name="PROFILE"
          children={()=> <ProfileNavigator user={user}  navigationProps={navigationProps}/>}
          options={{headerShown: false, title:  ''}}  /> 
      </Tab.Navigator>
  ); 
}
 
const TabNavigator = (props) => {
  console.log(props) 
  const navigationProps = props.navigationProps;
  const user = props.user 
  return ( 
    <NavigationContainer independent={true}>
      <Stack.Navigator>   
        <Stack.Screen name="Home" options={{headerShown: false}} navigationProps={navigationProps}>
            {props => <HomeTabs {...props} user={user} />}
          </Stack.Screen> 
          <Stack.Screen name="CreateFacility"  options={{headerShown: false}} navigationProps={navigationProps}>
            {props => <FacilityNavigator {...props} user={user} />}
          </Stack.Screen> 
          <Stack.Screen name="TripInfo" options={{title: ''}} navigationProps={navigationProps}>
            {props => <TripInfo {...props} user={user}/>}
          </Stack.Screen>  
          <Stack.Screen name="Reserved" options={{headerShown: false}}>
            {props => <TripReserved {...props} extraData={user}/>}
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default TabNavigator
