import React, {  useState } from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native'; 
import styles from './styles'
import { firebase } from '../../firebase/config' 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import Lists from '../../components/Lists'

export default function AmountDue(props) {
  const tripData = props.route.params.tripInfo;
  const [totalAmount, setTotalAmount] = useState(1000);
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{flex:1, flexDirection: 'row', paddingLeft: 15}} onPress={() => props.navigation.goBack()}>
          <Icon style={{color: "#1B9494"}} name={"arrow-back-circle-sharp"} size={35} />
          <Text style={{color: "#c8c8c8", paddingLeft: 5, marginTop: 5, fontSize: 18}}>Back</Text>
        </TouchableOpacity>
      )
    });
  }, [props.navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.amountDue}>
        <Text style={styles.header}> PAYMENT BREAKDOWN  </Text>
        <View style={styles.Row}> 
          <Text style={styles.title}> FINISHED TRIPS </Text>
          <Text style={styles.title}> REVENUE </Text>
        </View>
        {tripData.map((trip, index) => (  
        <>
          {trip.trackingStatus === "Arrive" &&
            <View key={index}> 
                <Lists data={trip} key={index} showStatus={false}/>
            </View>
          }
        </>
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
        <Text style={styles.header}>TOTAL AMOUNT DUE - </Text>
        <Text style={styles.header}>{totalAmount / 10} USD </Text> 
      </View>
      </View>
    </View>
  )
}