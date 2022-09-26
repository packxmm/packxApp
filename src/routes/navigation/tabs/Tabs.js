import React , {useState, useEffect }from 'react'; 
import { createStackNavigator } from '@react-navigation/stack' ; 
import { NavigationContainer } from '@react-navigation/native'
import {  Text, View, TouchableOpacity, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { firebase } from '../../../firebase/config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from 'theme'; 
import Home from '../../../scenes/home' 
// stack navigators
import { PackageNavigator,  FacilityNavigator, ProfileNavigator } from '../stacks' 
import UserHome from '../../../scenes/home/UserHome';
import TripDetails from '../../../scenes/tripdetails'; 
import TripInfo from '../../../scenes/tripinfo/TripInfo';
import TripReserved from '../../../scenes/tripreserved';
import Trips from '../../../scenes/trips';
import PackageDetails from '../../../scenes/package/PackageDetails';
import TripBooking from '../../../scenes/booked';
import Notification from '../../../scenes/notification';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator() 

const HomeTabs = (props) => {
  const navigationProps = props.navigationProps;
  const user = props.user;
  const [notiData, setNotification] = useState([]);  
  // console.log(user)
  useEffect(() => {    
    const notiRef = firebase.firestore().collection('notification')
    notiRef
      .where('user', '==', user.id) 
      .get().then((querySnapshot) => {
        const dataArr = [];
        querySnapshot.forEach(doc => { 
          let data = doc.data();
          dataArr.push(data);   
        })  
        setNotification(dataArr);
    }).catch((error) => {
        console.log("Error getting document:", error);
    }); 
  }, []);  
  console.log(notiData)
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
                  children={()=> <Home {...props} extraData={user} navigationProps={navigationProps}/>}
                  options={{headerShown: false, title:  ''}} />  
                <Tab.Screen
                  name="TRIPS"
                  children={()=> <Trips {...props} extraData={user} navigationProps={navigationProps}/>}
                  options={{headerShown: false, title:  ''}}  /> 
              </>
            ) : ( 
              <>
                <Tab.Screen name="HOME" 
                  children={()=> <UserHome  {...props} user={user} navigationProps={navigationProps}/>}
                  options={{headerShown: false, title:  ''}} />  
                <Tab.Screen
                    name="PACKAGE"
                    children={()=> <PackageNavigator user={user} navigationProps={navigationProps}/>}
                    options={{headerShown: false, title:  ''}}  /> 
              </>
          )}
          {notiData.length > 0 ? (
            <Tab.Screen
            name="INBOX"
            children={()=> <Notification {...props} noti={notiData}/>}
            options={{headerShown: false, title:  '', tabBarBadge: notiData.length, tabBarBadgeStyle: {backgroundColor: "#085252", color: "#ffffff"}}}  /> )
          : ( 
            <Tab.Screen
            name="INBOX"
            children={()=> <Notification user={user} navigationProps={navigationProps} data={notiData}/>}
            options={{headerShown: false, title:  '',}}  /> 
          )
          }
          <Tab.Screen
          name="PROFILE"
          children={()=> <ProfileNavigator user={user}  navigationProps={navigationProps}/>}
          options={{headerShown: false, title:  ''}}  /> 
      </Tab.Navigator>
  ); 
}
 
const TabNavigator = (props) => {
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
          <Stack.Screen name="TripDetails" options={{title: ''}}>
            {props => <TripDetails {...props} extraData={user}/>}
          </Stack.Screen>
          <Stack.Screen name="Reserved" options={{headerShown: false}} navigationProps={navigationProps}>
            {props => <TripReserved {...props} extraData={user}/>}
          </Stack.Screen> 
          <Stack.Screen name="PackageDetails"  options={{title: ''}} navigationProps={navigationProps}>
            {props => <PackageDetails {...props} extraData={user}/>}
          </Stack.Screen>
          <Stack.Screen name="Booked"  options={{title: ''}} navigationProps={navigationProps}>
            {props => <TripBooking {...props} extraData={user}/>}
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default TabNavigator
