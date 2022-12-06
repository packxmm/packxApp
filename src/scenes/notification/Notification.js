import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {ScrollView, View, Text, RefreshControl, SafeAreaView, StatusBar} from 'react-native'; 
import styles from './styles'
import { firebase } from '../../firebase/config' 
import FontAwesome from 'react-native-vector-icons/FontAwesome';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';  
import Spinner from 'react-native-loading-spinner-overlay' 

export default function Notification(props) {
  // console.log(props.noti)
  const [refreshing, setRefreshing] = React.useState(false); 
  const [spinner, setSpinner] = useState(true);
  const [notiData, setNotification] = useState(props.noti.sort((a, b) => b.timestamp.localeCompare(a.timestamp)));  

  useFocusEffect(
    React.useCallback(() => { 
      getData();
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    try {  
      getData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getData = () => {
    setSpinner(true);
    const notiRef = firebase.firestore().collection('notification')
      notiRef
        .where('user', '==', props.user.id)
        .get().then((querySnapshot) => {
          const dataArr = [];
          querySnapshot.forEach(doc => { 
            let data = doc.data();
            dataArr.push(data);   
          })   
          setNotification(dataArr.sort((a, b) => b.timestamp.localeCompare(a.timestamp))); 
          setRefreshing(false);
          setSpinner(false);
      }).catch((error) => {
          console.log("Error getting document:", error); 
          setRefreshing(false);
          setSpinner(false);
      }); 
  }
  
  return ( 
    <SafeAreaView style={styles.container}> 
    <ScrollView>
      <StatusBar barStyle="dark-content" />
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        <View>
          <Text style={styles.header}> INBOX  </Text>
          <Text style={styles.title}> Notification </Text>
        </View>
        {notiData !== undefined &&
          <>
          {notiData.map((data, index) => (  
            <View key={index} style={styles.itembox}>
                <View style={{flex: 2, justifyContent: "flex-start" }}> 
                {data.type === "receive" && ( 
                  <MaterialCommunityIcons style={styles.greenicon} name="check-circle-outline" size={25} />
                 )}
                 {data.type === "checkout" && ( 
                   <MaterialCommunityIcons style={styles.greenicon} name="archive-check-outline" size={25} />
                  )}
                  {data.type === "confirmed" && ( 
                    <MaterialCommunityIcons style={styles.greenicon} name="ticket-confirmation" size={25} />
                   )}
                </View> 
                <View style={{flex: 7, justifyContent: "center"}}> 
                  <Text style={styles.text}>{data.msg}</Text>  
                </View> 
                <View style={{flex: 2, paddingTop: 5, alignItems: "center" }}> 
                  <FontAwesome style={styles.icon} name="bell" size={14} />
                </View>
            </View>
          ))}
          </>
        }
      </ScrollView> 
      <Spinner
          visible={spinner}
          textStyle={{ color: "#fff" }}
          overlayColor="rgba(0,0,0,0.5)"
        /> 
    </SafeAreaView>
  )
}