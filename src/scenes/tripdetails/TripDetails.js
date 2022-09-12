import React, {  useState } from 'react';
import { Text, View, TouchableOpacity, StatusBar, ScrollView, useColorScheme ,SafeAreaView, Image} from 'react-native';
import styles from './styles';
import Spinner from 'react-native-loading-spinner-overlay' 
import Icon from 'react-native-vector-icons/Ionicons'; 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Button from '../../components/Button'

export default function TripDetails({ route, navigation }) { 
  const tripData = route.params.tripInfo;  
  console.log(tripData)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{flex:1, flexDirection: 'row', paddingLeft: 15}} onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/images/back-arrow.png')} style={{ width: 28,resizeMode: 'center', height: 28}}/>
          <Text style={{color: "#c8c8c8", paddingLeft: 10, paddingTop: 2, fontSize: 18}}>Back</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);
  
  const [spinner, setSpinner] = useState(false)

  return ( 
    <ScrollView style={styles.container}> 
    <View style={styles.tripHeader}> 
      <Text style={styles.mainText}>TRIP NUMBER - {tripData.tripId.slice(0,8)}</Text> 
    </View>
    <View style={styles.tripList}>
      <View style={{flex: 2}}>
        <Text style={styles.triplabel}>From</Text>
        <Text style={styles.tripname}>{tripData.tripInfo.dropOff}</Text>
        <Text style={styles.datelabel}>Last Drop Off</Text>
        <Text style={styles.dateText}>{tripData.tripInfo.dropOffDate}</Text>
      </View>
      <View style={{flex: 2}}>
        <Text style={styles.triplabel}>To</Text>
        <Text style={styles.tripname}>{tripData.tripInfo.desVal}</Text>
        <Text style={styles.datelabel}>Est. Arrival</Text>
        <Text style={styles.dateText}>{tripData.tripInfo.pickUpDate}</Text>
      </View>
      <View style={{flex: 2 ,flexDirection: "row",justifyContent: "center", alignItems:"center" }}> 
        <Text style={styles.title}>TOTAL {tripData.categoryLists.length}</Text>
        <Image source={require('../../../assets/images/Package.png')} style={{ width: 28,resizeMode: 'center', height: 27 , margin: 10}}/>
      </View>
    </View> 
    <View style={styles.tripList}>
      <View style={{flex: 4}}>
        <Text style={styles.locLabel}><Icon style={styles.icon} name='location-sharp' size={14} /> DROP OFF ADDRESSS</Text>
        <Text style={styles.locText}>{tripData.tripInfo.dropOffAddress}</Text> 
      </View>
      <View style={{flex: 4}}>
        <Text style={styles.locLabel}><Icon style={styles.icon} name='location-sharp' size={14} /> PICK UP ADDRESS</Text>
        <Text style={styles.locText}>{tripData.tripInfo.pickUpAddress}</Text> 
      </View>
      <TouchableOpacity style={{flex: 1 ,flexDirection: "column",justifyContent: "center", alignItems:"center" }} onPress={() => navigation.navigate('TripInfo', { tripInfo: tripData })}> 
        <Text style={styles.dateText}> More </Text> 
        <Icon style={styles.icon} name='ellipsis-horizontal' size={20} />
      </TouchableOpacity>
    </View>  
    <View style={styles.tripHeader}> 
      <Text style={styles.mainText}>Tracking Status : {tripData.trackingStatus}</Text> 
    </View>
    {/* <ScrollView>
    {tripData.packages.map((item, index) => (
      <TouchableOpacity style={styles.item} key={index} onPress={() => navigation.navigate('OrderBooked', { otherParam: item})}>
          <View style={{flex: 1, alignContent: "center"}}> 
            <Image source={item.userInfo.profileImg} style={{ width: 52,resizeMode: 'center', height: 52 }}/>
          </View>
          <View style={{flex: 2, alignItems: 'flex-start'}}>
            <Text style={styles.title}>{item.userInfo.username}</Text> 
            <Text style={styles.text}>Confirmed </Text>
          </View>
          <View style={{flex: 1 ,flexDirection: "column" }}>
            <View style={styles.itemCount}>
              <Text style={styles.title}>{item.items.length}</Text>
              <Image source={require('../../../assets/images/Package.png')} style={{ width: 28,resizeMode: 'center', height: 27, marginBottom: 10 }}/> 
            </View> 
            <View style={styles.itemCount}>
              <Text style={styles.text}>{item.status}</Text>
              <Image source={require('../../../assets/images/cashImg.png')} style={{ width: 28,resizeMode: 'center', height: 20}}/> 
            </View> 
          </View>
      </TouchableOpacity>
     ))} 
     </ScrollView> */}
      <Button title={"Ship"}>
        <FontAwesome5 style={{color: "#fff", marginRight: 10 }}  name='plane-departure' size={20} />
      </Button>
      <Spinner
        visible={spinner}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0,0.5)"
      />
  </ScrollView>
  )
}