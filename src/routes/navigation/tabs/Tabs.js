import React from 'react'; 
import { createStackNavigator } from '@react-navigation/stack' ; 
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, StatusBar, View, Button ,TouchableOpacity, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from 'theme'; 
import Home from '../../../scenes/home' 
// stack navigators
import { FacilityNavigator, ProfileNavigator } from '../stacks' 

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator() 

const HomeTabs = (props) => {
  console.log(props)
  const user = props.user
  const navigationProps = props.navigationProps
  return (
      <Tab.Navigator
        screenOptions={({ route , navigation}) => ({
          tabBarIcon: ({focused, color, size }) => {
            let iconName;
            if (route.name === 'HOME') {
              iconName = 'home-outline';
            } else if (route.name === 'ORDER') {
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
         <Tab.Screen name="HOME" 
          children={()=> <Home {...props} extraData={user} navigationProps={navigationProps}/>}
          options={{headerShown: false, title:  ''}} /> 
        <Tab.Screen
          name="PROFILE"
          children={()=> <ProfileNavigator user={user} navigationProps={navigationProps}/>}
          options={{headerShown: false, title:  ''}}
        /> 
      </Tab.Navigator>
  ); 
}
 
const TabNavigator = (props) => {
  console.log(props)
  const user = props.user
  const navigationProps = props.navigationProps
  return ( 
    <NavigationContainer independent={true}>
      <Stack.Navigator>   
        <Stack.Screen name="Home" options={{headerShown: false}}>
            {props => <HomeTabs {...props} user={user}/>}
          </Stack.Screen> 
          <Stack.Screen name="CreateFacility"  options={{headerShown: false}}>
            {props => <FacilityNavigator {...props} user={user}/>}
          </Stack.Screen> 
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default TabNavigator
