import React, { useEffect, useState } from 'react' 
import Icon from 'react-native-vector-icons/Ionicons'; 
import Feather from 'react-native-vector-icons/Feather';
import { View, Text, Image, TouchableOpacity, StatusBar, ScrollView, useColorScheme } from 'react-native';
import styles from './styles'
import { firebase } from '../../firebase/config'
import { Avatar } from 'react-native-elements'
import Dialog from "react-native-dialog"
import Spinner from 'react-native-loading-spinner-overlay'
import { Restart } from '../../components/reload/reload'

export default function Profile(props) {
  const userData = props.extraData
  const scheme = useColorScheme()
  const [spinner, setSpinner] = useState(false)
  console.log(props.route)
  const goDetail = () => {
    props.navigation.navigate('Detail', { userData: userData })
  } 

  const gotToHistory = () => {
    props.navigation.navigate('History', { userData: userData })
  }

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
    <View style={[styles.container , {paddingTop: StatusBar.currentHeight}]}>
      <StatusBar barStyle= { scheme.dark ? "light-content" : "dark-content" }/>
      <ScrollView style={{marginTop: "8%"}}>
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
          <View style={{flex: 1 ,flexDirection: "column" }}>
              <View style={styles.itemCount}>
                <Text style={styles.count}>21</Text>
                <Image source={require('../../../assets/images/Package.png')}/> 
              </View> 
              <View style={styles.itemCount}>
                <Text style={styles.count}>13</Text>
                <Image source={require('../../../assets/images/plane.png')}/> 
              </View> 
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
</View>
    // <View style={styles.container}>
    //   <StatusBar barStyle="light-content" />
    //   <ScrollView style={{ flex: 1, width: '100%' }}>
    //     <View style={styles.main}>
    //       <View style={styles.avatar}>
    //         <Avatar
    //           size="xlarge"
    //           rounded
    //           title="NI"
    //           source={{ uri: userData.avatar }}
    //         />
    //       </View>
    //       <Text style={scheme === 'dark' ? styles.darkfield : styles.field}>Name:</Text>
    //       <Text style={scheme === 'dark' ? styles.darktitle : styles.title}>{userData.fullName}</Text>
    //       <Text style={scheme === 'dark' ? styles.darkfield : styles.field}>Mail:</Text>
    //       <Text style={scheme === 'dark' ? styles.darktitle : styles.title}>{userData.email}</Text>
    //       <TouchableOpacity style={styles.button} onPress={goDetail}>
    //         <Text style={styles.buttonText}>Edit</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity style={styles.deletebutton} onPress={showDialog}>
    //         <Text style={styles.buttonText}>Account delete</Text>
    //       </TouchableOpacity>
    //       <View style={styles.footerView}>
    //         <Text onPress={signOut} style={styles.footerLink}>Sign out</Text>
    //       </View>
    //     </View>
    //   </ScrollView>
    //   <Dialog.Container visible={visible}>
    //     <Dialog.Title>Account delete</Dialog.Title>
    //     <Dialog.Description>
    //       Do you want to delete this account? You cannot undo this action.
    //     </Dialog.Description>
    //     <Dialog.Button label="Cancel" onPress={handleCancel} />
    //     <Dialog.Button label="Delete" onPress={accountDelete}  />
    //   </Dialog.Container>
    // </View>
  )
}