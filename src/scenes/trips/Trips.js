import React, {  useState , useEffect} from 'react';
import { Text, View, TouchableOpacity, StatusBar, ScrollView, RefreshControl ,SafeAreaView, Image} from 'react-native';
import styles from './styles';  
import { firebase } from '../../firebase/config' 
import Spinner from 'react-native-loading-spinner-overlay' 

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
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />  
      <ScrollView>
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.mainText}> Your Trips </Text>
          <Text style={styles.text}> TRIP LIST  </Text>
        </View>
        <View style={styles.itemLists}>
          {tripData.map((item, index) => (
            <TouchableOpacity style={styles.item} key={index} onPress={() => props.navigation.navigate('TripDetails', { tripInfo: item, user: userData })}> 
              <View style={styles.tripHeader}> 
                <Text style={styles.title}>TRIP - <Text style={styles.numberText}>{item.tripId.slice(0,8)} | </Text></Text>
                <Text style={styles.title}>Tracking : {item.trackingStatus}</Text>
              </View> 
              <View style={styles.tripList}>
                <View style={{flex: 2}}>
                  <Text style={styles.triplabel}>From</Text>
                  <Text style={styles.tripname}>{item.tripInfo.dropOff}</Text>
                  <Text style={styles.datelabel}>Last Drop Off</Text> 
                  {new Date(item.tripInfo.dropOffDate).toLocaleDateString("en-US", { month: 'short' }) !== "Invalid Date" ? (
                    <Text style={styles.dateText}>{new Date(item.tripInfo.dropOffDate).toLocaleDateString("en-US", { month: 'short' })} {new Date(item.tripInfo.dropOffDate).toLocaleDateString("en-US", { day: 'numeric'})} {new Date(item.tripInfo.dropOffDate).toLocaleDateString("en-US", { year: 'numeric'})}</Text>
                  ) : ( 
                    <Text style={styles.dateText}>{item.tripInfo.dropOffDate}</Text>
                  )}
                </View>
                <View style={{flex: 2}}>
                  <Text style={styles.triplabel}>To</Text>
                  <Text style={styles.tripname}>{item.tripInfo.desVal}</Text>
                  <Text style={styles.datelabel}>Est. Arrival</Text>
                  {new Date(item.tripInfo.pickUpDate).toLocaleDateString("en-US", { month: 'short' }) !== "Invalid Date" ? (
                    <Text style={styles.dateText}>{new Date(item.tripInfo.pickUpDate).toLocaleDateString("en-US", { month: 'short' })} {new Date(item.tripInfo.pickUpDate).toLocaleDateString("en-US", { day: 'numeric'})} {new Date(item.tripInfo.pickUpDate).toLocaleDateString("en-US", { year: 'numeric'})}</Text>
                  ) : ( 
                    <Text style={styles.dateText}>{item.tripInfo.pickUpDate}</Text>
                  )}
                </View>
                <View style={{flex: 2 ,flexDirection: "row",justifyContent: "center", alignItems:"center" }}>
                  <Text style={styles.title}>{item.packageLists.length}</Text>
                  <Image source={require('../../../assets/images/Supplier.png')} style={{ width: 28,resizeMode: 'center', height: 20 }}/>
                </View>
              </View> 
            </TouchableOpacity> 
          ))} 
        </View> 
        </SafeAreaView>
      </ScrollView>
      <Spinner
        visible={spinner}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </View>
  )
}