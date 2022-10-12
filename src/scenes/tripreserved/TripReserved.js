import React, {useState} from 'react'; 
import { StatusBar, View, Text, Image , TouchableOpacity, TextInput, ScrollView} from 'react-native';  
import uuid from 'react-native-uuid';
import Spinner from 'react-native-loading-spinner-overlay' 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { firebase } from '../../firebase/config'
import styles from './styles'
import Button from '../../components/Button'
import WhiteButton from '../../components/Button/WhiteButton'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function TripReserved(props) {
  const tripData = props.route.params.tripInfo;  
  const userData = props.route.params.user;   
  const [spinner, setSpinner] = useState(false);
  const [isConfirmed,setConfirmed] = useState(false);
  const [itemList,setItemLists] = useState([]);
  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(null);
  const [recName, setReceiverName] = useState('')
  const [recContact, setReceiverContact] = useState('')
  
  function addList(){
    setItemLists(itemList => [{  
      item : item, 
      qty : qty
    },...itemList]); 
    setItem("");
    setQty("");
  }

  function confirmData(){ 
    setSpinner(true); 
    const generateUuid = uuid.v4();
    const getUuid = generateUuid.replaceAll('-', '');  
    const data = { 
      id: getUuid,
      tripId : tripData.tripId,
      userId : userData.id,
      recName : recName,
      recContact : recContact,
      items : itemList, 
      trackingStatus : "reserved",
      status: "Unpaid",
      timestamp : new Date().toLocaleString('en-US')
    } 
    const packageRef = firebase.firestore().collection('package');
    packageRef
      .doc(getUuid)
      .set(data)
      .then(() => {  
        setSpinner(false);
        setConfirmed(true) 
      })
      .catch((error) => {
        alert(error)
      }); 
    
      let getPackages = tripData.packageLists;
      getPackages.push(getUuid);
      const addPackages = { 
        packageLists : getPackages
      } 
      const updateTrip = firebase.firestore().collection('trips').doc(tripData.tripId);
      updateTrip.update(addPackages);
      
      const msgData = { 
        id: getUuid,
        user : tripData.facilityId,
        msg :  "PackX Id "+ tripData.tripId.slice(0,8) + " has reserved a trip.",
        type : "reserved",
        timestamp : new Date().toLocaleString('en-US')
      }
      const notiRef = firebase.firestore().collection('notification')
      notiRef
      .doc(getUuid)
      .set(msgData)
      .catch((error) => {
        alert(error)
      }); 
  }
  return (  
    <>
    {isConfirmed === false ? (
      <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%'}}
        keyboardShouldPersistTaps="always"> 
        <Text style={styles.title}>Reserve your package </Text> 
        <Text style={styles.subtitle}>Package Summary</Text> 
        <View style={{ flex: 3, flexDirection: "column" }}>  
            <View style={styles.itemHeader} > 
              <Text style={styles.itemTitle}>Item Description</Text>
              <Text style={styles.itemTitle}>Qty</Text>
            </View>   
            {itemList.length != 0  &&
              <ScrollView>
              {itemList.map((data, index ) => (
                <View style={styles.itemRow} key={index}>
                  <Text style={styles.deslabel}> {data.item}</Text>  
                  <Text style={styles.deslabel}> {data.qty} x </Text>  
                </View>
              ))}
              </ScrollView>
            }
            <View style={styles.itemRow} > 
              <TextInput style={styles.itemInputLg} value={item} placeholder="Input Your Item Here ...." onChangeText={setItem}/>
              <TextInput style={styles.itemInputXs} value={qty} placeholder="Qty" onChangeText={setQty}/>
            </View>    
            <TouchableOpacity onPress={addList} style={{ flexDirection: "row", justifyContent: 'center' }}> 
              <FontAwesome5 style={styles.addicon} name="plus-circle" size={23} />
              <Text style={styles.addlabel}> Add </Text> 
            </TouchableOpacity>   
        </View> 
        <View style={{ flex: 2, flexDirection: "column" }}>
            <Text style={styles.inputLabel}>Receiver Name</Text>
            <TextInput style={styles.input}  
              placeholder="Receiver Name"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setReceiverName(text)}
              value={recName}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <Text style={styles.inputLabel}>Receiver Contact</Text>
            <TextInput style={styles.input} 
              placeholder="Receiver Contact"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setReceiverContact(text)}
              value={recContact}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          <Button title={"Confirm"} onPress={confirmData} children={'check'} /> 
          <WhiteButton title={"Cancel"}onPress={() => props.navigation.navigate('TripInfo')} children={'remove'}/>
        </View>
      </KeyboardAwareScrollView>
      </View>
    ) : ( 
      <View style={{ flex: 1 }}>
        <StatusBar barStyle= {"dark-content"}/>
        <View style={styles.packageContainer}>
          <View style={styles.logoBox}>
            <Image source={require('../../../assets/images/PackXLogo.png')} style={{ width: 167,resizeMode: 'center', height: 103}}/>
          </View>
          <Image source={require('../../../assets/images/successPack.png')} style={styles.introImg}/>
          <Text style={styles.title}>Your package</Text>
          <Text style={styles.title}>has been reserved</Text>
          <Text style={styles.text}>You will receive an amount due upon the confirmation of your package by the facility.</Text>
          <View>
              <Button title={"Package"}  onPress={() => props.navigation.navigate('PACKAGE')} children={'cubes'} /> 
            </View> 
        </View>
      </View>
    )}
    <Spinner
      visible={spinner}
      textStyle={{ color: "#fff" }}
      overlayColor="rgba(0,0,0,0.5)"
    />
    </>
  )
}