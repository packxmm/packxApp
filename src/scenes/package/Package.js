import React, { useEffect, useState } from 'react' 
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { View, SafeAreaView, Text, Image , StatusBar, TouchableOpacity, ScrollView, useColorScheme, RefreshControl} from 'react-native'; 
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
  const [refreshing, setRefreshing] = React.useState(false);

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true); 
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
        setRefreshing(false);
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
  // console.log(packageData);
  return (  
    <View style={{ flex: 1 }}>
    <StatusBar barStyle= { scheme === "dark" ? "light-content" : "dark-content" }/>
      <ScrollView>
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.mainText}> My Package </Text> 
        </View>
          {packageData.map((item, index) => ( 
            <View style={styles.itemLists} key={index}>
                {tripData.filter((data) => data.tripId === item.tripId).map((trip, index) => (
                  <TouchableOpacity style={styles.item} key={index} onPress={() => props.navigation.navigate('PackageDetails', { items: item , tripInfo : trip , user : userData})}>
                    <View style={styles.tripHeader}>  
                      {item.trackingStatus === "reserved" && ( 
                        <View style={[styles.statusBtn ,styles.reserved]}> 
                        <Image source={require('../../../assets/images/tracking.png')} style={{ marginTop: "3%"  }}/> 
                          <Text style={[styles.statusText]}> Reserved</Text> 
                        </View> 
                      )}  
                      {item.trackingStatus === "confirmed" && ( 
                        <View style={[styles.statusBtn ,styles.reserved]}> 
                        <Image source={require('../../../assets/images/tracking.png')} style={{ marginTop: "3%"  }}/> 
                          <Text style={[styles.statusText]}> Reserved</Text> 
                        </View> 
                      )}
                      {item.trackingStatus === "received" && ( 
                       <View style={[styles.statusBtn ,styles.received]}> 
                        <Image source={require('../../../assets/images/tracking.png')} style={{ marginTop: "3%"  }}/> 
                          <Text style={[styles.statusText]}>Received</Text> 
                        </View> 
                      )}
                      {item.trackingStatus === "On Route" && ( 
                       <View style={[styles.statusBtn ,styles.onroute]}> 
                        <Image source={require('../../../assets/images/tracking.png')} style={{ marginTop: "3%"  }}/> 
                          <Text style={[styles.statusText, {color: "#ffffff"}]}> On Route </Text> 
                        </View> 
                      )}
                      {item.trackingStatus === "Arrive" && ( 
                       <View style={[styles.statusBtn ,styles.arrive]}> 
                        <Image source={require('../../../assets/images/tracking.png')} style={{ marginTop: "3%"  }}/> 
                          <Text style={[styles.statusText, {color: "#ffffff"}]}> Arrive</Text> 
                        </View> 
                      )}
                      {item.trackingStatus === "Checkout" && ( 
                       <View style={[styles.statusBtn ,styles.arrive]}> 
                        <Image source={require('../../../assets/images/tracking.png')} style={{ marginTop: "3%"  }}/> 
                          <Text style={[styles.statusText, {color: "#ffffff"}]}> Check Out</Text> 
                        </View> 
                      )}
                      <View style={{flex: 2, alignItems: "flex-end", justifyContent: "space-around"}}>
                        <Text style={styles.tripname}>TRIP ID - <Text style={styles.triplabel}>{item.tripId.slice(0,8)}</Text></Text>
                        <Text style={styles.tripname}>Package ID - <Text style={styles.triplabel}>{item.id.slice(0,8)}</Text></Text>
                      </View>
                    </View>
                          <View style={styles.tripList}>
                            <View style={{flex: 3}}>
                              <Text style={styles.triplabel}>From</Text>
                              <Text style={styles.tripname}>{trip.tripInfo.dropOff}</Text> 
                              <Text style={styles.dateText}>{new Date(trip.tripInfo.dropOffDate).toLocaleDateString("en-US", { month: 'short' })} {new Date(trip.tripInfo.dropOffDate).toLocaleDateString("en-US", { day: 'numeric'})} {new Date(trip.tripInfo.dropOffDate).toLocaleDateString("en-US", { year: 'numeric'})}</Text>
                            </View>
                            <View style={{flex: 2, justifyContent: 'center', alignItems:"center"}}>  
                              <Image source={require('../../../assets/images/stopFlight.png')} style={{ width: 43, height: 40}}/>  
                            </View>
                            <View style={{flex: 3 }}>
                              <Text style={styles.triplabel}>To</Text>
                              <Text style={styles.tripname}>{trip.tripInfo.desVal}</Text> 
                              <Text style={styles.dateText}>{new Date(trip.tripInfo.pickUpDate).toLocaleDateString("en-US", { month: 'short' })} {new Date(trip.tripInfo.pickUpDate).toLocaleDateString("en-US", { day: 'numeric'})} {new Date(trip.tripInfo.pickUpDate).toLocaleDateString("en-US", { year: 'numeric'})}</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: "center", alignItems:"center" }}>
                              <Ionicons name="md-chevron-forward-outline" size={30} style={{marginLeft: 10, color: '#94A0A0' }}/> 
                            </View>
                        </View> 
                  </TouchableOpacity> 
                ))} 
            </View> 
          ))} 
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