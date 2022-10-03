import React from 'react';
import { View , Image, Pressable, Text, TouchableOpacity, StatusBar} from 'react-native';
import styles from './styles';
import Slider from './slider'
import WhiteButton from '../../components/Button/WhiteButton'

export default function intro({navigation}) { 
  const goToLogin = () => {
    navigation.navigate('Login', {userType : "user"})
  }

  return (
    <View style={[styles.container , {paddingTop: StatusBar.currentHeight}]}>
    <StatusBar barStyle="light-content" /> 
      <View style={styles.logoBox}>
        <Image source={require('../../../assets/images/PackXLogo.png')}/>
      </View>
      <View style={{ flex: 6}}>
        <Slider />
      </View>
      {/* <View style={styles.socialBtn}> 
            <TouchableOpacity onPress={goToLogin}>
              <Image source={require('../../../assets/images/gbutton.png')} style={{ width: 130,resizeMode: 'center', height: 44, marginRight: "5%"}}/>
              </TouchableOpacity>
          <TouchableOpacity onPress={goToLogin} >
            <Image source={require('../../../assets/images/fbutton.png')} style={{ width: 130,resizeMode: 'center', height: 44}}/>
          </TouchableOpacity>
      </View> */}
      <View style={{ flex: 3, flexDirection: "column", justifyContent: 'center'}}> 
          <View style={{width: "80%", alignSelf: 'center'}}> 
            <WhiteButton title={"User Login"} children={'user-o'} onPress={goToLogin}/>
          </View>
          <View style={{flexDirection: "row", justifyContent: 'center'}}> 
            <Pressable onPress={() => navigation.navigate('Login', {userType : "facility"})}>
              <Text style={[styles.fotterText, {color: "#1A77F2"}]}>Sign In </Text>
            </Pressable><Text style={styles.fotterText}> as Facility</Text>
          </View>
      </View>
    </View>
  )
}