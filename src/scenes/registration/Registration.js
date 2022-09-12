import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Linking, StatusBar, useColorScheme } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles';
import { firebase } from '../../firebase/config'
import Spinner from 'react-native-loading-spinner-overlay'

export default function Registration({route, navigation}) {
  const { userType } = route.params.userType
  const [avatar, setAvatar] = useState('')
  const [gender, setGender] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [spinner, setSpinner] = useState(false)
  const scheme = useColorScheme()

  console.log(userType)
  
  const onFooterLinkPress = () => {
    navigation.navigate('Login')
  }

  const ImageChoiceAndUpload = async () => {
    try {
      if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert("Permission is required for use.");
          return;
        }
      }
      const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
          const actions = [];
          actions.push({ resize: { width: 300 } });
          const manipulatorResult = await ImageManipulator.manipulateAsync(
            result.uri,
            actions,
            {
              compress: 0.4,
            },
          );
          const localUri = await fetch(manipulatorResult.uri);
          const localBlob = await localUri.blob();
          const filename = userData.id + new Date().getTime()
          const storageRef = firebase.storage().ref().child(`avatar/${userData.id}/` + filename);
          const putTask = storageRef.put(localBlob);
          putTask.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(parseInt(progress) + '%')
          }, (error) => {
            console.log(error);
            alert("Upload failed.");
          }, () => {
            putTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              setProgress('')
              setAvatar(downloadURL)
            })
          })
        }
    } catch (e) {
        console.log('error',e.message);
        alert("The size may be too much.");
    }
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
          avatar: avatar,
          phone: phoneNo,
          address: address,
          type : userType
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
      <StatusBar barStyle="light-content" />
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%'}}
        keyboardShouldPersistTaps="always"> 
         { userType === "facility" ? (
            <View style={styles.logoBox}>
              <Image source={require('../../../assets/images/Facility.png')} style={{ width: 209,resizeMode: 'center', height: 138}}/>
            </View> 
          ) : ( 
            <View style={{ flex: 2 , justifyContent: 'center' , alignItems: 'center'  }}>
              <Image source={require('../../../assets/images/photoFrame.png')} style={{ width: 85,resizeMode: 'center', height: 89, marginBottom: '2%'}}/>
              <TouchableOpacity onPress={ImageChoiceAndUpload}>
                <Image source={require('../../../assets/images/uploadBtn.png')} style={{ width: 83,resizeMode: 'center', height: 30, marginVertical: "5%"}}/>
              </TouchableOpacity> 
            </View> 
        )}
        <Text style={styles.inputLabel}>Full Name</Text>
        <TextInput
          style={scheme === 'dark' ? styles.darkinput : styles.input}
          placeholder='Please Fill Your Name'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        /> 
        {/* <Text style={styles.inputLabel}>Gender</Text>
        <CheckBox
          title='Male'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={false}
          onPress={() => setGender("male")}
          containerStyle={{backgroundColor : "none"}}
        />
        <CheckBox
          title='Female'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={() =>setGender("female")}
        /> */}
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={scheme === 'dark' ? styles.darkinput : styles.input}
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
          style={scheme === 'dark' ? styles.darkinput : styles.input}
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
          style={scheme === 'dark' ? styles.darkinput : styles.input}
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
          style={scheme === 'dark' ? styles.darkinput : styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder='Your Address'
          onChangeText={(text) => setAddress(text)}
          value={address}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Text style={styles.inputLabel}> Phone Number </Text>
        <TextInput
          style={scheme === 'dark' ? styles.darkinput : styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder='Your Phone Number +65XXXXXXXX '
          onChangeText={(text) => setPhoneNo(text)}
          value={phoneNo}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}>
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={scheme === 'dark' ? styles.darkfooterText : styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
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
