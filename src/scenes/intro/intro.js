import React from 'react';
import { View , Image, Pressable, Text, TouchableOpacity, StatusBar} from 'react-native';
import styles from './styles';
import Slider from './slider'

export default function intro({navigation}) { 
  return (
    <View style={[styles.container , {paddingTop: StatusBar.currentHeight}]}>
    <StatusBar barStyle="light-content" /> 
      <View style={styles.logoBox}>
        <Image source={require('../../../assets/images/PackXLogo.png')} style={{ width: 167,resizeMode: 'center', height: 103}}/>
      </View>
      <View style={{ flex: 6}}>
        <Slider />
      </View>
      <View style={styles.socialBtn}>
            <TouchableOpacity onPress={() => navigation.navigate('User')}>
              <Image source={require('../../../assets/images/gbutton.png')} style={{ width: 130,resizeMode: 'center', height: 44, marginRight: "5%"}}/>
              </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('User')} >
            <Image source={require('../../../assets/images/fbutton.png')} style={{ width: 130,resizeMode: 'center', height: 44}}/>
          </TouchableOpacity>
      </View>
      <View style={{ flex: 2, flexDirection: "row", justifyContent: 'center', paddingTop: "3%"}}> 
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={{color: "#1A77F2"}}>Sign In </Text>
        </Pressable><Text>as Facility</Text>
      </View>
    </View>
  )
}