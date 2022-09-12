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

  const goDetail = () => {
    props.navigation.navigate('Detail', { userData: userData })
  }

  const signOut = () => {
    setSpinner(true); 
    firebase.auth().signOut().then(function() {
      setSpinner(false); 
      Restart();
    });
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
          <View style={{flex: 3, alignItems: 'flex-start', paddingTop: 10}}>
              <Text style={styles.title}>{userData.fullName}</Text>  
              <Text style={styles.subtitle}>{userData.email}</Text>
              <Text style={styles.text}>Facility ID:NYC001</Text>
          </View>
          <View style={{flex: 1 ,flexDirection: "column",paddingTop: 10 }}>
              <View style={styles.itemCount}>
                <Text style={styles.count}>2127</Text>
                <Image source={require('../../../assets/images/Package.png')} style={{ width: 28,resizeMode: 'center', height: 27 }}/> 
              </View> 
              <View style={styles.itemCount}>
                <Text style={styles.count}>213</Text>
                <Image source={require('../../../assets/images/plane.png')} style={{ width: 28,resizeMode: 'center', height: 20}}/> 
              </View> 
          </View>
      </View> 
      <View style={styles.account}> 
          <Text style={styles.accountTitle}>Account</Text> 
          <TouchableOpacity style={styles.accountLabel} onPress={goDetail}> 
            <Icon style={styles.icon} name='person-outline' size={16} />
            <Text style={styles.accountText}>Personal Information</Text>  
            <Icon style={styles.righticon} name='chevron-forward' size={16} />
          </TouchableOpacity> 
          <TouchableOpacity style={styles.accountLabel}>
            <Icon style={styles.icon} name='person-outline' size={16} />
            <Text style={styles.accountText}>Facility Information</Text>  
            <Icon style={styles.righticon} name='chevron-forward' size={16} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountLabel}>  
            <Icon style={styles.icon} name='reader-outline' size={16} />
            <Text style={styles.accountText}>Transaction History</Text> 
            <Icon style={styles.righticon} name='chevron-forward' size={16} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountLabel}>
            <Feather style={styles.icon} name='settings' size={16} />
            <Text style={styles.accountText} onPress={signOut} >Sign Out</Text>
            <Icon style={styles.righticon} name='chevron-forward' size={16} />
          </TouchableOpacity>
      </View> 
      <View style={styles.account}> 
          <Text style={styles.accountTitle}>Support</Text> 
          <TouchableOpacity style={styles.accountLabel}> 
            <Icon style={styles.icon} name='person-outline' size={16} />
            <Text style={styles.accountText}>How PackX Works? </Text>  
            <Icon style={styles.righticon} name='chevron-forward' size={16} />
          </TouchableOpacity>  
          <TouchableOpacity style={styles.accountLabel}>  
            <Icon style={styles.icon} name='reader-outline' size={16} />
            <Text style={styles.accountText}>FAQ</Text> 
            <Icon style={styles.righticon} name='chevron-forward' size={16} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountLabel}>
            <Feather style={styles.icon} name='pie-chart' size={16} />
            <Text style={styles.accountText}>Get Help</Text>
            <Icon style={styles.righticon} name='chevron-forward' size={16} />
          </TouchableOpacity>
      </View> 
      <View style={styles.account}> 
          <Text style={styles.accountTitle}>Legal</Text> 
          <TouchableOpacity style={styles.accountLabel}> 
            <Icon style={styles.icon} name='person-outline' size={16} />
            <Text style={styles.accountText}>Terms of Service</Text>  
            <Icon style={styles.righticon} name='chevron-forward' size={16} />
          </TouchableOpacity>  
          <TouchableOpacity style={styles.accountLabel}>  
            <Icon style={styles.icon} name='reader-outline' size={16} />
            <Text style={styles.accountText}>Privacy Policy</Text> 
            <Icon style={styles.righticon} name='chevron-forward' size={16} />
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