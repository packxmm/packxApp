import React, {  useState , useEffect} from 'react';
import { Text, View, TouchableOpacity, StatusBar, ScrollView, RefreshControl ,SafeAreaView, Image} from 'react-native';
import styles from './styles';  
import { firebase } from '../../firebase/config' 
import Spinner from 'react-native-loading-spinner-overlay' 
import moment from "moment";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Trips(props) {
  const userData = props.extraData  
  const [tripData, setTripData] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {  
    firebase.firestore()
      .collection('trips') 
      .where('facilityId', '==', userData.id) 
      .get().then((querySnapshot) => {
        const dataArr = [];
        querySnapshot.forEach(doc => { 
          const data = doc.data();
          dataArr.push(data);   
        })  
        setTripData(dataArr); 
        setSpinner(false);
      }).catch((error) => {
          console.log("Error getting document:", error);
      });  
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    try {  
      firebase.firestore()
      .collection('trips') 
      .where('facilityId', '==', userData.id)   
      .get().then((querySnapshot) => {
        const dataArr = [];
        querySnapshot.forEach(doc => { 
          const data = doc.data();
          dataArr.push(data);   
        })  
        setTripData(dataArr); 
        setRefreshing(false);
      }).catch((error) => {
          console.log("Error getting document:", error);
      });  
    } catch (error) {
      console.error(error);
    }
  }, []);
 
  return ( 
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}> 
    <StatusBar animated={true} backgroundColor="#FAFAFA" barStyle="dark-content"/>
        <View style={styles.header}>
          <Text style={styles.mainText}> My Trips </Text>
          <Text style={styles.text}> TRIP LIST  </Text>
        </View>
        <View style={styles.itemLists}>
        {tripData.filter((data) => data.trackingStatus !== "Checkout").map((item , index) => (
            <TouchableOpacity style={styles.item} key={index} onPress={() => props.navigation.navigate('TripDetails', { tripInfo: item, user: userData })}> 
              <View style={styles.tripHeader}> 
                <Text style={styles.title}>TRIP - <Text style={styles.numberText}>{item.tripId.slice(0,8).toUpperCase()} | </Text></Text>
                <Text style={styles.status}>Tracking : {item.trackingStatus}</Text>
              </View> 
              <View style={styles.tripList}>
                <View style={{flex: 2}}>
                  <Text style={styles.triplabel}>From</Text>
                  <Text style={styles.tripname}>{item.tripInfo.dropOff}</Text>
                  <Text style={styles.datelabel}>Last Drop Off</Text>  
                  <Text style={styles.dateText}> {moment(new Date(item.tripInfo.dropOffDate)).format("MMM Do YYYY")} </Text>
                </View>
                <View style={{flex: 2}}>
                  <Text style={styles.triplabel}>To</Text>
                  <Text style={styles.tripname}>{item.tripInfo.desVal}</Text>
                  <Text style={styles.datelabel}>Est. Arrival</Text>
                  <Text style={styles.dateText}> {moment(new Date(item.tripInfo.pickUpDate)).format("MMM Do YYYY")} </Text>
                </View>
                <View style={{flex: 2 ,flexDirection: "row",justifyContent: "center", alignItems:"center" }}>
                  {item.packageLists.length === 0 ? (
                      <>
                      <TouchableOpacity style={styles.editTrip} onPress={() => props.navigation.navigate('CreateFacility', {tripInfo : item})}> 
                        <FontAwesome style={styles.icon} name="pencil" size={18} />
                        <Text style={styles.dateText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.editTrip,{marginLeft: 15}]}> 
                        <FontAwesome style={styles.icon} name="trash" size={18} />
                        <Text style={styles.dateText}>Delete</Text>
                      </TouchableOpacity>
                      </>
                  ):(
                    <> 
                      <Text style={styles.title}>{item.packageLists.length}</Text>
                      <Image source={require('../../../assets/images/Supplier.png')}/>
                    </>
                  )}
                </View>
              </View> 
            </TouchableOpacity> 
          ))} 
        </View> 
        <Spinner
          visible={spinner}
          textStyle={{ color: "#fff" }}
          overlayColor="rgba(0,0,0,0.5)"
        /> 
      </ScrollView>
    </SafeAreaView>
  )
}