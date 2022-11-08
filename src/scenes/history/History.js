import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, Platform, SafeAreaView, StatusBar} from 'react-native'; 
import styles from './styles'
import { firebase } from '../../firebase/config'
import Icon from 'react-native-vector-icons/Ionicons'; 
import Spinner from 'react-native-loading-spinner-overlay' 
import moment from 'moment';

export default function History({ route, navigation }) {
  const userData = route.params.userData;
  const [tripData, setTripData] = useState([]);
  const [packageData, setPackagesData] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{flex:1, flexDirection: 'row', paddingLeft: 15, paddingTop: Platform.OS === 'android' ? 10 : 0}} onPress={() => navigation.goBack()}>
          <Icon style={{color: "#1B9494"}} name={"arrow-back-circle-sharp"} size={35} />
          <Text style={{color: "#c8c8c8", paddingLeft: 5, marginTop: 7, fontSize: 17}}>Back To Profile</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const onRefresh = React.useCallback(() => {
    try { 
      getData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => { 
    getData()
  },[])

  const getData = () => { 
    setSpinner(true); 
    const packageRef = firebase.firestore().collection('package')
    const tripRef = firebase.firestore().collection('trips')
    tripRef
      .get().then((querySnapshot) => {
        const dataArr = [];
        querySnapshot.forEach(doc => { 
          const data = doc.data();
          dataArr.push(data);    
        })  
        setTripData(dataArr);  
      }).catch((error) => {
          console.log("Error getting document:", error);
      });   
      packageRef
      .where('trackingStatus', '==', "Checkout") 
      .get().then((querySnapshot) => {
        const packDataArr = [];
        querySnapshot.forEach(doc => { 
          let data = doc.data(); 
          packDataArr.push(data);   
        })  
        setPackagesData(packDataArr)
        setSpinner(false); 
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  }
  // console.log(packageData)
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}> 
    <StatusBar animated={true} backgroundColor="#FAFAFA" barStyle="dark-content"/> 
      <Text style={styles.header}> TRANSACTION HISTORY </Text> 
      {packageData.map((item, index) => (
        <TouchableOpacity style={[styles.item]} key={index} onPress={() => navigation.navigate('HistoryDetails', { user: userData, package: item , trip: tripData})}>
          <View style={{alignContent: "center"}}>  
            <Icon style={{color: "#1B9494"}} name={"receipt-outline"} size={25} />
          </View> 
          <View style={{flex: 3, marginLeft: 15}}>
            <Text style={[styles.title]}>E-Receipt </Text>  
            <Text style={[styles.text, {marginTop: "5%"}]}>Package ID - {item.id.slice(0,8)} </Text> 
            {tripData.filter((data) => data.tripId === item.tripId).map((trip , tripIndex) => (
              <View style={{flexDirection: "row" ,justifyContent: 'space-between', marginTop: "2%"}} key={tripIndex}>
                <View style={{flex: 2}}>
                  <Text style={styles.triplabel}>From</Text>
                  <Text style={styles.tripname}>{trip.tripInfo.dropOff}</Text> 
                </View> 
                <View style={{flex: 2}}>
                  <Text style={styles.triplabel}>To</Text>
                  <Text style={styles.tripname}>{trip.tripInfo.desVal}</Text> 
                </View>
              </View>
            ))}
          </View>
          <View style={{flexDirection: "row" ,alignContent: "center", paddingTop: "2%"}}>
              <Text style={styles.date}>{moment(new Date(item.timestamp)).format("MMM Do YYYY")}</Text> 
              <Icon style={{color: "#085252"}} name={"chevron-forward"} size={25} />
          </View>
        </TouchableOpacity>
      ))} 
      </ScrollView>
      <Spinner
        visible={spinner}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </SafeAreaView>
  )
}