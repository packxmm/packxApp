import React, { useEffect, useState } from 'react' 
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import Feather from 'react-native-vector-icons/Feather';
import { View, SafeAreaView, Text, Image , StatusBar, TouchableOpacity, ScrollView, useColorScheme} from 'react-native'; 
import styles from './styles'
import { firebase } from '../../firebase/config'
import Spinner from 'react-native-loading-spinner-overlay'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Package(props) {
  const userData = props.extraData
  const scheme = useColorScheme()
  const [spinner, setSpinner] = useState(false); 
  const [packageData, setPackageData] = useState([]) 
  const [tripData, setTripData] = useState([]) 
  // console.log(props.route)
  const goDetail = () => {
    props.navigation.navigate('Detail', { userData: userData })
  }

  useEffect(() => {   
    setSpinner(true);
    firebase.firestore()
      .collection('package') 
      .where('userId', '==', userData.id) 
      .get().then((querySnapshot) => {
        const dataArr = [];
        querySnapshot.forEach(doc => { 
          const data = doc.data();
          dataArr.push(data);   
        })  
        setPackageData(dataArr); 
        setSpinner(false); 
        getData();
    }).catch((error) => {
        console.log("Error getting document:", error);
    });  
  }, []);

  const getData = async () => {
    console.log("getData")
    try {
      const jsonValue = await AsyncStorage.getItem('trips'); 
      if(jsonValue != null){
        setTripData(JSON.parse(jsonValue));
      }
    } catch(error) {
      console.log("Error :", error);
    }
  }
  console.log(tripData.length);
  return (  
    <View style={{ flex: 1 }}>
    <StatusBar barStyle= { scheme === "dark" ? "light-content" : "dark-content" }/>
      <ScrollView>
        <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.mainText}> My Package </Text> 
        </View>
        <View style={styles.itemLists}>
          {packageData.map((item, index) => (
            <TouchableOpacity style={styles.item} key={index} onPress={() => navigation.navigate('OrderDetail', { otherParam: item})}>
              <View style={styles.tripHeader}> 
                <View style={styles.statusBtn}> 
                  <Image source={require('../../../assets/images/tracking.png')} style={{ width: 19,resizeMode: 'center', height: 15, marginTop: "3%"  }}/> 
                  <Text style={styles.statusText}>  {item.trackingStatus}</Text> 
                </View>
                <Text style={styles.title}>TRIP ID - <Text style={styles.numberText}>{item.tripId.slice(0,8)}</Text></Text>
              </View>
                {tripData.filter((data) => data.tripId === item.tripId).map((trip, index) => (
                    <View style={styles.tripList}  key={index}>
                      <View style={{flex: 3}}>
                        <Text style={styles.triplabel}>From</Text>
                        <Text style={styles.tripname}>{trip.tripInfo.dropOff}</Text> 
                        <Text style={styles.dateText}>{trip.tripInfo.dropOffDate}</Text>
                      </View>
                      <View style={{flex: 2, justifyContent: 'center', alignItems:"center"}}>  
                        <Image source={require('../../../assets/images/stopFlight.png')} style={{ width: 43,resizeMode: 'center', height: 40}}/>  
                      </View>
                      <View style={{flex: 3 }}>
                        <Text style={styles.triplabel}>To</Text>
                        <Text style={styles.tripname}>{trip.tripInfo.desVal}</Text> 
                        <Text style={styles.dateText}>{trip.tripInfo.pickUpDate}</Text>
                      </View>
                      <View style={{flex: 1, justifyContent: "center", alignItems:"center" }}>
                        <Ionicons name="md-chevron-forward-outline" size={30} style={{marginLeft: 10, color: '#94A0A0' }}/> 
                      </View>
                  </View> 
                ))} 
            </TouchableOpacity> 
          ))} 
        </View> 
        </SafeAreaView> 
        <Spinner
            visible={spinner}
            textStyle={{ color: "#fff" }}
            overlayColor="rgba(0,0,0,0.5)"
          />
      </ScrollView>
    </View>
  )
}