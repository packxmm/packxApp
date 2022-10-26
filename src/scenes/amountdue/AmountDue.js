import React, {  useState, useEffect } from 'react';
import { View, Text, Platform, TouchableOpacity, StatusBar} from 'react-native';  
import styles from './styles'
import { firebase } from '../../firebase/config' 
import Spinner from 'react-native-loading-spinner-overlay' 
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function AmountDue(props) { 
  const [tripData, setTripData] = useState(props.route.params.tripInfo);
  const [totalAmount, setTotalAmount] = useState(1000);
  const [spinner, setSpinner] = useState(true);
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{flex:1, flexDirection: 'row', paddingLeft: 15, paddingTop: Platform.OS === 'android' ? 10 : 0}} onPress={() => props.navigation.goBack()}>
          <Icon style={{color: "#1B9494"}} name={"arrow-back-circle-sharp"} size={35} />
          <Text style={{color: "#c8c8c8", paddingLeft: 5, marginTop: 5, fontSize: 18}}>Back</Text>
        </TouchableOpacity>
      )
    });
  }, [props.navigation]);

  useEffect(() => {   
    setSpinner(true);
    var requestOptions = {
      method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    };

    const packageRef = firebase.firestore().collection('package') 
    packageRef
      .get().then((querySnapshot) => {
        const dataArr = [];
        querySnapshot.forEach(doc => { 
          let data = doc.data();
          dataArr.push(data);   
        })  
        let finishedTrip = tripData.filter((trip) => trip.trackingStatus === "Arrive");
        let convertTotal = 0;
        finishedTrip.forEach((trip,index) => { 
          let total = 0;
          dataArr.filter((data) => data.tripId === trip.tripId).map(packageItem => {
            total += packageItem.total
          });
          finishedTrip[index].totalAmount = total;
          let currency = trip.categoryLists[0].currency; 
          if(currency !== "USD"){ 
            let reqUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/"+currency.toLowerCase()+".json";
            fetch(reqUrl,requestOptions)
              .then(response => response.json())
              .then(result => {
                let convertRate = total / result[currency.toLowerCase()];
                finishedTrip[index].convAmount = convertRate.toFixed(2);
                convertTotal += parseFloat(convertRate.toFixed(2));
                setTotalAmount(convertTotal)
                if(index === finishedTrip.length - 1){
                  setSpinner(false); 
                }
              })
              .catch(error => console.log('error', error));
          }else{ 
            convertTotal += total;
            setTotalAmount(convertTotal)
            setSpinner(false); 
          }
        }) 
        setTripData(finishedTrip)
    }).catch((error) => {
        console.log("Error getting document:", error);
    });   
  }, []);
  return (
    <View style={styles.container}>
    <StatusBar animated={true} backgroundColor="#FAFAFA" barStyle="dark-content"/>
      <View style={styles.amountDue}>
        <Text style={styles.header}> PAYMENT BREAKDOWN  </Text>
        <View style={styles.Row}> 
          <Text style={styles.title}> FINISHED TRIPS </Text>
          <Text style={styles.title}> REVENUE </Text>
        </View> 
        {tripData.filter((data) => data.trackingStatus === "Arrive").map((trip, index) => (
            // <Lists data={trip} key={index} showStatus={false}/> 
            <View style={styles.item} key={index}>
              <Text style={styles.title}>TRIP - {trip.tripId.slice(0,8)}</Text>
              <View style={styles.tripList}>
                <View style={{flex: 2}}>
                  <Text style={styles.triplabel}>From</Text>
                  <Text style={styles.tripname}>{trip.tripInfo.dropOff}</Text>
                </View>
                <View style={{flex: 2}}>
                  <Text style={styles.triplabel}>To</Text>
                  <Text style={styles.tripname}>{trip.tripInfo.desVal}</Text>
                </View>
                <View style={{flex: 2, alignItems: "flex-end", justifyContent: "center"}}>
                  <Text style={[styles.tripname,{marginBottom: 5}]}> {trip.totalAmount} {trip.categoryLists[0].currency}</Text> 
                  <Text style={styles.triplabel}> {trip.convAmount} USD</Text> 
                </View>
                </View>
          </View>
        ))}
      <View style={[styles.amountText, {flexDirection: 'column'}]}>
        <View style={{flexDirection: 'row', paddingBottom: "1%"}}>
          <Text style={styles.totalLabel}>FACILITY INCOME</Text>
          <Text style={styles.text}>{totalAmount} USD </Text> 
        </View>
        <View style={{flexDirection: 'row', paddingBottom: "1%"}}>
          <Text style={styles.totalLabel}> COMISSION</Text>
          <Text style={styles.text}> 10% </Text> 
        </View>
      </View>
      <View style={styles.amountText}>
        <Text style={styles.totalAmount}>TOTAL AMOUNT DUE : </Text>
        <Text style={styles.totalAmount}>{(totalAmount / 10).toFixed(2)} USD </Text> 
      </View>
      </View>
      <Spinner
        visible={spinner}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </View>
  )
}