import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, Image, TextInput , Switch, KeyboardAvoidingView, Platform} from 'react-native';
import styles from './styles'
import { firebase } from '../../firebase/config'
import { Avatar } from 'react-native-elements' 
import Button from '../../components/Button'
import WhiteButton from '../../components/Button/WhiteButton'
import Spinner from 'react-native-loading-spinner-overlay' 
import Icon from 'react-native-vector-icons/Ionicons';
import uuid from 'react-native-uuid';

export default function Booked({route, navigation}) {
  const userData = route.params.user;  
  const tripData = route.params.trip; 
  const currency = tripData.categoryLists[0].currency;
  const weight = tripData.categoryLists[0].weight;
  const [packageData, setPackageData] = useState(route.params.packageInfo);  
  const [totalAmount, setTotalAmount] = useState(0);
  const [confirmed, setConfiremd] = useState(false); 
  const [isEnabled, setIsEnabled] = useState(false);
  const [spinner, setSpinner] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{flex:1, flexDirection: 'row', paddingLeft: 15}} onPress={() => navigation.goBack()}>
          <Icon style={{color: "#1B9494"}} name={"arrow-back-circle-sharp"} size={35} />
          <Text style={{color: "#c8c8c8", paddingLeft: 5, marginTop: 7, fontSize: 17}}>Back To Lists</Text>
        </TouchableOpacity>
      )
    });
    let total = 0;
    packageData.items.forEach(item => {
      if(item.price !== undefined){ 
        total += parseInt(item.price);
      }
    })
    setTotalAmount(total);
    if(packageData.trackingStatus === "confirmed"){
      setConfiremd(true)
    }

    if(packageData.status === "Paid"){
      setIsEnabled(true)
    }
  }, [navigation]);

  const setWeight = (text, index) => {
    let newItem = packageData.items[index];
    newItem.wgt = text;
    setPackageData(prevState => ({
        ...prevState,
        [packageData.items[index]]: newItem
    }));
  }

  const setPrice = (text, index) => {
    let newItem = packageData.items[index];
    newItem.price = text;
    setPackageData(prevState => ({
        ...prevState,
        [packageData.items[index]]: newItem
    }));
    let total = 0;
    packageData.items.forEach(item => {
      if(item.price !== undefined){ 
        total += parseInt(item.price);
      }
    })
    setTotalAmount(total);
  }

  const confirmBooking = () => {  
    setSpinner(true);
    const generateUuid = uuid.v4();
    const getUuid = generateUuid.replaceAll('-', '');  
    const updatePackages = { 
      trackingStatus : "confirmed"
    } 
    const getPackages = firebase.firestore().collection('package').doc(packageData.id);
    getPackages.update(updatePackages);

    const msgData = { 
      id: getUuid,
      user : userData.id,
      msg :  "Your reserved package "+ packageData.id.slice(0,8) + " is now confirmed.",
      type : "confirmed",
      timestamp : new Date().toLocaleString('en-US')
    }
    const notiRef = firebase.firestore().collection('notification')
    notiRef
    .doc(getUuid)
    .set(msgData)
    .catch((error) => {
      alert(error)
    }); 
    setSpinner(false); 
    setConfiremd(true);
  }

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState) 
    const updatePackages = { 
      status : !isEnabled === true ? "Paid" : "Unpaid"
    }
    const getPackages = firebase.firestore().collection('package').doc(packageData.id);
    getPackages.update(updatePackages);
  };

  const saveData = () => {   
    setSpinner(true);
    const generateUuid = uuid.v4();
    const getUuid = generateUuid.replaceAll('-', '');  
    const updatePackages = { 
      status : isEnabled === true ? "Paid" : "Unpaid",
      items : packageData.items,
      total : totalAmount,
      trackingStatus : "received"
    } 
    console.log(updatePackages)
    const getPackages = firebase.firestore().collection('package').doc(packageData.id);
    getPackages.update(updatePackages);
    navigation.navigate('TripDetails');

    const msgData = { 
      id: getUuid,
      user : userData.id,
      msg :  "Your reserved package "+ packageData.id.slice(0,8) + " is now received.",
      type : "receive",
      timestamp : new Date().toLocaleString('en-US')
    }
    const notiRef = firebase.firestore().collection('notification')
    notiRef
    .doc(getUuid)
    .set(msgData)
    .catch((error) => {
      alert(error)
    }); 
    setSpinner(false); 
  }

  const checkOut = () => {   
    setSpinner(true);
    const generateUuid = uuid.v4();
    const getUuid = generateUuid.replaceAll('-', '');  
    const updatePackages = { 
      trackingStatus : "Checkout"
    } 
    const getPackages = firebase.firestore().collection('package').doc(packageData.id);
    getPackages.update(updatePackages);
    const msgData = { 
      id: getUuid,
      user : userData.id,
      msg :  "Your package from "+ packageData.id.slice(0,8) + " has been picked-up.",
      type : "checkout",
      timestamp : new Date().toLocaleString('en-US')
    }
    const notiRef = firebase.firestore().collection('notification')
    notiRef
    .doc(getUuid)
    .set(msgData)
    .catch((error) => {
      alert(error)
    }); 
    setSpinner(false); 
    navigation.navigate('TripDetails'); 
  }
  return ( 
    <View style={styles.container}> 
      <View style={styles.tripHeader}> 
          <Text style={styles.mainText}>BOOKED TRIP</Text> 
      </View> 
      <View style={styles.item}> 
          <View style={{flex: 1, alignContent: "center"}}> 
            <Avatar
              size="large"
              rounded
              title="NI"
              source={{ uri: userData.avatar }}
            />  
          </View> 
          <View style={{flex: 2, alignItems: 'flex-start', paddingLeft: "5%", justifyContent: "center"}}>
              <Text style={styles.title}>{userData.fullName}</Text>  
          </View>
          <View style={{flex: 1 ,flexDirection: "column" }}>
              <View style={styles.itemCount}>
              <Text style={styles.title}>{packageData.items.length}</Text>
              <Image source={require('../../../assets/images/Package.png')} style={{ marginBottom: 10 }}/> 
              </View> 
              <View style={styles.itemCount}>
              <Text style={styles.totalLabel}>{packageData.status}</Text>
              <Image source={require('../../../assets/images/cashImg.png')}/> 
              </View> 
          </View>
      </View> 
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >   
        <View style={{flex: 6}}>
            <View style={styles.tripHeader}> 
                <Text style={styles.mainText}>RESERVED ITEMS</Text> 
            </View>
            <View style={styles.itemList}> 
                <View style={styles.tableTitle}> 
                    <Text style={[styles.tableTitledec]}>Item Description</Text> 
                    {confirmed === true || packageData.trackingStatus === "reserved" ? ( 
                      <>
                        <Text style={[styles.tableTitleText, {flex: 1, textAlign: "center"}]}> Qty </Text> 
                        <Text style={[styles.tableTitleText, {flex: 1, textAlign: "center"}]}> Wgt </Text> 
                        <Text style={[styles.tableTitleText, {flex: 1, textAlign: "center"}]}> $ </Text> 
                        <Text style={[styles.tableTitleText, {flex: 1, textAlign: "right"}]}>Manage</Text> 
                      </>
                    ): (
                      <>
                      <Text style={[styles.tableTitleText, {flex: 1,textAlign: "right"}]}> Qty </Text> 
                        <Text style={[styles.tableTitleText, {flex: 1,textAlign: "right"}]}> Wgt </Text> 
                        <Text style={[styles.tableTitleText, {flex: 2, textAlign: "right", marginRight: 20}]}> $ </Text> 
                      </>
                    )}
                </View>
            </View> 
            {packageData.items.map((val, index) => (
                <View key={index} style={styles.tableRow}>  
                    <Text style={styles.dectext}>{val.item}</Text>   
                    { confirmed === true || packageData.trackingStatus === "reserved" ? ( 
                      <>
                        <Text style={[styles.text, {flex: 1, textAlign: "right"}]}>{val.qty} x</Text>
                        <TextInput style={[styles.input, {flex: 1, textAlign: "right"}]} value={val.wgt} onChangeText={text => setWeight(text, index)} keyboardType="number-pad" 
                    returnKeyType="done" placeholder="Wgt"/>
                        <TextInput style={[styles.input, {flex: 1, textAlign: "center"}]} value={val.price} onChangeText={text => setPrice(text, index)} keyboardType="number-pad"                   returnKeyType="done" placeholder="$"/>
                        <Text style={[styles.text, {flex: 1, textAlign: "right",color: "#990404"}]}>Remove</Text> 
                      </>
                    ) : (
                      <>
                      <Text style={[styles.text, {flex: 1, textAlign: "center"}]}>{val.qty} x</Text>
                        <Text style={[styles.text, {flex: 1, textAlign: "center"}]}>{val.wgt} {weight}</Text>  
                        <Text style={[styles.text, {flex: 2, textAlign: "right"}]}>{val.price} {currency}</Text>  
                      </>
                    )}
                </View>
            ))}   
            <View style={styles.amountRow}>  
                <View style={styles.amountText}>
                  <Text style={styles.totalLabel}>TOTAL AMOUNT </Text>
                  <Text style={[styles.totalLabel, {textAlign: 'right'}]}>{totalAmount} {currency}</Text> 
                </View>
                {packageData.trackingStatus !== "reserved" && (   
                  <View style={styles.switchRow}>
                    <Text style={styles.totalLabel}>Unpaid</Text>  
                    <Switch
                        style={styles.switchBtn}
                        trackColor={{ false: "#767577", true: "#2797A6" }}
                        thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                      />
                      <Text style={styles.totalLabel}>Paid</Text>  
                  </View>
                  )}
            </View>
        </View>     
      </KeyboardAvoidingView>
      {packageData.trackingStatus !== "reserved" ? ( 
        <>
          {tripData.trackingStatus === "Arrive" && (
              <View  style={{marginBottom: "5%"}}>
                <Button title={"Check Out"} children={'caret-square-right'} onPress={checkOut}/> 
              </View> 
          )}
          {tripData.trackingStatus === "Arrive" && (
            <View  style={{marginBottom: "5%"}}>
              <Button title={"Save"} children={'save'} onPress={saveData}/> 
            </View>
          )}
        </>
        ) :
        (
          <>
            {confirmed === false && (
              <View  style={{marginBottom: "10%"}}>
                <Button title={"Confirm"} children={'check'}  onPress={confirmBooking} /> 
                <WhiteButton title={"Refuse"} children={'remove'}/>
              </View> 
              )}
          </>
        )
      }
      <Spinner
        visible={spinner}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </View>
  )
}