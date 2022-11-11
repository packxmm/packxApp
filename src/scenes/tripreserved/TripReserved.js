import React, {useState} from 'react'; 
import { StatusBar, View, Text, Image , TouchableOpacity, TextInput, ScrollView, SafeAreaView} from 'react-native';  
import uuid from 'react-native-uuid';
import Spinner from 'react-native-loading-spinner-overlay' 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { firebase } from '../../firebase/config'
import styles from './styles'
import Button from '../../components/Button'
import WhiteButton from '../../components/Button/WhiteButton'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Dialog from "react-native-dialog"

export default function TripReserved(props) {
  const tripData = props.route.params.tripInfo;  
  const userData = props.route.params.user;   
  const [spinner, setSpinner] = useState(false);
  const [isConfirmed,setConfirmed] = useState(false);
  const [itemList,setItemLists] = useState([]);
  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(null);
  const [recName, setReceiverName] = useState(null)
  const [recContact, setReceiverContact] = useState(null)
  const [visible, setVisible] = useState(false);
  const [dialogTitle, setdialogTitle] = useState('');
  const [dialogDes, setdialogDes] = useState('');
  const [showConfirm, setShowConfirmed] = useState(false);
  const [showInput, setShowInput] = useState(false);
  
  const addList = () => {
    setVisible(true)
    setShowInput(true)
    setShowConfirmed(true)
    setdialogTitle("Please add the item and quantity.")
  }

  const addItemData = () => {
    setItemLists(itemList => [{  
      item : item, 
      qty : qty
    },...itemList]); 
    setVisible(false)
  }

  const showDialog = () => {
    console.log(itemList)
    setShowInput(false)
    setVisible(true)
    if(itemList.length === 0){
      setdialogTitle("Please add the items")
      setdialogDes("Please add the items for your package reserved.")
    }else{ 
      if(recName === null || recContact === null){ 
        setdialogTitle("Receiver Information")
        setdialogDes("Please add the receiver information for your package reserved.")
        setShowConfirmed(false)
      }else{ 
        setdialogTitle("Confirm Your Package")
        setdialogDes("Please confirm your package reserved.")
        setShowConfirmed(true)
      }
    }
  }

  const handleCancel = () => {
    setVisible(false)
  }

  function confirmData(){ 
    setVisible(false);
    setSpinner(true); 
    const generateUuid = uuid.v4();
    let getUuid;
    if(Platform.OS === 'android'){ 
      getUuid = generateUuid.replace('-', '');
    }else{ 
      getUuid = generateUuid.replaceAll('-', '');
    }
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
        msg :  userData.fullName.toUpperCase() + " has reserved her packages at "+ tripData.tripId.slice(0,8).toUpperCase() + " trip.",
        type : "reserved",
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
  }
  return (  
    <>
    {isConfirmed === false ? (
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
        <Text style={styles.title}>Reserve your package </Text> 
        <Text style={styles.subtitle}>Package Summary</Text> 
        <View style={{flex: 2, flexDirection: "column" ,paddingHorizontal: 20  }}>  
           {itemList.length != 0 ? (
            <>
              <View style={styles.itemHeader} > 
                <Text style={styles.itemTitle}>Item Description</Text>
                <Text style={styles.itemTitle}>Qty</Text>
              </View>   
              <ScrollView>
              {itemList.map((data, index ) => (
                <View style={styles.itemRow} key={index}>
                  <Text style={styles.deslabel}> {data.item}</Text>  
                  <Text style={styles.deslabel}> {data.qty} x </Text>  
                </View>
              ))}
              </ScrollView>
              <TouchableOpacity onPress={addList} style={{ flexDirection: "row", justifyContent: 'center' }}> 
                <FontAwesome5 style={styles.addicon} name="plus-circle" size={23} />
                <Text style={styles.addlabel}> Add Items</Text> 
              </TouchableOpacity> 
            </>
            ) : ( 
              <View style={{flex: 3, flexDirection: "column" , alignItems: 'center' , justifyContent: 'center' }}>
                <FontAwesome5 style={styles.addicon} name="box-open" size={50} />
                <Text style={[styles.itemTitle, {textAlign: 'center'}]}>Your Package is Empty!</Text>
                <Text style={[styles.deslabel, {textAlign: 'center'} ]}>Please add the items and quantity Here.</Text>
                <TouchableOpacity onPress={addList} style={{ flexDirection: "row", justifyContent: 'center', marginTop: 20 }}> 
                  <FontAwesome5 style={styles.addicon} name="plus-circle" size={23} />
                  <Text style={styles.addlabel}> Add Items</Text> 
                </TouchableOpacity> 
              </View>
            )} 
        </View> 
        <View style={{ flexDirection: "column", justifyContent: "center", paddingHorizontal: 20}}>
            <Text style={styles.inputLabel}>Receiver Name</Text>
            <KeyboardAwareScrollView
            style={{ width: '100%'}}
            keyboardShouldPersistTaps="always"> 
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
            </KeyboardAwareScrollView>
          <Button title={"Confirm"} onPress={showDialog} children={'check'} /> 
          <WhiteButton title={"Cancel"} onPress={() => props.navigation.navigate('TripInfo')} children={'remove'}/>
        </View>
      </SafeAreaView>
    ) : ( 
      <View style={{ flex: 1 }}>
        <StatusBar barStyle= {"dark-content"}/>
        <View style={styles.packageContainer}>
          <View style={styles.logoBox}>
            <Image source={require('../../../assets/images/PackXLogo.png')}/>
          </View>
          <Image source={require('../../../assets/images/successPack.png')} style={styles.introImg}/>
          <Text style={styles.title}>Your package</Text>
          <Text style={styles.title}>has been reserved</Text>
          <Text style={styles.text}>You will receive an amount due upon the confirmation of your package by the facility when you drop off your packages at the address of facility.</Text>
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
        {showInput === true ? ( 
          <Dialog.Container visible={visible}>
            <Dialog.Title>{dialogTitle}</Dialog.Title>
            <Dialog.Input label="Item" onChangeText={setItem}/>
            <Dialog.Input label="Qty" onChangeText={setQty}/>
            <Dialog.Button label="Add" onPress={addItemData} />  
            <Dialog.Button label="Cancel" onPress={handleCancel} />  
        </Dialog.Container>
        ): ( 
          <Dialog.Container visible={visible}>
            <Dialog.Title>{dialogTitle}</Dialog.Title>
            <Dialog.Description>
            {dialogDes} 
            </Dialog.Description>  
            {showConfirm === false ? ( 
              <Dialog.Button label="Cancel" onPress={handleCancel} /> 
            ):( 
              <Dialog.Button label="Confirm" onPress={confirmData} />  
            )}
        </Dialog.Container>
        )}
    </>
  )
}