import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View,SafeAreaView, Text, Image , StatusBar, TouchableOpacity, ScrollView, TextInput, useColorScheme, RefreshControl } from 'react-native'; 
import styles from './userHomeStyles'
import { firebase } from '../../firebase/config' 
import Spinner from 'react-native-loading-spinner-overlay'
import moment from "moment";

export default function UserHome(props) {
  const userData = props.user 
  const [tripData, setTripData] = useState([]) 
  const scheme = useColorScheme();
  const [spinner, setSpinner] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchData, setsearchResult] = useState([]) 

  useEffect(() => {  
    getData();
  }, []);

  const getData = () => { 
    setSpinner(true);
    firebase.firestore()
    .collection('trips') 
    .where('trackingStatus', '!=', "Arrive") 
    .get() 
    .then((querySnapshot) => {
      const dataArr = [];
      querySnapshot.forEach(doc => { 
        const data = doc.data();
        dataArr.push(data); 
      })  
      const sortedArr = dataArr.sort((a, b) =>  new Date(a.tripInfo.dropOffDate) - new Date(b.tripInfo.dropOffDate));
      setTripData(sortedArr); 
      setsearchResult(dataArr);
      storeData(dataArr)
      setSpinner(false);
      setRefreshing(false);
    }).catch((error) => {
        console.log("Error getting document:", error);
    });  
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('trips', jsonValue)
    } catch (error) {
      console.log("Error Message:", error);
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData()
  }, []);
  
  const searchTrip = (val) => {
    if(val){
      const searchData = tripData.filter(item => {
        const itemData = item.tripInfo.dropOff ? item.tripInfo.dropOff.toUpperCase() : ''.toUpperCase();
        const desData = item.tripInfo.desVal ? item.tripInfo.desVal.toUpperCase() : ''.toUpperCase();
        const valData = val.toUpperCase();
        return itemData.indexOf(valData) > -1 || desData.indexOf(valData) > -1;
      })
      setsearchResult(searchData);
    }else{
      setsearchResult(tripData);
    }
  }; 
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}> 
    <StatusBar animated={true} backgroundColor="#FAFAFA" barStyle="dark-content"/>
        <View style={styles.searchBar}> 
          <Image source={require('../../../assets/images/sm-logoWhite.png')} style={{ width: 40,resizeMode: 'center', height: 38}}/> 
          <View style={{ flexDirection: 'row'}}> 
            <Ionicons name="search-outline" size={18} style={{ padding : '3%', color: '#7C7C7C' }}/>
            <TextInput style={styles.input}  placeholder="Search trip to destination" onChangeText={(e) => {searchTrip(e)}}/>
          </View> 
          {/* <MaterialIcons name="microsoft-xbox-controller-menu" size={30} style={{ paddingTop: '1%', color: '#169393' }}/> */}
      </View>
        <View style={styles.header}>
          <Text style={styles.mainText}> Welcome to PackX </Text>
          <Text style={styles.text}> Pack & Send Everything Simply with PackX </Text>
        </View>
        <View style={styles.itemLists}>
          {searchData.map((item, index) => (
            <TouchableOpacity style={styles.item} key={index} onPress={() => props.navigation.navigate('TripInfo', { tripInfo: item , user: userData})}>
               <View style={{flex: 10}}>
                <View style={styles.tripHeader}> 
                  <Text style={styles.title}>TRIP - <Text style={styles.numberText}>{item.tripId.slice(0,8)} </Text></Text> 
                </View>
                <View style={styles.tripList}>
                  <View style={{flex: 2}}>
                    <Text style={styles.triplabel}>From</Text>
                    <Text style={styles.tripname}>{item.tripInfo.dropOff}</Text>
                    <Text style={styles.datelabel}>Last Drop Off</Text> 
                    <Text style={styles.dateText}>{moment(new Date(item.tripInfo.dropOffDate)).format("MMM Do YYYY")} </Text>
                    </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>  
                    <Image source={require('../../../assets/images/planeCircle.png')} style={{ width: 33, height: 33}}/>  
                  </View>
                  <View style={{flex: 2}}>
                    <Text style={styles.triplabel}>To</Text>
                    <Text style={styles.tripname}>{item.tripInfo.desVal}</Text>
                    <Text style={styles.datelabel}>Est. Arrival</Text>
                    <Text style={styles.dateText}>{moment(new Date(item.tripInfo.pickUpDate)).format("MMM Do YYYY")} </Text>
                  </View>
                </View> 
               </View>
               <View style={styles.rightArr}>  
                  <Ionicons name="md-chevron-forward-outline" size={30} style={{marginLeft: 10, color: '#185354' }}/>
                </View>
            </TouchableOpacity> 
          ))} 
        </View> 
        <Spinner
            visible={spinner}
            textStyle={{ color: "#fff" }}
            overlayColor="rgba(0,0,0,0.5)"
          />
      </ScrollView> 
    </SafeAreaView>
  )
}