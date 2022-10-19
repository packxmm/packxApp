import React, { useEffect, useState } from 'react' 
import Icon from 'react-native-vector-icons/Ionicons'; 
import Feather from 'react-native-vector-icons/Feather';
import { View, Text, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import styles from './styles'
import { firebase } from '../../firebase/config'
import { Avatar } from 'react-native-elements'
import Dialog from "react-native-dialog"
import Spinner from 'react-native-loading-spinner-overlay'
import { Restart } from '../../components/reload/reload'

export default function Profile(props) {
  const userData = props.extraData 
  const [spinner, setSpinner] = useState(false)
  const [totalPackages, setPackageTotal] = useState(); 
  const [packagesLists, setPackageLists] = useState(); 
  const [totalTrip, setTripTotal] = useState(); 
  console.log(props.route)
  const goDetail = () => {
    props.navigation.navigate('Detail', { userData: userData })
  } 

  const gotToHistory = () => {
    props.navigation.navigate('History', { userData: userData })
  }

  useEffect(() => {    
    const tripsRef = firebase.firestore().collection('trips') 
    tripsRef
    .where('facilityId', '==', userData.id) 
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
      .collection('package') 
      .where('userId', '==', userData.id) 
      .get().then((querySnapshot) => {
        const dataArr = [];
        querySnapshot.forEach(doc => { 
          const data = doc.data();
          dataArr.push(data);   
        })  
        setPackageLists(dataArr.length); 
        setSpinner(false); 
        getData();
    }).catch((error) => {
        console.log("Error getting document:", error);
    });  
  }, []); 

  const signOut = () => {
    console.log("sign out")
    setSpinner(true); 
    firebase.auth().signOut(); 
    setTimeout(function(){
      setSpinner(false)
      Restart();
    }, 1000)
  }

  const showDialog = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const accountDelete = async () => {
    setSpinner(true)
    const collectionRef = firebase.firestore()
    await collectionRef.collection('tokens').doc(userData.id).delete()
    await collectionRef.collection('users').doc(userData.id).delete()
    const user = firebase.auth().currentUser
    user.delete().then(function() {
      setSpinner(false)
      firebase.auth().signOut()
    }).catch(function(error) {
      setSpinner(false)
      console.log(error)
    });
  }
  
  return ( 
      <ScrollView style={styles.container}>
      <StatusBar/>
      <View style={styles.item}> 
          <View style={{flex: 2, alignContent: "center"}}>  
              <Avatar
                size="large"
                rounded
                title="NI"
                source={{ uri: userData.avatar }}
              />
          </View> 
          <View style={{flex: 4, alignItems: 'flex-start'}}>
              <Text style={styles.title}>{userData.facilityName}</Text>
              <Text style={styles.subtitle}>{userData.fullName}</Text>  
              <Text style={styles.text}>{userData.email}</Text>
          </View>
          <View style={{flex: 1 ,flexDirection: "column", paddingTop: "2%" }}>
            { userData.type === "facility" ? (
                <> 
                  <View style={styles.itemCount}>
                    <Text style={styles.count}>{totalPackages}</Text>
                    <Image source={require('../../../assets/images/Package.png')}/> 
                  </View> 
                  <View style={styles.itemCount}>
                    <Text style={styles.count}>{totalTrip}</Text>
                    <Image source={require('../../../assets/images/plane.png')}/> 
                  </View> 
                </>
              ) : (  
                <View style={styles.itemCount}>
                  <Text style={styles.count}>{packagesLists}</Text>
                  <Image source={require('../../../assets/images/Package.png')}/> 
                </View> 
            )}
          </View>
      </View> 
      <View style={styles.account}> 
          <Text style={styles.accountTitle}>Account</Text> 
          <TouchableOpacity style={styles.accountLabel} onPress={goDetail}> 
            <Icon style={styles.icon} name='person-outline' size={16} />
            <Text style={styles.accountText}>Personal Information</Text>  
            <Icon style={styles.righticon} name='chevron-forward' size={18} />
          </TouchableOpacity> 
          {/* <TouchableOpacity style={styles.accountLabel}>
            <Icon style={styles.icon} name='person-outline' size={16} />
            <Text style={styles.accountText}>Facility Information</Text>  
            <Icon style={styles.righticon} name='chevron-forward' size={18} />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.accountLabel} onPress={gotToHistory}>  
            <Icon style={styles.icon} name='reader-outline' size={16} />
            <Text style={styles.accountText}>Transaction History</Text> 
            <Icon style={styles.righticon} name='chevron-forward' size={18} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountLabel} onPress={signOut}>
            <Feather style={styles.icon} name='settings' size={16} />
            <Text style={styles.accountText} >Sign Out</Text>
            <Icon style={styles.righticon} name='chevron-forward' size={18} />
          </TouchableOpacity>
      </View> 
      <View style={styles.account}> 
          <Text style={styles.accountTitle}>Support</Text> 
          <TouchableOpacity style={styles.accountLabel}> 
            <Icon style={styles.icon} name='person-outline' size={16} />
            <Text style={styles.accountText}>How PackX Works? </Text>  
            <Icon style={styles.righticon} name='chevron-forward' size={18} />
          </TouchableOpacity>  
          <TouchableOpacity style={styles.accountLabel}>  
            <Icon style={styles.icon} name='reader-outline' size={16} />
            <Text style={styles.accountText}>FAQ</Text> 
            <Icon style={styles.righticon} name='chevron-forward' size={18} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountLabel}>
            <Feather style={styles.icon} name='pie-chart' size={16} />
            <Text style={styles.accountText}>Get Help</Text>
            <Icon style={styles.righticon} name='chevron-forward' size={18} />
          </TouchableOpacity>
      </View> 
      <View style={styles.account}> 
          <Text style={styles.accountTitle}>Legal</Text> 
          <TouchableOpacity style={styles.accountLabel}> 
            <Icon style={styles.icon} name='person-outline' size={16} />
            <Text style={styles.accountText}>Terms of Service</Text>  
            <Icon style={styles.righticon} name='chevron-forward' size={18} />
          </TouchableOpacity>  
          <TouchableOpacity style={styles.accountLabel}>  
            <Icon style={styles.icon} name='reader-outline' size={16} />
            <Text style={styles.accountText}>Privacy Policy</Text> 
            <Icon style={styles.righticon} name='chevron-forward' size={18} />
          </TouchableOpacity> 
      </View> 
      <Spinner
        visible={spinner}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </ScrollView> 
  )
}