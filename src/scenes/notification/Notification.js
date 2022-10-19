import React, {  useState } from 'react';
import {ScrollView, View, Text, RefreshControl, Image} from 'react-native'; 
import styles from './styles'
import { firebase } from '../../firebase/config' 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import notifee from '@notifee/react-native';
import Button from '../../components/Button'
import { StatusBar } from 'expo-status-bar';

export default function Notification(props) {
  const [refreshing, setRefreshing] = React.useState(false); 
  const [notiData, setNotification] = useState(props.noti);  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    try {  
      const notiRef = firebase.firestore().collection('notification')
      notiRef
        .where('user', '==', props.user.id)
        .orderBy('timestamp', 'asc')
        .get().then((querySnapshot) => {
          const dataArr = [];
          querySnapshot.forEach(doc => { 
            let data = doc.data();
            dataArr.push(data);   
          })  
          setNotification(dataArr); 
          setRefreshing(false);
      }).catch((error) => {
          console.log("Error getting document:", error);
      }); 
    } catch (error) {
      console.error(error);
    }
  }, []);
  console.log(notiData)
  return ( 
    <View style={styles.container}>
      <StatusBar />
      <ScrollView >
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        <View>
          <Text style={styles.header}> INBOX  </Text>
          <Text style={styles.title}> Notification </Text>
        </View>
        {notiData !== undefined &&
          <>
          {notiData.map((data, index) => (  
            <View key={index} style={styles.itembox}>
                <View style={{flex: 2, justifyContent: "center" }}> 
                  {data.type === "confirmed" ? ( 
                      <Image source={require('../../../assets/images/ticket-confirm.png')}/> 
                  ) : ( 
                      <Image source={require('../../../assets/images/tracking-icon.png')}/> 
                  )}
                </View> 
                <View style={{flex: 6, justifyContent: "center"}}> 
                  <Text style={styles.text}>{data.msg}</Text>  
                </View> 
                <View style={{flex: 1, paddingTop: 5, alignItems: "center" }}> 
                  <FontAwesome5 style={styles.icon} name="bell" size={16} />
                </View>
            </View>
          ))}
          </>
        }
      </ScrollView>
    </View>
  )
}