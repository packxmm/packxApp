import React, {  useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image , ScrollView, Linking, Platform, StatusBar} from 'react-native'; 
import styles from './styles';
import Spinner from 'react-native-loading-spinner-overlay' 
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { firebase } from '../../firebase/config'
import { Avatar } from 'react-native-elements'
import Button from '../../components/Button'
import moment from "moment";

export default function TripInfo({ route, navigation }) { 
  const [spinner, setSpinner] = useState(false);
  const tripData = route.params.tripInfo;  
  const userData = route.params.user;   
  const [totalPackages, setPackageTotal] = useState(); 
  const [totalTrip, setTripTotal] = useState(); 
  const [facilityInfo, setfacilityInfo] = useState({});

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{flex:1, flexDirection: 'row', paddingLeft: 15, paddingTop: Platform.OS === 'android' ? 10 : 0}} onPress={() => navigation.goBack()}>
          <Icon style={{color: "#1B9494"}} name={"arrow-back-circle-sharp"} size={35} />
          <Text style={{color: "#c8c8c8", paddingLeft: 5, marginTop: 5, fontSize: 18}}>Back</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

    
  useEffect(() => {    
      const tripsRef = firebase.firestore().collection('trips') 
      tripsRef
      .where('facilityId', '==', tripData.facilityId) 
      .get().then((querySnapshot) => {
        const dataArr = [];
        let total = 0;
        querySnapshot.forEach(doc => { 
          const data = doc.data();
          dataArr.push(data);   
          total += data.packageLists.length;
        })  
        setPackageTotal(total);
        setTripTotal(dataArr.length); 
      }).catch((error) => {
          console.log("Error getting document:", error);
      });  
    
      firebase.firestore()
        .collection('users')
        .doc(tripData.facilityId)
        .get().then((doc) => {
          if (doc.exists) {
              const data = doc.data();
              setfacilityInfo(data)
          } else {
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      }); 
  }, []); 

  return ( 
    <ScrollView style={styles.container}> 
    <StatusBar animated={true} backgroundColor="#FAFAFA" barStyle="dark-content"/>
        <View style={styles.tripList}> 
          <Text style={styles.mainText}>TRIP - {tripData.tripId.slice(0,8).toUpperCase()}</Text> 
          <View style={{flex: 4, flexDirection: 'row' }}> 
            <View style={{flex: 3, marginBottom: "2%", flexDirection: 'column'  }}>
              <View style={{flex: 1 }}>
                <Text style={styles.triplabel}>From</Text>
                <Text style={styles.tripname}>{tripData.tripInfo.dropOff}</Text>  
                <Text style={styles.dateText}>{moment(new Date(tripData.tripInfo.dropOffDate)).format("MMM Do YYYY")} </Text>
              </View>
              <View style={{flex: 1, paddingTop: "5%"}}>
                <Text style={styles.triplabel}><Icon style={styles.icon} name='location-sharp' size={14} /> DROP OFF ADDRESSS</Text>
                <Text style={styles.itemlabel}>{tripData.tripInfo.dropOffAddress}</Text> 
              </View> 
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>  
              <Image source={require('../../../assets/images/stopFlight.png')} style={{ width: 43,resizeMode: 'center', height: 140}}/>  
            </View>
            <View style={{flex: 3, flexDirection: 'column' }}>
              <View style={{flex: 1 }}>
                <Text style={styles.triplabel}>To</Text>
                <Text style={styles.tripname}>{tripData.tripInfo.desVal}</Text> 
                <Text style={styles.dateText}>{moment(new Date(tripData.tripInfo.pickUpDate)).format("MMM Do YYYY")} </Text>
              </View>  
              <View style={{flex: 1 }}>
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
            <View style={{flex: 4}}>
                <Text style={styles.title}>{facilityInfo.facilityName !== undefined ? facilityInfo.facilityName : facilityInfo.fullName}</Text>  
                <Text style={{marginBottom: 8}}>{facilityInfo.email}</Text>  
                <Text>{facilityInfo.phone}</Text>
                {/* <TouchableOpacity style={{flexDirection: 'row'}} onPress={ ()=>{ Linking.openURL('viber://contact?number='+facilityInfo.phone+'/')}}> 
                  <Fontisto style={{color: '#169393', marginVertical: 5, marginEnd: 5}} name="viber" size={16} /> 
                  <Text style={styles.link} >{facilityInfo.phone}</Text>
                </TouchableOpacity> */}
            </View>
            <View style={{flexDirection: "column", paddingTop: "2%" }}>
                <View style={styles.itemCount}>
                  <Text style={styles.numberText}>{totalPackages}</Text>
                  <Image source={require('../../../assets/images/Package.png')} style={{ marginBottom: 5 }}/> 
                </View> 
                <View style={styles.itemCount}>
                  <Text style={styles.numberText}>{totalTrip}</Text>
                  <Image source={require('../../../assets/images/plane.png')}/> 
                </View> 
            </View>
        </View> 
        <View style={styles.itemLists}> 
          <View style={{flex: 1, alignItems: "center"}}>
            <Text style={styles.mainText}>PRICING</Text> 
          </View>
          <View style={{flex: 4, flexDirection: 'column' }}>  
                {tripData.categoryLists.map((data , index) => (
                  <View key={index} style={styles.itembox}>
                    <Text style={styles.itemlabel}> <FontAwesome5 style={styles.icon} name={data.item} size={16} />  {data.category}</Text> 
                    <Text style={styles.catText}>{data.price} {data.currency} / {data.weight}</Text>  
                  </View>
                 ))}
          </View>
        </View> 
        <View style={{flex: 1 }}>
          <Text style={styles.mainText}>FACILITY INFO</Text> 
          <Text style={styles.facilityInfo}>{tripData.tripInfo.facilityInfo}</Text> 
        </View>   
        <View style={styles.itemLists}> 
          <View style={{flex: 1, alignItems: "center"}}>
            <Text style={styles.mainText}>PROHIBITED ITEMS</Text> 
          </View>
          <View style={{flex: 4, flexDirection: 'column' }}>  
                {tripData.prohibitedLists.map((data ,index) => (
                  <View key={index} style={styles.itembox}>
                    <Text style={styles.itemlabel}> <FontAwesome5 style={styles.icon} name={data.item} size={16} />  {data.category}</Text>  
                  </View>
                 ))}
          </View>
        </View>  
          { userData.type === "user" && (
            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center' }}>  
                <Button title={"Reserve"} onPress={() => navigation.navigate('Reserved', { tripInfo: tripData, user: userData })}/>
            </View>
          )}
          <Spinner
            visible={spinner}
            textStyle={{ color: "#fff" }}
            overlayColor="rgba(0,0,0,0.5)"
          />
      </ScrollView>
  )
}