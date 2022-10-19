import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image, Platform} from 'react-native'; 
import styles from './styles'
import { firebase } from '../../firebase/config'
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay'    

export default function HistoryDetails({ route, navigation }) {
  const userData = route.params.user;
  const packageData = route.params.package; 
  const tripData = route.params.trip;
  const [currency, setCurrency] = useState("$");
  const [weight, setWeight] = useState("lb");
  const [userInfo, setUserInfo] = useState(null);
  const [spinner, setSpinner] = useState(true);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{flex:1, flexDirection: 'row', paddingLeft: 15, paddingTop: Platform.OS === 'android' ? 10 : 0}} onPress={() => navigation.goBack()}>
          <Icon style={{color: "#1B9494"}} name={"arrow-back-circle-sharp"} size={35} />
          <Text style={{color: "#c8c8c8", paddingLeft: 5, marginTop: 7, fontSize: 17}}>Back to Transaction History</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  useEffect(() => { 
    console.log(tripData)
    console.log(packageData.tripId)
    tripData.filter((data) => data.tripId === packageData.tripId).map((trip) => {
      setCurrency(trip.categoryLists[0].currency);
      setWeight(trip.categoryLists[0].weight); 
    })
    const usersRef = firebase.firestore().collection('users')
    usersRef
      .doc(packageData.userId)
      .get()
      .then(firestoreDocument => {
        if (!firestoreDocument.exists) {
          console.log("User does not exist anymore.")
          return;
        }else{
          setUserInfo(firestoreDocument.data());
          setSpinner(false); 
        }
      })
      .catch(error => {
        alert(error)
        setSpinner(false); 
      });
  },[])
  // console.log(userInfo)
  return (
    <ScrollView>
    <View style={styles.container}> 
      <Text style={styles.header}> E-Receipt </Text> 
        <View style={[styles.item]}>
          <View style={{alignContent: "center"}}>  
            <Icon style={{color: "#085252"}} name={"ios-document-text"} size={20} />
          </View> 
          <View style={{flex: 3, marginLeft: 10}}>
            <Text style={[styles.title]}>Package ID - {packageData.id.slice(0,8)}</Text>  
          </View>
          <View style={{flexDirection: "row" ,alignContent: "center"}}>
              <Text style={styles.date}>{new Date(packageData.timestamp).toLocaleDateString("en-US", { day: 'numeric'})} {new Date(packageData.timestamp).toLocaleDateString("en-US", { month: 'short' })} {new Date(packageData.timestamp).toLocaleDateString("en-US", { year: 'numeric'})}</Text> 
          </View>
        </View>  
        {tripData.filter((data) => data.tripId === packageData.tripId).map((trip,index) => (
          <View style={styles.tripItem} key={index}>
            <Text style={styles.tripTitle}> TRIP - {trip.tripId.slice(0,8)}</Text>
            <View style={styles.tripList}>
              <View style={{flex: 2}}>
                <Text style={styles.triplabel}>From</Text>
                <Text style={styles.tripname}>{trip.tripInfo.dropOff}</Text> 
                <Text style={styles.datelabel}>{new Date(trip.tripInfo.dropOffDate).toLocaleDateString("en-US", { month: 'short' })} {new Date(trip.tripInfo.dropOffDate).toLocaleDateString("en-US", { day: 'numeric'})} {new Date(trip.tripInfo.dropOffDate).toLocaleDateString("en-US", { year: 'numeric'})}</Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center'}}>  
                <Image source={require('../../../assets/images/stopFlight.png')} style={{ width: 43, height: 50}}/>  
              </View>
              <View style={{flex: 2}}>
                <Text style={styles.triplabel}>To</Text>
                <Text style={styles.tripname}>{trip.tripInfo.desVal}</Text> 
                <Text style={styles.datelabel}>{new Date(trip.tripInfo.pickUpDate).toLocaleDateString("en-US", { month: 'short' })} {new Date(trip.tripInfo.pickUpDate).toLocaleDateString("en-US", { day: 'numeric'})} {new Date(trip.tripInfo.pickUpDate).toLocaleDateString("en-US", { year: 'numeric'})}</Text>
              </View>
            </View> 
          </View>
        ))} 

        <View style={{ flex: 2, flexDirection: "column", marginTop: "5%" }}>   
            <Text style={styles.mainText}>SHIPMENT COST</Text> 
            <View style={styles.itemHeader} > 
              <Text style={[styles.itemTitle, {flex: 4}]}>Item Description</Text>
              <Text style={[styles.itemTitle, {flex: 1, textAlign: 'right'}]}>Qty</Text>
              <Text style={[styles.itemTitle, {flex: 2, textAlign: 'right'}]}>Wgt</Text>
              <Text style={[styles.itemTitle, {flex: 3, textAlign: 'center'}]}>$</Text>
            </View>   
                <ScrollView>
                  {packageData.items.map((data, index) => (
                    <View style={styles.itemRow} key={index}>
                      <Text style={[styles.deslabel, {flex: 4}]}> {data.item}</Text>  
                      <Text style={[styles.deslabel, {flex: 1, textAlign: 'right'}]}> {data.qty} x </Text>  
                      <Text style={[styles.deslabel, {flex: 2, textAlign: 'right'}]}> {data.wgt ? data.wgt : "-" } {weight}</Text>  
                      <Text style={[styles.deslabel, {flex: 3, textAlign: 'right'}]}> {data.price ? data.price : "-" } {currency}</Text>  
                    </View>
                  ))}
              </ScrollView>  

              <View style={styles.itemRow}>
                <Text style={[styles.deslabel, {flex: 1}]}></Text>  
                <Text style={[styles.deslabel, {flex: 1}]}></Text>  
                <Text style={[styles.tripname, {flex: 4, textAlign: "right", fontSize: 14}]}> Total Amount </Text>  
                <Text style={[styles.tripname, {flex: 2, textAlign: "right", fontSize: 14}]}> {packageData.total ? packageData.total : "-" } {currency}</Text>  
              </View>
        </View> 
        {userInfo !== null && (
          <View style={styles.tripItem}> 
            <Text style={styles.tripTitle}>Sender Information</Text> 
            <Text style={[styles.userId, {flex: 1}]}>User ID : {userInfo.id.slice(0,8)}</Text> 
            <View style={{flexDirection: "row", marginVertical: 5}}> 
              <Text style={[styles.deslabel, {flex: 1}]}>Name :</Text> 
              <Text style={[styles.tripname, {flex: 3, paddingTop: 5}]}>{userInfo.fullName}</Text> 
            </View>
            <View style={{flexDirection: "row", marginVertical: 5}}> 
              <Text style={[styles.deslabel, {flex: 1}]}>Phone :</Text> 
              <Text style={[styles.tripname, {flex: 3, paddingTop: 5}]}>{userInfo.phone}</Text> 
            </View>
            <View style={{flexDirection: "row", marginVertical: 5}}> 
              <Text style={[styles.deslabel, {flex: 1}]}>Address :</Text> 
              <Text style={[styles.tripname, {flex: 3, paddingTop: 5}]}>{userInfo.address}</Text> 
            </View>
          </View>
        )}
        <View style={styles.tripItem}> 
          <Text style={styles.tripTitle}>Receiver Information</Text> 
          <View style={{flexDirection: "row", marginVertical: 5}}> 
            <Text style={[styles.deslabel, {flex: 1}]}>Name :</Text> 
            <Text style={[styles.tripname, {flex: 3, paddingTop: 5}]}>{packageData.recName}</Text> 
          </View>
          <View style={{flexDirection: "row", marginVertical: 5}}> 
            <Text style={[styles.deslabel, {flex: 1}]}>Phone :</Text> 
            <Text style={[styles.tripname, {flex: 3, paddingTop: 5}]}>{packageData.recContact}</Text> 
          </View>
        </View>
    </View>
    <Spinner
      visible={spinner}
      textStyle={{ color: "#fff" }}
      overlayColor="rgba(0,0,0,0.5)"
    />
    </ScrollView>
  )
}