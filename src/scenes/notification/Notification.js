import React, {  useState , useEffect} from 'react';
import {ScrollView, View, Text, RefreshControl} from 'react-native'; 
import styles from './styles'
import { firebase } from '../../firebase/config' 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import notifee from '@notifee/react-native';
import Button from '../../components/Button'

export default function Notification(props) {
  const [refreshing, setRefreshing] = React.useState(false); 
  const [notiData, setNotification] = useState(props.noti);  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    try {  
      const notiRef = firebase.firestore().collection('notification')
      notiRef
        .where('user', '==', props.user.id) 
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
    <ScrollView style={styles.container}>
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
                <FontAwesome5 style={styles.icon} name="map-marked-alt" size={25} />
              </View> 
              <View style={{flex: 6, justifyContent: "center"}}> 
                <Text style={styles.text}>{data.msg}</Text>  
              </View> 
              <View style={{flex: 1, justifyContent: "center", alignItems: "center" }}> 
                <FontAwesome5 style={styles.icon} name="bell" size={14} />
              </View>
          </View>
        ))}
        </>
      }
    </ScrollView>
  )
}