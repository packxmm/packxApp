import React, {  useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, RefreshControl , Platform, StatusBar} from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config'
import Spinner from 'react-native-loading-spinner-overlay' 
import Icon from 'react-native-vector-icons/Ionicons';  
import { Avatar } from 'react-native-elements'
import Button from '../../components/Button'
import Dialog from "react-native-dialog";
import moment from "moment";

export default function TripDetails({ route, navigation }) {
  const [tripData, setTripData] = useState(route.params.tripInfo);  
  const userData = route.params.user;   
  const [packageInfo, setPackagesData] = useState([]);
  const [allUser, setUserLists] = useState([]);
  const [total, setTotal] = useState(); 
  const [spinner, setSpinner] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [visible, setVisible] = useState(false);
  const [dialogTitle, setdialogTitle] = useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{flex:1, flexDirection: 'row', paddingLeft: 15, paddingTop: Platform.OS === 'android' ? 10 : 0}} onPress={() => navigation.goBack()}>
          <Icon style={{color: "#1B9494"}} name={"arrow-back-circle-sharp"} size={35} />
          <Text style={{color: "#c8c8c8", paddingLeft: 5, marginTop: 7, fontSize: 17}}>Back To Trips</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);
    
  useEffect(() => {    
    setSpinner(true);  
      const packageRef = firebase.firestore().collection('package')
      const usersRef = firebase.firestore().collection('users')
      usersRef 
        .get()
        .then((querySnapshot) =>{ 
          const dataArr = [];
          querySnapshot.forEach(doc => { 
            let data = doc.data();
            dataArr.push(data);   
          })  
          setUserLists(dataArr)
        })
        .catch(error => {
          alert(error)
        });  

      packageRef
        .where('tripId', '==', tripData.tripId) 
        .get().then((querySnapshot) => {
          const dataArr = [];
          let total = 0;
          querySnapshot.forEach(doc => { 
            let data = doc.data();
            total += data.items.length;
            dataArr.push(data);   
          })  
          setTotal(total);
          setPackagesData(dataArr)
          setSpinner(false); 
      }).catch((error) => {
          console.log("Error getting document:", error);
      }); 
  }, []); 

    const onRefresh = React.useCallback(() => {
      setRefreshing(true); 
      const packageRef = firebase.firestore().collection('package')
      packageRef
        .where('tripId', '==', tripData.tripId) 
        .get().then((querySnapshot) => {
          const dataArr = [];
          let total = 0;
          querySnapshot.forEach(doc => { 
            let data = doc.data();
            total += data.items.length;
            dataArr.push(data);   
          })  
          setTotal(total);
          setPackagesData(dataArr)
          setSpinner(false); 
          setRefreshing(false);
      }).catch((error) => {
          console.log("Error getting document:", error);
      }); 
    }, []);
  
  const showDialog = () => { 
    setVisible(true)  
    {tripData.trackingStatus === "On Route" ? (
      setdialogTitle("The packages trip has arrived to destination")
    ): ( 
      setdialogTitle("All packages must be packed and ready to be shipped off ")
    )}
  }
  
  const handleCancel = () => {
    setVisible(false)
  }
    
  const changeTrackingStatus = () =>{ 
    setVisible(false);
    setSpinner(true);  
    const updateTrip = { 
      trackingStatus : "On Route"
    }  
    const getTrip = firebase.firestore().collection('trips').doc(tripData.tripId);
    getTrip.update(updateTrip).then(() => {
      tripData.packageLists.forEach(packageId => { 
        const getPackages = firebase.firestore().collection('package').doc(packageId);
        getPackages.update(updateTrip);
      }) 
      setTimeout(function(){
        setTripData(prevState => ({
            ...prevState,
            trackingStatus : "On Route",
        }))
        setSpinner(false);
      }, 1000)
    });
  }

  const arriveTrip = () =>{ 
    setVisible(false)
    setSpinner(true);  
    const updateTrip = { 
      trackingStatus : "Arrive"
    }  
    const getTrip = firebase.firestore().collection('trips').doc(tripData.tripId);
    getTrip.update(updateTrip).then(() => {
      tripData.packageLists.forEach(packageId => { 
        console.log(packageId)
        const getPackages = firebase.firestore().collection('package').doc(packageId);
        getPackages.update(updateTrip);
      })  
      setTimeout(function(){
        setTripData(prevState => ({
            ...prevState,
            trackingStatus : "Arrive",
        }))
        setSpinner(false);
      }, 1000)
    });
  }
  return ( 
    <>
    <ScrollView style={styles.container}>  
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
     <StatusBar barStyle="dark-content" />
      <View style={styles.tripHeader}> 
        <Text style={styles.mainText}>TRIP - {tripData.tripId.slice(0,8)}</Text> 
      </View>
      <View style={styles.tripList}>
        <View style={{flex: 2}}>
          <Text style={styles.triplabel}>From</Text>
          <Text style={styles.tripname}>{tripData.tripInfo.dropOff}</Text>
          <Text style={styles.datelabel}>Last Drop Off</Text>
          <Text style={styles.dateText}>{moment(new Date(tripData.tripInfo.dropOffDate)).format("MMM Do YY")}</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.triplabel}>To</Text>
          <Text style={styles.tripname}>{tripData.tripInfo.desVal}</Text>
          <Text style={styles.datelabel}>Est. Arrival</Text> 
          <Text style={styles.dateText}>{moment(new Date(tripData.tripInfo.pickUpDate)).format("MMM Do YY")}</Text>
        </View>
        <View style={{flex: 2 ,flexDirection: "row",justifyContent: "center", alignItems:"center" }}> 
          <Text style={styles.title}>TOTAL {total}</Text>
          <Image source={require('../../../assets/images/Package.png')} style={{ margin: 10}}/>
        </View>
      </View> 
      <View style={styles.tripList}>
        <View style={{flex: 4}}>
          <Text style={styles.locLabel}><Icon style={styles.icon} name='location-sharp' size={14} /> DROP OFF ADDRESSS</Text>
          <Text style={styles.locText}>{tripData.tripInfo.dropOffAddress}</Text> 
        </View>
        <View style={{flex: 4}}>
          <Text style={styles.locLabel}><Icon style={styles.icon} name='location-sharp' size={14} /> PICK UP ADDRESS</Text>
          <Text style={styles.locText}>{tripData.tripInfo.pickUpAddress}</Text> 
        </View>
        <TouchableOpacity style={{flex: 1 ,flexDirection: "column",justifyContent: "center", alignItems:"center" }} onPress={() => navigation.navigate('TripInfo', { tripInfo: tripData , user: userData})}> 
          <Text style={styles.dateText}> More </Text> 
          <Icon style={styles.icon} name='ellipsis-horizontal' size={20} />
        </TouchableOpacity>
      </View>  
      <View style={styles.tripHeader}> 
        <Text style={styles.mainText}>Tracking Status : {tripData.trackingStatus}</Text> 
      </View>
      {packageInfo.map((item, index) => (
          <View key={index}>
            {allUser.filter((data) => data.id === item.userId).map((user, usrindex) => (
              <TouchableOpacity style={[styles.item, item.trackingStatus === "reserved" && styles.reserved, item.trackingStatus === "refused" && styles.reserved]} key={usrindex} onPress={() => navigation.navigate('Booked', { user: user, packageInfo: item , trip: tripData})}>
                <View style={{flex: 1, alignContent: "center"}}>  
                    <Avatar
                      size="large"
                      rounded
                      title="NI"
                      source={{ uri: user.avatar }}
                    />  
                </View> 
                <View style={{flex: 2, alignItems: 'flex-start', paddingLeft: "5%"}}>
                  <Text style={[styles.title, {marginTop: "5%"}]}>{user.fullName}</Text>  
                  <Text style={[styles.text, {marginTop: "5%"}]}>{item.trackingStatus}</Text>
                </View>
                <View style={{flex: 1 ,flexDirection: "column" }}>
                  <View style={styles.itemCount}>
                    <Text style={styles.title}>{item.items.length}</Text>
                    <Image source={require('../../../assets/images/Package.png')} style={{ marginBottom: 10 }}/> 
                  </View> 
                  <View style={styles.itemCount}>
                    <Text style={[styles.text, {marginTop: "5%"}]}>{item.status}</Text>
                    <Image source={require('../../../assets/images/cashImg.png')}/> 
                  </View> 
                </View>
              </TouchableOpacity>
            ))} 
          </View>
      ))} 
      {tripData.trackingStatus !== "Arrive" && (
        <>
        {tripData.trackingStatus === "On Route" ? (
          <Button title={"Arrive"} children={'plane-arrival'}  onPress={showDialog}/> 
        ): ( 
          <Button title={"Ship"} children={'plane-departure'}  onPress={showDialog}/> 
        )}
        </>
      )}
      <Dialog.Container visible={visible}>
        <Dialog.Title>{dialogTitle}</Dialog.Title>
        {tripData.trackingStatus === "On Route" ? ( 
          <Dialog.Button label="Yes" onPress={arriveTrip} />
        ):(
          <Dialog.Button label="Yes" onPress={changeTrackingStatus} /> 
        )}
        <Dialog.Button label="No" onPress={handleCancel} />
      </Dialog.Container>
  </ScrollView>
      <Spinner
        visible={spinner}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </>
  )
}