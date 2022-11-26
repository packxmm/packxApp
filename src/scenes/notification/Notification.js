import React, {  useState } from 'react';
import {ScrollView, View, Text, RefreshControl, Image, SafeAreaView, StatusBar} from 'react-native'; 
import styles from './styles'
import { firebase } from '../../firebase/config' 
import FontAwesome from 'react-native-vector-icons/FontAwesome';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';  

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
          setRefreshing(false);
      }); 
    } catch (error) {
      console.error(error);
    }
  }, []);
  console.log(notiData)
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
                  {data.type === "reserved" && ( 
                  <MaterialCommunityIcons style={styles.greenicon} name="check-circle-outline" size={25} />
                 )}
                 {data.type === "checkout" && ( 
                   <MaterialCommunityIcons style={styles.greenicon} name="archive-check-outline" size={25} />
                  )}
                </View> 
                <View style={{flex: 6, justifyContent: "center"}}> 
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
    </SafeAreaView>
  )
}