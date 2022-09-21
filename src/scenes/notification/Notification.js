import React from 'react'
import { View, Text} from 'react-native'; 
import styles from './styles'
// import notifee from '@notifee/react-native';
import Button from '../../components/Button'

export default function Notification(props) {
  console.log(props)
  return (
    <View style={styles.container}>
    <Text style={styles.mainText}> Welcome to PackX Inbox </Text>
    <Text style={styles.text}> Pack & Send Everything Simply with PackX </Text>
    {/* <Button title={"Notification"}  onPress={() =>  onDisplayNotification()} children={'cubes'} />  */}
    </View>
  )
}