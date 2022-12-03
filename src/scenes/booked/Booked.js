import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, Image, TextInput , Switch, KeyboardAvoidingView, Platform, StatusBar} from 'react-native';
import styles from './styles' 
import { firebase } from '../../firebase/config'
import { Avatar } from 'react-native-elements' 
import Button from '../../components/Button'
import WhiteButton from '../../components/Button/WhiteButton'
import Spinner from 'react-native-loading-spinner-overlay' 
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import uuid from 'react-native-uuid';
import Dialog from "react-native-dialog"; 

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
  const [visible, setVisible] = useState(false);
  const [dialogTitle, setdialogTitle] = useState('');   
  const [itemList,setItemLists] = useState(packageData.items);
  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [validation, setValidation] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{flex:1, flexDirection: 'row', paddingLeft: 15, paddingTop: Platform.OS === 'android' ? 10 : 0}} onPress={goBackPage}>
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
    itemList.forEach(item => {  
      if(item.wgt !== undefined && item.price !== undefined){
        setValidation(true)
      }
    })
  }, [navigation]);

  const goBackPage = () => {
    navigation.goBack(); 
  }

  const setWeight = (text, index) => {
    setValidation(true)
    let newItem = packageData.items[index];
    newItem.wgt = text;
    setPackageData(prevState => ({
        ...prevState,
        [packageData.items[index]]: newItem
    }));
  }

  const setPrice = (text, index) => {
    setValidation(true)
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
    const generateUuid = uuid.v4();
    let getUuid;
    if(Platform.OS === 'android'){ 
      getUuid = generateUuid.replace('-', '');
    }else{ 
      getUuid = generateUuid.replaceAll('-', '');
    }
    const updatePackages = { 
      trackingStatus : "confirmed"
    } 
    const getPackages = firebase.firestore().collection('packages').doc(packageData.id);
    getPackages.update(updatePackages);

    const msgData = { 
      id: getUuid,
      user : userData.id,
      msg :  "Your reserved package "+ packageData.id.slice(0,8).toUpperCase() + " is now confirmed.",
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
    navigation.navigate('TripDetails'); 
    setConfiremd(true);
  }

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState) 
    const updatePackages = { 
      status : !isEnabled === true ? "Paid" : "Unpaid"
    }
    const getPackages = firebase.firestore().collection('packages').doc(packageData.id);
    getPackages.update(updatePackages);
  };

  const showDialog = () => { 
    setVisible(true) 
    setShowInput(false)
    {tripData.trackingStatus === "Arrive" ? (
      setdialogTitle("The package has been picked up!") 
    ): (
      setdialogTitle("Are you sure to refuse the trip reservation?")
    )}
  }

  const removeItem = (index) => {  
    const remainItem = packageData.items.filter(data => {
      return data.item !== packageData.items[index].item 
    })
    setPackageData(prevState => ({
        ...prevState, items : remainItem
    })); 
    const updatePackages = {  
      items : remainItem
    } 
    const getPackages = firebase.firestore().collection('packages').doc(packageData.id);
    getPackages.update(updatePackages);
  }

  const saveData = () => {   
    if(validation === false){
      showDialog(); 
      setdialogTitle("Missing your item's Price or Weight")
    }else{   
      setSpinner(true);
      const generateUuid = uuid.v4();
      let getUuid;
      if(Platform.OS === 'android'){ 
        getUuid = generateUuid.replace('-', '');
      }else{ 
        getUuid = generateUuid.replaceAll('-', '');
      }
      const updatePackages = { 
        status : isEnabled === true ? "Paid" : "Unpaid",
        items : itemList,
        total : totalAmount,
        trackingStatus : "received"
      } 
      
      const getPackages = firebase.firestore().collection('packages').doc(packageData.id);
      getPackages.update(updatePackages);
      navigation.navigate('TripDetails');
  
      const msgData = { 
        id: getUuid,
        user : userData.id,
        msg : userData.fullName.toUpperCase() + "'s package "+ packageData.id.slice(0,8).toUpperCase() + " is now received.",
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
  }

  const checkOut = () => {  
    setVisible(false) 
    const generateUuid = uuid.v4();
    const generateFacilityUuid = uuid.v4();
    let getUuid;
    if(Platform.OS === 'android'){ 
      getUuid = generateUuid.replace('-', '');
    }else{ 
      getUuid = generateUuid.replaceAll('-', '');
    } 
    const updatePackages = { 
      trackingStatus : "Checkout"
    } 
    const getPackages = firebase.firestore().collection('packages').doc(packageData.id);
    getPackages.update(updatePackages);
    const msgData = { 
      id: getUuid,
      user : userData.id,
      msg :  "Your package " + packageData.id.slice(0,8).toUpperCase() + " has been picked-up.",
      type : "checkout",
      timestamp : new Date().toLocaleString('en-US')
    }
    console.log(msgData)
    const notiRef = firebase.firestore().collection('notification')
    notiRef
    .doc(getUuid)
    .set(msgData)
    .catch((error) => {
      alert(error)
    });  

    let getUuidFacility;
    if(Platform.OS === 'android'){ 
      getUuidFacility = generateFacilityUuid.replace('-', '');
    }else{ 
      getUuidFacility = generateFacilityUuid.replaceAll('-', '');
    } 
    const msgDataFacility = { 
      id: getUuidFacility,
      user : tripData.facilityId,
      msg :  userData.fullName.toUpperCase() + "'s package " + tripData.tripId.slice(0,8).toUpperCase() + " has been picked-up.",
      type : "checkout",
      timestamp : new Date().toLocaleString('en-US')
    }
    console.log(msgDataFacility)
    notiRef
    .doc(getUuidFacility)
    .set(msgDataFacility)
    .catch((error) => {
      alert(error)
    }); 

    const checkPackageRef = firebase.firestore().collection('packages')
    checkPackageRef
      .where('tripId', '==', tripData.tripId) 
      .get().then((querySnapshot) => {
        const dataArr = [];
        querySnapshot.forEach(doc => { 
          const data = doc.data(); 
          dataArr.push(data.trackingStatus);   
        })  
        const allEqual = arr => arr.every( v => v === arr[0] )
        console.log(allEqual(dataArr))
        if(allEqual(dataArr) === true){
          const updateTrip = { 
            trackingStatus : "Checkout"
          }  
          const getTrip = firebase.firestore().collection('trips').doc(tripData.tripId);
          getTrip.update(updateTrip)
        }
      }).catch((error) => {
          console.log("Error getting document:", error);
      }); 
    navigation.navigate('TripDetails'); 
  }

  const handleCancel = () => {
    setVisible(false)
  }
    
  const refeseBooking = () => {  
    setSpinner(true);
    const generateUuid = uuid.v4();
    const getUuid = generateUuid.replace('-', '');  
    const updatePackages = { 
      trackingStatus : "refused"
    } 
    const getPackages = firebase.firestore().collection('packages').doc(packageData.id);
    getPackages.update(updatePackages);
    navigation.navigate('TripDetails');

    const msgData = { 
      id: getUuid,
      user : userData.id,
      msg :  "Your reserved package "+ packageData.id.slice(0,8) + " is now refused.",
      type : "refused",
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

  const addList = () => {
    setVisible(true)
    setShowInput(true)
    setdialogTitle("Please add the item and quantity.")
  }

  const addItemData = () => {
    setItemLists(itemList => [{  
      item : item, 
      qty : qty
    },...itemList]); 
    setVisible(false)
  }

  return ( 
    <View style={styles.container}>  
    <StatusBar animated={true} backgroundColor="#FAFAFA" barStyle="dark-content"/>
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

                {packageData.trackingStatus === "confirmed" && ( 
                  <TouchableOpacity onPress={addList} style={{ flexDirection: "row", alignItems: "center" }}> 
                  <Text style={styles.addlabel}> Add Items</Text> 
                    <FontAwesome5 style={styles.addicon} name="plus-circle" size={18} />
                  </TouchableOpacity> 
                )}
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
            {itemList.map((val, index) => (
                <View key={index} style={styles.tableRow}>  
                    <Text style={styles.dectext}>{val.item}</Text>   
                    { confirmed === true || packageData.trackingStatus === "reserved" ? ( 
                      <>
                        <Text style={[styles.text, {flex: 1, textAlign: "right"}]}>{val.qty} x</Text>
                        <TextInput style={[styles.input, {flex: 1, textAlign: "right"}]} value={val.wgt} onChangeText={text => setWeight(text, index)} keyboardType="number-pad" 
                    returnKeyType="done" placeholder={weight} placeholderTextColor='#C2C1D1'/>
                        <TextInput style={[styles.input, {flex: 1, textAlign: "center"}]} value={val.price} onChangeText={text => setPrice(text, index)} keyboardType="number-pad" returnKeyType="done" placeholder={currency}  placeholderTextColor='#C2C1D1'/>
                        <TouchableOpacity onPress={() => removeItem(index)} >
                          <Text style={[styles.text, {flex: 1, textAlign: "right",color: "#990404"}]}>Remove</Text> 
                        </TouchableOpacity>
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

      {tripData.trackingStatus === "Arrive" && (
          <View  style={{marginBottom: "5%"}}>
            <Button title={"Check Out"} children={'caret-square-right'} onPress={showDialog}/> 
          </View> 
      )}
      {packageData.trackingStatus === "confirmed" && (
        <View  style={{marginBottom: "5%"}}>
          <Button title={"Save"} children={'save'} onPress={saveData}/> 
        </View>
      )}
      {packageData.trackingStatus === "reserved" && ( 
          <>
            {confirmed === false && (
              <View  style={{marginBottom: "10%"}}>
                <Button title={"Confirm"} children={'check'} onPress={confirmBooking} /> 
                <WhiteButton title={"Refuse"} children={'remove'} onPress={showDialog} />
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
       {showInput === true ? ( 
          <Dialog.Container visible={visible}>
            <Dialog.Title>{dialogTitle}</Dialog.Title>
            <Dialog.Input label="Item" onChangeText={setItem}/>
            <Dialog.Input label="Qty" onChangeText={setQty}/>
            <Dialog.Button label="Add" onPress={addItemData} />  
            <Dialog.Button label="Cancel" onPress={handleCancel} />  
        </Dialog.Container>
      ): (
        <> 
          {tripData.trackingStatus === "Arrive" ? ( 
            <Dialog.Container visible={visible}>
                <Dialog.Title>{dialogTitle}</Dialog.Title> 
                <Dialog.Button label="Ok" onPress={checkOut} />
            </Dialog.Container>
          ) : (  
            <> 
              {validation === false ? ( 
                <Dialog.Container visible={visible}>
                  <Dialog.Title>{dialogTitle}</Dialog.Title> 
                <Dialog.Button label="Ok" onPress={handleCancel} /> 
              </Dialog.Container>  
            ) : ( 
              <Dialog.Container visible={visible}>
                <Dialog.Title>{dialogTitle}</Dialog.Title> 
                <Dialog.Button label="Yes" onPress={refeseBooking} /> 
                <Dialog.Button label="No" onPress={handleCancel} />
              </Dialog.Container>
            )}  
            </>
          )} 
        </>
      )}
    </View>
  )
}