import React, {  useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image , ScrollView} from 'react-native';
import styles from './PackageDetailsSyles';
import Spinner from 'react-native-loading-spinner-overlay' 
import { firebase } from '../../firebase/config'
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements'

export default function PackageDetails({ route, navigation }) { 
  const [spinner, setSpinner] = useState(false);
  const tripData = route.params.tripInfo;  
  const packageData = route.params.items;  
  const currency = tripData.categoryLists[0].currency;
  const weight = tripData.categoryLists[0].weight;
  const [tripCount, setTripCount] = useState(0);  
  const [packageCount, setPackageCount] = useState(0); 
  const [facilityInfo, setfacilityInfo] = useState({});

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{flex:1, flexDirection: 'row', paddingLeft: 15}} onPress={() => navigation.goBack()}>
          <Icon style={{color: "#1B9494"}} name={"arrow-back-circle-sharp"} size={35} />
          <Text style={{color: "#c8c8c8", paddingLeft: 5, marginTop: 5, fontSize: 18}}>Back to Packages</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  useEffect(() => {  
    setSpinner(true);
    const usersRef = firebase.firestore().collection('users')
    usersRef
      .doc(tripData.facilityId)
      .get()
      .then(firestoreDocument => {
        if (!firestoreDocument.exists) {
          console.log("User does not exist anymore.")
          return;
        }else{
          setfacilityInfo(firestoreDocument.data());
        }
      })
      .catch(error => {
        setSpinner(false)
        console.log(error)
      });
    
      const tripsRef = firebase.firestore().collection('trips')
      tripsRef
      .where('facilityId', '==', tripData.facilityId) 
      .get().then((querySnapshot) => {
        let packageTotal = 0; 
        let dataArr = [];
        querySnapshot.forEach(doc => { 
          const data = doc.data();
          dataArr.push(data)
          packageTotal += data.packageLists.length; 
        })  
        setPackageCount(packageTotal);
        setTripCount(dataArr.length)
        console.log("TripsCount " + dataArr.length)
        setSpinner(false)
      })
      .catch(error => {
        setSpinner(false)
        console.log(error)
      });
  }, []);
  return ( 
    <ScrollView style={styles.container}> 
        <View style={styles.tripDetails}> 
          <Text style={styles.title}>TRIP - {tripData.tripId.slice(0,8)}</Text> 
          <View style={{flex: 4, flexDirection: 'row' }}> 
            <View style={{flex: 3, marginBottom: "2%", flexDirection: 'column'  }}>
              <View style={{flex: 1 }}>
                <Text style={styles.triplabel}>From</Text>
                <Text style={styles.tripname}>{tripData.tripInfo.dropOffDate}</Text>
                <Text style={styles.triplabel}>{new Date(tripData.tripInfo.dropOffDate).toLocaleDateString("en-US", { month: 'short' })} {new Date(tripData.tripInfo.dropOffDate).toLocaleDateString("en-US", { day: 'numeric'})} {new Date(tripData.tripInfo.dropOffDate).toLocaleDateString("en-US", { year: 'numeric'})}</Text>
              </View>
              <View style={{flex: 1, paddingTop: "5%"}}>
                <Text style={styles.triplabel}><Icon style={styles.icon} name='location-sharp' size={14} /> DROP OFF ADDRESSS</Text>
                <Text style={styles.itemlabel}>{tripData.tripInfo.dropOffAddress}</Text> 
              </View> 
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>  
              <Image source={require('../../../assets/images/stopFlight.png')} style={{height: 130, marginBottom: 20}}/>  
            </View>
            <View style={{flex: 3, marginLeft: "2%", flexDirection: 'column' }}>
              <View style={{flex: 1 }}>
                <Text style={styles.triplabel}>To</Text>
                <Text style={styles.tripname}>{tripData.tripInfo.desVal}</Text> 
                <Text style={styles.triplabel}>{new Date(tripData.tripInfo.pickUpDate).toLocaleDateString("en-US", { month: 'short' })} {new Date(tripData.tripInfo.pickUpDate).toLocaleDateString("en-US", { day: 'numeric'})} {new Date(tripData.tripInfo.pickUpDate).toLocaleDateString("en-US", { year: 'numeric'})}</Text>
              </View>  
              <View style={{flex: 1, paddingTop: "5%"}}>
                <Text style={styles.triplabel}><Icon style={styles.icon} name='location-sharp' size={14} /> PICK UP ADDRESS</Text>
                <Text style={styles.itemlabel}>{tripData.tripInfo.pickUpAddress}</Text> 
              </View> 
            </View>
          </View>
        </View>   
        <View style={styles.item}> 
            <View style={{flex: 2, alignContent: "center"}}>  
                <Avatar
                  size="large"
                  rounded
                  title="NI"
                  source={{ uri: facilityInfo.avatar }}
                />  
            </View> 
            <View style={{flex: 4, alignItems: 'flex-start'}}>
                <Text style={styles.title}>{facilityInfo.facilityName}</Text>  
                <Text style={styles.tripname}>{facilityInfo.fullName}</Text>  
                <Text>{facilityInfo.email}</Text>  
            </View>
            <View style={{flex: 1 ,flexDirection: "column" }}>
                <View style={styles.itemCount}>
                  <Text style={styles.numberText}>{packageCount}</Text>
                  <Image source={require('../../../assets/images/Package.png')} style={{ marginBottom: 5 }}/> 
                </View> 
                <View style={styles.itemCount}>
                  <Text style={styles.numberText}>{tripCount}</Text>
                  <Image source={require('../../../assets/images/plane.png')}/> 
                </View> 
            </View>
        </View> 
        {/* <View style={styles.itemLists}>
          <Text style={styles.mainText}>FACILITY INFO</Text> 
          <Text style={styles.facilityInfo}>{tripData.tripInfo.facilityInfo}</Text> 
        </View> */}
        <View style={{ flex: 2, flexDirection: "column", marginHorizontal: "2%" }}>   
            <Text style={styles.mainText}>SHIPMENT COST</Text> 
            <View style={styles.itemHeader} > 
              <Text style={[styles.itemTitle, {flex: 4}]}>Item Description</Text>
              <Text style={[styles.itemTitle, {flex: 1, textAlign: 'right'}]}>Qty</Text>
              <Text style={[styles.itemTitle, {flex: 2, textAlign: 'right'}]}>Wgt</Text>
              <Text style={[styles.itemTitle, {flex: 3, textAlign: 'center'}]}>$</Text>
            </View>   
                <ScrollView>
                  {packageData.items.map((data, index ) => (
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
                <Text style={[styles.itemlabel, {flex: 4, textAlign: "right"}]}> Total Amount </Text>  
                <Text style={[styles.itemlabel, {flex: 2, textAlign: "right"}]}> {packageData.total ? packageData.total : "-" } {currency}</Text>  
              </View>
        </View> 
        <View style={{ flex: 2, flexDirection: "column" }}>  
          <Text style={styles.mainText}>TRACKING STATUS</Text> 
          <View style={styles.statusBox}>  
            <View style={styles.itemStatus}> 
              <View style={{ flex: 1}}>
                <Image source={require('../../../assets/images/package-icon.png')} style={{ marginLeft: 10}}/> 
                <Image source={require('../../../assets/images/Line.png')} style={{ width: 2,resizeMode: 'center', height: 28, marginLeft: 23}}/> 
              </View>
              <View style={{ flex: 4}}> 
                  {packageData.trackingStatus === "reserved" ? (
                    <Text style={styles.statusTitle}>Package has been reserved</Text>
                  ) : (
                    <Text style={styles.itemlabel}>Package has been reserved</Text> 
                  )}
              </View>
            </View>  
            <View style={styles.itemStatus}> 
              <View style={{ flex: 1}}>
                <Image source={require('../../../assets/images/received-icon.png')} style={{ marginLeft: 10}}/>  
                <Image source={require('../../../assets/images/Line.png')} style={{ width: 2,resizeMode: 'center', height: 28, marginLeft: 23}}/> 
              </View>
              <View style={{ flex: 4}}>
                  {packageData.trackingStatus === "received" ? (
                    <Text style={styles.statusTitle}>Package is received by facility</Text>
                  ) : (
                    <Text style={styles.itemlabel}>Package is received by facility</Text> 
                  )}
                </View>
            </View> 
            <View style={styles.itemStatus}> 
              <View style={{ flex: 1}}>
                <Image source={require('../../../assets/images/plane-icon.png')} style={{ marginLeft: 10}}/> 
                <Image source={require('../../../assets/images/Line.png')} style={{ width: 2,resizeMode: 'center', height: 28, marginLeft: 23}}/>  
              </View>
              <View style={{ flex: 4}}>
                  {packageData.trackingStatus === "On Route" ? (
                    <Text style={styles.statusTitle}>Package is On-Route</Text>
                  ) : (
                    <Text style={styles.itemlabel}>Package is On-Route</Text> 
                  )}
                </View>
            </View> 
            <View style={styles.itemStatus}> 
              <View style={{ flex: 1}}>
                <Image source={require('../../../assets/images/arrived-icon.png')} style={{ marginLeft: 10}}/>  
                <Image source={require('../../../assets/images/Line.png')} style={{ width: 2,resizeMode: 'center', height: 28, marginLeft: 23}}/> 
              </View>
              <View style={{ flex: 4}}> 
                  {packageData.trackingStatus === "Arrive" ? (
                    <Text style={styles.statusTitle}>Package has arrived at destination facility</Text>
                  ) : (
                    <Text style={styles.itemlabel}>Package has arrived at destination facility</Text> 
                  )}
                </View>
            </View> 
            <View style={styles.itemStatus}> 
              <View style={{ flex: 1}}>
                <Image source={require('../../../assets/images/package-pickup.png')} style={{ marginLeft: 10}}/> 
              </View>
              <View style={{ flex: 4}}> 
                  {packageData.trackingStatus === "Checkout" ? (
                    <Text style={styles.statusTitle}>Package has been picked up</Text>
                  ) : (
                    <Text style={styles.itemlabel}>Package has been picked up</Text> 
                  )} 
                </View>
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