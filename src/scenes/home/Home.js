import React, { useEffect, useState } from 'react'
import { View, Text, StatusBar ,SafeAreaView, ScrollView, Image, TouchableOpacity , useColorScheme} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles'
import { firebase } from '../../firebase/config'
import { Calendar } from 'react-native-calendars';
import Lists from '../../components/Lists'

export default function Home(props) {
  const userData = props.extraData
  const [token, setToken] = useState('')
  const scheme = useColorScheme()
  const tripData = [
    {
      title: "Trip Activity : June 10th 2022",
      data: [
        { tripId : "TRIP NUMBER - 00001",from : "Yangon",to : "NEW YORK", tripStatus: "Drop off"},
        { tripId : "TRIP NUMBER - 00002",from : "Yangon",to : "LOS ANGELES", tripStatus: "Pick-Up"}, 
        { tripId : "TRIP NUMBER - 00003",from : "Yangon",to : "Singapore", tripStatus: "Drop off"}
      ]
    },
    {
      title: "Trip Activity : June 19th 2022",
      data: [
        { tripId : "TRIP NUMBER - 00001",from : "Yangon",to : "NEW YORK", tripStatus: "Drop off"},
        { tripId : "TRIP NUMBER - 00002",from : "Yangon",to : "LOS ANGELES", tripStatus: "Pick-Up"}, 
        { tripId : "TRIP NUMBER - 00003",from : "Yangon",to : "Singapore", tripStatus: "Drop off"}
      ]
    }
  ];

  const ListItem = ({ data },index) => {
    return(
      <Lists key={index} data={data} />
    )
  };
  
  useEffect(() => {
    firebase.firestore()
      .collection('tokens')
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
            <View style={styles.amountDue}>
              <View>
                <Text style={{fontSize: 18}}> Amount Due </Text>
                <Text style={styles.priceLabel}> $ 453.00 </Text>
              </View>
              <View>
                <Image source={require('../../../assets/images/sm-logo.png')} style={{ width: 38,resizeMode: 'center', height: 31}}/>
                <Ionicons name="arrow-forward-outline" size={30} style={{marginTop: 20}}/>
              </View>
            </View>
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
            {tripData.map((item, index) => (
              <View key={index}> 
                <Text style={styles.header}>{item.title}</Text>  
                {item.data.map((data, index) => (
                  <ListItem data={data} key={index}/>
                 ))}
            </View>
            ))} 
            </View>
        </SafeAreaView>
      </ScrollView>
      <View style={{ flex: 1, width: '100%' }}>
        <ScrollView style={styles.main}>
          <Text style={scheme === 'dark' ? styles.darkfield : styles.field}>Mail:</Text>
          <Text style={scheme === 'dark' ? styles.darktitle : styles.title}>{userData.email}</Text>
          <Text style={scheme === 'dark' ? styles.darkfield : styles.field}>Expo push token:</Text>
          <Text style={scheme === 'dark' ? styles.darktitle : styles.title}>{token.token}</Text>
        </ScrollView>
      </View>
    </View>
  )
}