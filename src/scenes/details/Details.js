import React, { useEffect, useState } from 'react'
import { View, Text,TextInput, Image, TouchableOpacity, ScrollView, useColorScheme, StatusBar} from 'react-native'; 
import styles from './styles'
import { firebase } from '../../firebase/config'
import { Avatar } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import Constants from 'expo-constants' 
import Button from '../../components/Button'
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function Detail({ route, navigation }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNo, setPhone] = useState('')
  const [progress, setProgress] = useState('')
  const [avatar, setAvatar] = useState("https://firebasestorage.googleapis.com/v0/b/packx-e600f.appspot.com/o/profileImage%2FphotoFrame.png?alt=media&token=4e8a2851-abbf-4e9e-9ce7-5fc861a95004")
  const userData = route.params.userData
  const scheme = useColorScheme()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{flex:1, flexDirection: 'row', paddingLeft: 15}} onPress={() => navigation.goBack()}>
          <Icon style={{color: "#1B9494"}} name={"arrow-back-circle-sharp"} size={35} />
          <Text style={{color: "#c8c8c8", paddingLeft: 5, marginTop: 7, fontSize: 17}}>Back To Profile</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  useEffect(() => {
    setAvatar(userData.avatar)
    setFullName(userData.fullName)
    setEmail(userData.email)
    setPhone(userData.phone)
  },[])

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

  const profileUpdate = () => {
    const data = {
      id: userData.id,
      email: userData.email,
      fullName: fullName,
      avatar: avatar,
      phone: phoneNo,
    }
    const userRef = firebase.firestore().collection('users').doc(userData.id)
    userRef.update(data)
    navigation.goBack()
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%'}}
        keyboardShouldPersistTaps="always">
        <StatusBar barStyle="dark-content" />
          <View style={{ flex: 1 , justifyContent: 'center' , alignItems: 'center'  }}>
            <Avatar
              containerStyle={{borderColor: "#ffffff", borderWidth: 5}}
              size="large"
              rounded
              title="NI"
              source={{ uri: avatar }}
            /> 
            <TouchableOpacity onPress={ImageChoiceAndUpload}>
              <Image source={require('../../../assets/images/uploadBtn.png')} style={{ width: 83,resizeMode: 'center', height: 30, marginVertical: "5%"}}/>
            </TouchableOpacity> 
            <Text>{progress}</Text> 
          </View> 
          <View style={{flex: 8}}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput style={styles.input}  
              placeholder={fullName}
              onChangeText={(text) => setFullName(text)}
              value={fullName}
              underlineColorAndroid="transparent"
              autoCapitalize="none"/>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput style={styles.input}  
              placeholder={email} 
              placeholderTextColor={"#333"}
              onChangeText={(text) => setEmail(text)}
              editable={false}/>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput style={styles.input}  placeholder={phoneNo} 
              onChangeText={(text) => setPhone(text)}
              value={phoneNo}
              />
              <Text style={styles.inputLabel}>Gender</Text>
              <TextInput style={styles.input}  placeholder="Gender"/>
              <Text style={styles.inputLabel}>Birth Date</Text>
              <TextInput style={styles.input}  placeholder="Birth Date"/>
              <Text style={styles.inputLabel}>Phone Number </Text>
              <TextInput style={styles.input}  placeholder="+957xxxxxxxx"/>
          </View>
          <Button title={"Save"} onPress={profileUpdate} />
      </KeyboardAwareScrollView>
    </View>
      </ScrollView> 
  )
}