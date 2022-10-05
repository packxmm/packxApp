import React, { useState } from 'react'; 
import { Text, View, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles' 
import Button from '../../components/Button'
import { firebase } from '../../firebase/config' 
import Spinner from 'react-native-loading-spinner-overlay'
import Icon from 'react-native-vector-icons/Ionicons';

export default function Login({route, navigation}) { 
  const userType = route.params.userType;
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    navigation.navigate('Registration', {userType : userType})
  }

  const onLoginPress = () => {
    setSpinner(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid
        const usersRef = firebase.firestore().collection('users')
        usersRef
          .doc(uid)
          .get()
          .then(firestoreDocument => {
            if (!firestoreDocument.exists) {
              setSpinner(false)
              alert("User does not exist anymore.")
              return;
            }
          })
          .catch(error => {
            setSpinner(false)
            alert(error)
          });
      })
      .catch(error => {
        setSpinner(false)
        alert(error)
      })
  }

  return (
    <View style={[styles.container , {paddingTop: StatusBar.currentHeight}]}>
      <StatusBar barStyle="light-content" />  
      <View style={styles.logo}>
        <Image source={require('../../../assets/images/PackXLogo.png')}/>
      </View> 
      { userType === "facility" ? (
          <View  style={styles.logoBox}>
            <Image source={require('../../../assets/images/FacilitySignIn.png')}/>
          </View>
          ) : (  
            <View style={styles.logoBox}>
              <Image source={require('../../../assets/images/UserSignIn.png')}/>
            </View> 
        )}
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '90%' }}
        keyboardShouldPersistTaps="always"> 
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          placeholder='E-mail'
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          value={email}
          keyboardType={'email-address'} 
          style={styles.input}
        />
        <Text style={styles.inputLabel}>Password</Text> 
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
        /> 
        <Button title={"Sign In"} onPress={onLoginPress} />
        {userType !== "facility" && (
          <View style={styles.footerView}>
            <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
          </View>
        )}
        <Spinner
          visible={spinner}
          textStyle={{ color: "#fff" }}
          overlayColor="rgba(0,0,0,0.5)"
        />
      </KeyboardAwareScrollView>
    </View>
  )
}