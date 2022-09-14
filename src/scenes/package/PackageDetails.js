import React, {  useState } from 'react';
import Modal from "react-native-modal"; 
import uuid from 'react-native-uuid';
import { View, Text, TouchableOpacity, Image , ScrollView, TextInput} from 'react-native';
import styles from './PackageDetailsSyles';
import Spinner from 'react-native-loading-spinner-overlay' 
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { firebase } from '../../firebase/config'
import { Avatar } from 'react-native-elements'
import Button from '../../components/Button'

export default function PackageDetails({ route, navigation }) { 
  const [isModalVisible, setModalVisible] = useState(false); 
  const [itemList,setItemLists] = useState([]);
  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const tripData = route.params.tripInfo;  
  const packageData = route.params.items;  
  const userData = route.params.user;  
  const [recName, setReceiverName] = useState('')
  const [recContact, setReceiverContact] = useState('')
  const [facilityInfo, setfacilityInfo] = useState({});

  console.log(packageData)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{flex:1, flexDirection: 'row', paddingLeft: 15}} onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/images/back-arrow.png')} style={{ width: 28,resizeMode: 'center', height: 28}}/>
          <Text style={{color: "#c8c8c8", paddingLeft: 10, paddingTop: 2, fontSize: 18}}>Back to Packages</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  function showModal(){   
    setModalVisible(true);
  } 

  function hideModal(){   
    console.log(userData);
    setModalVisible(false);    
    const generateUuid = uuid.v4();
    const getUuid = generateUuid.replaceAll('-', '');  
    setSpinner(true);
    const data = { 
      id: getUuid,
      tripId : tripData.tripId,
      userId : userData.id,
      recName : recName,
      recContact : recContact,
      items : itemList, 
      trackingStatus : "reserved"
    } 
    const usersRef = firebase.firestore().collection('package')
    usersRef
      .doc(getUuid)
      .set(data)
      .then(() => {  
        setSpinner(false);
        navigation.navigate('Reserved');
      })
      .catch((error) => {
        setSpinner(false)
        alert(error)
      });
  } 

  function addList(){
    setItemLists(itemList => [{  
      item : item, 
      qty : qty
    },...itemList]);
  }
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
  return ( 
    <ScrollView style={styles.container}> 
        <View style={styles.tripDetails}> 
          <Text style={styles.title}>TRIP - {tripData.tripId.slice(0,8)}</Text> 
          <View style={{flex: 4, flexDirection: 'row' }}> 
            <View style={{flex: 3, marginBottom: "2%", flexDirection: 'column'  }}>
              <View style={{flex: 1 }}>
                <Text style={styles.triplabel}>From</Text>
                <Text style={styles.tripname}>{tripData.tripInfo.dropOff}</Text> 
                <Text style={styles.triplabel}>{tripData.tripInfo.dropOffDate}</Text>
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
                <Text style={styles.triplabel}>{tripData.tripInfo.pickUpDate}</Text>
              </View>  
              <View style={{flex: 1 }}>
                <Text style={styles.triplabel}><Icon style={styles.icon} name='location-sharp' size={14} /> PICK UP ADDRESS</Text>
                <Text style={styles.itemlabel}>{tripData.tripInfo.pickUpAddress}</Text> 
              </View> 
            </View>
          </View>
        </View>   
        <View style={styles.item}> 
            <View style={{flex: 1, alignContent: "center"}}>  
                <Avatar
                  size="large"
                  rounded
                  title="NI"
                  source={{ uri: facilityInfo.avatar }}
                />  
            </View> 
            <View style={{flex: 2, alignItems: 'flex-start'}}>
                <Text style={styles.title}>{facilityInfo.facilityName}</Text>  
                <Text style={styles.tripname}>{facilityInfo.fullName}</Text>  
                <Text>{facilityInfo.email}</Text>  
            </View>
            <View style={{flex: 1 ,flexDirection: "column" }}>
                <View style={styles.itemCount}>
                  <Text style={styles.numberText}>2127</Text>
                  <Image source={require('../../../assets/images/Package.png')} style={{ width: 28,resizeMode: 'center', height: 27, marginBottom: 5 }}/> 
                </View> 
                <View style={styles.itemCount}>
                  <Text style={styles.numberText}>213</Text>
                  <Image source={require('../../../assets/images/plane.png')} style={{ width: 28,resizeMode: 'center', height: 20}}/> 
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
              <Text style={[styles.itemTitle, {flex: 1}]}>Qty</Text>
              <Text style={[styles.itemTitle, {flex: 1}]}>Wgt</Text>
              <Text style={[styles.itemTitle, {flex: 1}]}>$</Text>
            </View>   
                <ScrollView>
                  {packageData.items.map((data, index ) => (
                    <View style={styles.itemRow} key={index}>
                      <Text style={[styles.deslabel, {flex: 4}]}> {data.item}</Text>  
                      <Text style={[styles.deslabel, {flex: 1}]}> {data.qty} x </Text>  
                      <Text style={[styles.deslabel, {flex: 1}]}> - </Text>  
                      <Text style={[styles.deslabel, {flex: 1}]}> - </Text>  
                    </View>
                  ))}
              </ScrollView>  

              <View style={styles.itemRow}>
                <Text style={[styles.deslabel, {flex: 1}]}></Text>  
                <Text style={[styles.deslabel, {flex: 1}]}></Text>  
                <Text style={[styles.itemlabel, {flex: 4, textAlign: "center"}]}> Total Amount </Text>  
                <Text style={[styles.deslabel, {flex: 1}]}> -</Text>  
              </View>
        </View> 
        <View style={{ flex: 2, flexDirection: "column" }}>  
          <Text style={styles.mainText}>TRACKING STATUS</Text> 
          <View style={styles.statusBox}>  
            <View style={styles.itemStatus}> 
              <View style={{ flex: 1}}>
                <Image source={require('../../../assets/images/package-icon.png')} style={{ width: 28,resizeMode: 'center', height: 28, marginLeft: 10}}/> 
                <Image source={require('../../../assets/images/Line.png')} style={{ width: 2,resizeMode: 'center', height: 28, marginLeft: 23}}/> 
              </View>
              <View style={{ flex: 4}}>
                <Text style={styles.itemTitle}>Package has been reserved</Text>
              </View>
            </View>  
            <View style={styles.itemStatus}> 
              <View style={{ flex: 1}}>
                <Image source={require('../../../assets/images/received-icon.png')} style={{ width: 28,resizeMode: 'center', height: 28, marginLeft: 10}}/>  
                <Image source={require('../../../assets/images/Line.png')} style={{ width: 2,resizeMode: 'center', height: 28, marginLeft: 23}}/> 
              </View>
              <View style={{ flex: 4}}>
                  <Text style={styles.itemlabel}>Package is received by facility</Text>
                </View>
            </View> 
            <View style={styles.itemStatus}> 
              <View style={{ flex: 1}}>
                <Image source={require('../../../assets/images/plane-icon.png')} style={{ width: 28,resizeMode: 'center', height: 28, marginLeft: 10}}/> 
                <Image source={require('../../../assets/images/Line.png')} style={{ width: 2,resizeMode: 'center', height: 28, marginLeft: 23}}/>  
              </View>
              <View style={{ flex: 4}}>
                  <Text style={styles.itemlabel}>Package is On-Route</Text>
                </View>
            </View> 
            <View style={styles.itemStatus}> 
              <View style={{ flex: 1}}>
                <Image source={require('../../../assets/images/arrived-icon.png')} style={{ width: 28,resizeMode: 'center', height: 28, marginLeft: 10}}/>  
                <Image source={require('../../../assets/images/Line.png')} style={{ width: 2,resizeMode: 'center', height: 28, marginLeft: 23}}/> 
              </View>
              <View style={{ flex: 4}}>
                  <Text style={styles.itemlabel}>Package has arrived at destination facility</Text>
                </View>
            </View> 
            <View style={styles.itemStatus}> 
              <View style={{ flex: 1}}>
                <Image source={require('../../../assets/images/package-pickup.png')} style={{ width: 28,resizeMode: 'center', height: 28, marginLeft: 10}}/> 
              </View>
              <View style={{ flex: 4}}>
                  <Text style={styles.itemlabel}>Package has been picked up</Text>
                </View>
            </View> 
          </View>
        </View>    
        {/* <View style={styles.itemLists}> 
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
        </View>   */}
          <Spinner
            visible={spinner}
            textStyle={{ color: "#fff" }}
            overlayColor="rgba(0,0,0,0.5)"
          />
      </ScrollView>
  )
}