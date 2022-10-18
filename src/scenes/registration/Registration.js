import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Linking, StatusBar } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles';
import { firebase } from '../../firebase/config'
import Spinner from 'react-native-loading-spinner-overlay'
import Icon from 'react-native-vector-icons/Ionicons';

export default function Registration({route, navigation}) {
  const userType = route.params.userType;
  const [fullName, setFullName] = useState('')
  const [facilityName, setFacilitylName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [spinner, setSpinner] = useState(false)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{flex:1, flexDirection: 'row', paddingLeft: 15}} onPress={() => navigation.goBack()}>
          <Icon style={{color: "#1B9494"}} name={"chevron-back"} size={30} />
          <Text style={{color: "#c8c8c8", paddingTop: 5, fontSize: 18}}>Back</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const onFooterLinkPress = () => {
    navigation.navigate('Login', { userType : userType})
  }

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.")
      return
    }
    setSpinner(true)
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid
        const data = {
          id: uid,
          email,
          fullName,
          avatar: "https://firebasestorage.googleapis.com/v0/b/packx-e600f.appspot.com/o/profileImage%2FphotoFrame.png?alt=media&token=4e8a2851-abbf-4e9e-9ce7-5fc861a95004",
          phone: phoneNo,
          address: address,
          type: route.params.userType
        };
        const usersRef = firebase.firestore().collection('users')
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate('Home', {user: data})
          })
          .catch((error) => {
            setSpinner(false)
            alert(error)
          });
      })
      .catch((error) => {
        setSpinner(false)
        alert(error)
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%'}}
        keyboardShouldPersistTaps="always"> 
         { userType === "facility" ? (
            <View style={styles.logoBox}>
              <Image source={require('../../../assets/images/Facility.png')} style={{ width: 209,resizeMode: 'center', height: 138}}/>
            </View> 
          ) : (  
            <View style={styles.logoBox}>
              <Image source={require('../../../assets/images/User.png')} style={{ width: 209,resizeMode: 'center', height: 138}}/>
            </View> 
        )}
        <Text style={styles.inputLabel}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder='Please Fill Your Name'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />  
        { userType === "facility" && (
          <>
           <Text style={styles.inputLabel}>Facility Name</Text>
           <TextInput
             style={styles.input}
             placeholder='Please Fill Your Company Name'
             placeholderTextColor="#aaaaaa"
             onChangeText={(text) => setFacilitylName(text)}
             value={facilityName}
             underlineColorAndroid="transparent"
             autoCapitalize="none"
           />  
          </>
        )}
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder='Your email thina@abc.com '
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          keyboardType={'email-address'}
        />
        <Text style={styles.inputLabel}>Set Password</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder='Confirm Password'
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Text style={styles.inputLabel}> Address</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder='Your Address'
          onChangeText={(text) => setAddress(text)}
          value={address}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Text style={styles.inputLabel}> Phone Number </Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder='Your Phone Number +65XXXXXXXX '
          onChangeText={(text) => setPhoneNo(text)}
          value={phoneNo}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}>
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
        </View>
        <Text style={styles.link} onPress={ ()=>{ Linking.openURL('https://github.com/kiyohken2000/reactnative-expo-firebase-boilerplate')}}>Require agree EULA</Text>
      </KeyboardAwareScrollView>
      <Spinner
        visible={spinner}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </View>
  )
}
