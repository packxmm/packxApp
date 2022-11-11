import React, { useEffect, useState } from 'react'
import { View, Text, StatusBar ,SafeAreaView, ScrollView, Image, TouchableOpacity , useColorScheme, RefreshControl} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles'
import { firebase } from '../../firebase/config'
import { Calendar } from 'react-native-calendars';
import Lists from '../../components/Lists'
import Spinner from 'react-native-loading-spinner-overlay' 
import moment from "moment";

export default function Home(props) {
  // console.log(props.route)
  const userData = props.user; 
  const [tripsData, setTripsData] = useState([]);  
  const [finishedtripsData, setFinishedTripsData] = useState([]);  
  const [totalAmount, setTotalAmount] = useState(0.00);
  const [token, setToken] = useState('')
  const [refreshing, setRefreshing] = useState(false);
  const scheme = useColorScheme()
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString("en-US"));
  const [newDate, setNewDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [spinner, setSpinner] = useState(true);
  const [markedDays, setMarkedDay] = useState({});
  const bluedot = {key: 'bluedot', color: 'blue', selectedDotColor: 'blue'};
  const greendot = {key: 'greendot', color: 'green'};
  const reddot = {key: 'reddot', color: 'red'};
  
  useEffect(() => {
    getData();
  }, []);
  
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
    const tokenRef = firebase.firestore().collection('tokens')
      tokenRef
      .doc(userData.id)
      .get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            const data = doc.data()
            setToken(data)
        } else {
            console.log("No such document!");
        }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });

      var requestOptions = {
        method: 'GET',
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      const tripsRef = firebase.firestore().collection('trips')
      tripsRef
      .where('facilityId', '==', userData.id) 
      .get().then((querySnapshot) => {
        const dataArr = [];
        const finishedArr = []
        const arrDate = []
        let newMarkDate = {}
        querySnapshot.forEach(doc => { 
          const data = doc.data();
          if(data.trackingStatus === "Arrive"){
            finishedArr.push(data);    
          }else{
            dataArr.push(data); 
            newMarkDate[moment(new Date(data.tripInfo.dropOffDate)).format("YYYY-MM-DD")] = {
              date: moment(new Date(data.tripInfo.dropOffDate)).format("YYYY-MM-DD"),
              dots: [bluedot, greendot]
            } 
            arrDate.push(newMarkDate[moment(new Date(data.tripInfo.dropOffDate)).format("YYYY-MM-DD")])
          }
        })   

        console.log(arrDate)
        const groupByDate = arrDate.reduce((group, value) => {
          const { date } = value;
          group[date] = group[date] ?? [];
          group[date].push(value); 
          return group;
        }, {}); 

        let finalDates = {};
        const dotsArr = [ [bluedot], [bluedot, greendot], [bluedot, greendot, reddot], [bluedot, greendot, reddot, bluedot]]
        Object.entries(groupByDate).map(([key, val] = entry) =>{ 
          finalDates[key] = {
            dots : dotsArr[val.length - 1]
          };
        });

        setMarkedDay(finalDates) 
        setFinishedTripsData(finishedArr)
        setTripsData(dataArr); 

        const packageRef = firebase.firestore().collection('package') 
        packageRef
          .get().then((querySnapshot) => {
            const packdataArr = [];
            querySnapshot.forEach(doc => { 
              let data = doc.data();
              packdataArr.push(data);   
            })  
            setSpinner(false); 
            let convertTotal = 0; 
            finishedArr.forEach((trip,index) => { 
              let total = 0;
              packdataArr.filter((data) => data.tripId === trip.tripId).map(packageItem => {
                total += packageItem.total
              }); 
              let currency = trip.categoryLists[0].currency; 
              let reqUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/"+currency.toLowerCase()+".json";
              fetch(reqUrl,requestOptions)
                .then(response => response.json())
                .then(result => {
                  let convertRate = total / result[currency.toLowerCase()];
                  convertTotal += parseFloat(convertRate.toFixed(2));
                  if(index === finishedArr.length - 1){
                    setSpinner(false); 
                    setRefreshing(false);
                    setTotalAmount(convertTotal)
                  }
                })
                .catch(error => console.log('error', error));
            }) 
        }).catch((error) => {
            console.log("Error getting document:", error);
        });   
      }).catch((error) => {
          console.log("Error getting document:", error);
      });  
  }  

  let newObj = {};
  newObj[newDate] = {
    selected: true,
    marked: true
  };
  let markedDay = {...markedDays, ...newObj};  

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}> 
    <StatusBar animated={true} backgroundColor="#FAFAFA" barStyle="dark-content"/>
            <TouchableOpacity onPress={() =>  props.navigation.navigate('CreateFacility')} style={styles.createBtn}>
              <Ionicons name="add-circle-outline" size={35}/>
              <Text style={styles.text}>
                Create New Trip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.amountDue} onPress={() =>  props.navigation.navigate('TotalAmount', {tripInfo : finishedtripsData})}>
              <View>
                <Text style={{fontSize: 18}}> Amount Due </Text>
                <Text style={styles.priceLabel}> $ {(totalAmount / 10).toFixed(2)} </Text>
              </View>
              <View>
                <Image source={require('../../../assets/images/sm-logo.png')}/>
                <Ionicons name="arrow-forward-outline" size={30} style={{marginTop: 20}}/>
              </View>
            </TouchableOpacity>
            <Calendar
              style={styles.facilityCalendar}
              markingType={'multi-dot'}
              initialDate={currentDate}
              markedDates={markedDay}
              minDate={'2021-12-31'}
              maxDate={'2022-12-31'}
              onDayPress={day => {
                setCurrentDate(new Date(day.dateString).toLocaleDateString("en-US"))
                setNewDate(moment(new Date(day.dateString)).format("YYYY-MM-DD"))
              }}
              onDayLongPress={day => {
                console.log('selected day', day);
              }}
              monthFormat={'MMMM yyyy'}
              onMonthChange={month => {
                console.log('month changed', month);
              }}
              hideExtraDays={true}
              disableMonthChange={true}
              firstDay={1}
              onPressArrowLeft={subtractMonth => subtractMonth()}
              onPressArrowRight={addMonth => addMonth()}
              disableAllTouchEventsForDisabledDays={true}
              enableSwipeMonths={true}
            />
            <View>

            {tripsData.filter((data) => new Date(data.tripInfo.dropOffDate).toLocaleDateString("en-US") === currentDate).map((trip, index) => (
              <View key={index}> 
                <Text style={styles.header}> Trip Activity - {moment(new Date(trip.tripInfo.dropOffDate)).format("MMM Do YYYY")}</Text>  
                <Lists data={trip} key={index}/>
              </View>
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