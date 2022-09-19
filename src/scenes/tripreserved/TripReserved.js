import React from 'react'; 
import { StatusBar, View, Text, Image , TouchableOpacity} from 'react-native';  
import styles from './styles'
import Button from '../../components/Button'

export default function TripReserved(props) {
  return ( 
    <View style={{ flex: 1 }}>
      <StatusBar barStyle= {"dark-content"}/>
      <View style={styles.container}>
        <View style={styles.logoBox}>
          <Image source={require('../../../assets/images/PackXLogo.png')} style={{ width: 167,resizeMode: 'center', height: 103}}/>
        </View>
        <Image source={require('../../../assets/images/successPack.png')} style={styles.introImg}/>
        <Text style={styles.title}>Your package</Text>
        <Text style={styles.title}>has been reserved</Text>
        <Text style={styles.text}>You will receive an amount due upon the confirmation of your package by the facility.</Text>
        <View>
            <Button title={"Package"}  onPress={() => props.navigation.navigate('PACKAGE')} children={'cubes'} /> 
          </View> 
      </View>
    </View>
  )
}