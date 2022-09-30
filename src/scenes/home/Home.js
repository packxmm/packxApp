import React, { useEffect, useState } from 'react'
import { View, Text, StatusBar ,SafeAreaView, ScrollView, Image, TouchableOpacity , useColorScheme} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles'
import { firebase } from '../../firebase/config'
import { Calendar } from 'react-native-calendars';
import Lists from '../../components/Lists'

export default function Home(props) {
  // console.log(props.route)
  const userData = props.user; 
  const [tripsData, setTripsData] = useState([]);  
  const [token, setToken] = useState('')
  const scheme = useColorScheme()

  const ListItem = ({ data },index) => {
    return(
      <Lists key={index} data={data} />
    )
  };
  
  useEffect(() => {
    const tokenRef = firebase.firestore().collection('tokens')
      tokenRef
      .doc(userData.id)
      .get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            const data = doc.data()
            setToken(data)
        } else {
            console.log("No such document!");
        }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
      const tripsRef = firebase.firestore().collection('trips')
      tripsRef
      .where('facilityId', '==', userData.id) 
      .get().then((querySnapshot) => {
        const dataArr = [];
        querySnapshot.forEach(doc => { 
          const data = doc.data();
          dataArr.push(data);   
        })  
        setTripsData(dataArr); 
      }).catch((error) => {
          console.log("Error getting document:", error);
      });  
    
      console.log(tripsData)
  }, []);


  return (
    <View style={[styles.container , {paddingTop: StatusBar.currentHeight}]}>
      <StatusBar barStyle= { scheme.dark ? "light-content" : "dark-content" }/>
      <ScrollView>
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() =>  props.navigation.navigate('CreateFacility')} style={styles.createBtn}>
              <Ionicons name="add-circle-outline" size={35}/>
              <Text style={styles.text}>
                Create New Trip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.amountDue} onPress={() =>  props.navigation.navigate('TotalAmount', {tripInfo : tripsData})}>
              <View>
                <Text style={{fontSize: 18}}> Amount Due </Text>
                <Text style={styles.priceLabel}> $ 453.00 </Text>
              </View>
              <View>
                <Image source={require('../../../assets/images/sm-logo.png')} style={{ width: 38,resizeMode: 'center', height: 31}}/>
                <Ionicons name="arrow-forward-outline" size={30} style={{marginTop: 20}}/>
              </View>
            </TouchableOpacity>
            <Calendar
              style={styles.facilityCalendar}
              current={'2022-06-01'}
              minDate={'2021-12-31'}
              maxDate={'2022-12-31'}
              onDayPress={day => {
                console.log('selected day', day);
              }}
              onDayLongPress={day => {
                console.log('selected day', day);
              }}
              monthFormat={'MMMM yyyy'}
              onMonthChange={month => {
                console.log('month changed', month);
              }}hideExtraDays={true}
              disableMonthChange={true}
              firstDay={1}
              onPressArrowLeft={subtractMonth => subtractMonth()}
              onPressArrowRight={addMonth => addMonth()}
              disableAllTouchEventsForDisabledDays={true}
              enableSwipeMonths={true}
            />
            <View>
            {tripsData.map((trip, index) => (
              <View key={index}> 
                <Text style={styles.header}> Trip Activity - {new Date(trip.timestamp).toLocaleDateString("en-US", { month: 'short' })} {new Date(trip.timestamp).toLocaleDateString("en-US", { day: 'numeric'})} {new Date(trip.timestamp).toLocaleDateString("en-US", { year: 'numeric'})}</Text>  
                <Lists data={trip} key={index}/>
            </View>
            ))} 
            </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}