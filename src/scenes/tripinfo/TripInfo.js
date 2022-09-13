import React, {  useState } from 'react';
import Modal from "react-native-modal";
import { View, Text, TouchableOpacity, Image , ScrollView, TextInput} from 'react-native';
import styles from './styles';
import Spinner from 'react-native-loading-spinner-overlay' 
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { firebase } from '../../firebase/config'
import { Avatar } from 'react-native-elements'

export default function TripInfo({ route, navigation }) { 
  const [isModalVisible, setModalVisible] = useState(false); 
  const [itemList,setItemLists] = useState([]);
  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const tripData = route.params.tripInfo;  
  const userData = route.params.user;  
  const [facilityInfo, setfacilityInfo] = useState({});
  console.log(tripData.facilityId)

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

  function showModal(){   
    setModalVisible(true);
  } 

  function hideModal(){   
    setModalVisible(false);
    navigation.navigate('Reserved');
  } 

  function addList(){
    setItemLists(itemList => [{  
      item : item, 
      qty : qty
    },...itemList]);
  }
  firebase.firestore()
    .collection('users')
    .doc(tripData.facilityId)
    .get().then((doc) => {
      if (doc.exists) {
          const data = doc.data();
          setfacilityInfo(data)
      } else {
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  }); 

  console.log(facilityInfo)
  return ( 
    <ScrollView style={styles.container}> 
        <View style={styles.tripList}> 
          <Text style={styles.mainText}>TRIP - {tripData.tripId}</Text> 
          <View style={{flex: 4, flexDirection: 'row' }}> 
            <View style={{flex: 3, marginBottom: "2%", flexDirection: 'column'  }}>
              <View style={{flex: 1 }}>
                <Text style={styles.triplabel}>From</Text>
                <Text style={styles.tripname}>{tripData.tripInfo.dropOff}</Text> 
                <Text style={styles.triplabel}>{tripData.tripInfo.dropOffDate}</Text>
              </View>
              <View style={{flex: 1, paddingTop: "5%"}}>
                <Text style={styles.triplabel}><Icon style={styles.icon} name='location-sharp' size={14} /> DROP OFF ADDRESSS</Text>
                <Text style={styles.itemlabel}>{tripData.tripInfo.dropOffAddress}</Text> 
              </View> 
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>  
              <Image source={require('../../../assets/images/stopFlight.png')} style={{ width: 43,resizeMode: 'center', height: 140}}/>  
            </View>
            <View style={{flex: 3, flexDirection: 'column' }}>
              <View style={{flex: 1 }}>
                <Text style={styles.triplabel}>To</Text>
                <Text style={styles.tripname}>{tripData.tripInfo.desVal}</Text> 
                <Text style={styles.triplabel}>{tripData.tripInfo.pickUpDate}</Text>
              </View>  
              <View style={{flex: 1 }}>
                <Text style={styles.triplabel}><Icon style={styles.icon} name='location-sharp' size={14} /> PICK UP ADDRESS</Text>
                <Text style={styles.itemlabel}>{tripData.tripInfo.pickUpAddress}</Text> 
              </View> 
            </View>
          </View>
        </View>   
        <View style={styles.item}> 
            <View style={{flex: 1, alignContent: "center"}}>  
                <Avatar
                  size="large"
                  rounded
                  title="NI"
                  source={{ uri: facilityInfo.avatar }}
                />  
            </View> 
            <View style={{flex: 2, alignItems: 'flex-start'}}>
                <Text style={styles.title}>{facilityInfo.fullName}</Text>  
                <Text style={styles.tripname}>TOMMY</Text>  
            </View>
            <View style={{flex: 1 ,flexDirection: "column" }}>
                <View style={styles.itemCount}>
                  <Text style={styles.numberText}>2127</Text>
                  <Image source={require('../../../assets/images/Package.png')} style={{ width: 28,resizeMode: 'center', height: 27, marginBottom: 5 }}/> 
                </View> 
                <View style={styles.itemCount}>
                  <Text style={styles.numberText}>213</Text>
                  <Image source={require('../../../assets/images/plane.png')} style={{ width: 28,resizeMode: 'center', height: 20}}/> 
                </View> 
            </View>
        </View> 
        <View style={styles.itemLists}> 
          <View style={{flex: 1, alignItems: "center"}}>
            <Text style={styles.mainText}>CATEGORY</Text> 
          </View>
          <View style={{flex: 4, flexDirection: 'column' }}>  
                {tripData.categoryLists.map((data , index) => (
                  <View key={index} style={styles.itembox}>
                    <Text style={styles.itemlabel}> <FontAwesome5 style={styles.icon} name={data.item} size={16} />  {data.category}</Text> 
                    <Text style={styles.catText}>{data.price} {data.currency} / {data.weight}</Text>  
                  </View>
                 ))}
          </View>
        </View> 
        <View style={{flex: 1 }}>
          <Text style={styles.mainText}>FACILITY INFO</Text> 
          <Text style={styles.facilityInfo}>{tripData.tripInfo.facilityInfo}</Text> 
        </View>   
        <View style={styles.itemLists}> 
          <View style={{flex: 1, alignItems: "center"}}>
            <Text style={styles.mainText}>PROHIBITED ITEMS</Text> 
          </View>
          <View style={{flex: 4, flexDirection: 'column' }}>  
                {tripData.prohibitedLists.map((data ,index) => (
                  <View key={index} style={styles.itembox}>
                    <Text style={styles.itemlabel}> <FontAwesome5 style={styles.icon} name={data.item} size={16} />  {data.category}</Text>  
                  </View>
                 ))}
          </View>
        </View>  
          { userData.type === "user" && (
            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center' }}> 
                <TouchableOpacity onPress={showModal}>
                  <Image source={require('../../../assets/images/reserveBtn.png')} style={{ width: 316,resizeMode: 'center', height: 45 , marginBottom: "3%"}}/>
                </TouchableOpacity> 
                <Modal isVisible={isModalVisible} wipeDirection={['up', 'left', 'right', 'down']} style={styles.view} > 
                  <View style={styles.modalView}>
                      <Text style={styles.title}>Reserve your package </Text> 
                      <Text style={styles.subtitle}>Package Summary</Text> 
                      <View style={{ flex: 2, flexDirection: "column" }}>  
                          <View style={styles.itemHeader} > 
                            <Text style={styles.itemTitle}>Item Description</Text>
                            <Text style={styles.itemTitle}>Qty</Text>
                          </View>   
                          {itemList.length != 0  &&
                            <ScrollView>
                            {itemList.map((data, index ) => (
                              <View style={styles.itemRow} key={index}>
                                <Text style={styles.deslabel}> {data.item}</Text>  
                                <Text style={styles.deslabel}> {data.qty} x </Text>  
                              </View>
                            ))}
                            </ScrollView>
                          }
                          <View style={styles.itemRow} > 
                            <TextInput style={styles.itemInputLg} placeholder="Input Your Item Here ...." onChangeText={setItem}/>
                            <TextInput style={styles.itemInputXs} placeholder="Qty" onChangeText={setQty}/>
                          </View>    
                          <TouchableOpacity onPress={addList} style={{ flexDirection: "row", justifyContent: 'center' }}> 
                            <FontAwesome5 style={styles.addicon} name="plus-circle" size={23} />
                            <Text style={styles.addlabel}> Add </Text> 
                          </TouchableOpacity>   
                      </View> 
                      <View style={{ flex: 1, flexDirection: "column" }}>
                          <Text style={styles.inputLabel}>Receiver Name</Text>
                          <TextInput style={styles.input}  placeholder="Receiver Name"/>
                          <Text style={styles.inputLabel}>Receiver Contact</Text>
                          <TextInput style={styles.input}  placeholder="Receiver Contact"/>
                        <TouchableOpacity onPress={hideModal} style={{ flex: 1, flexDirection: "row", justifyContent: 'center' }}>
                          <Image source={require('../../../assets/images/confirmBtn.png')} style={{ width: 316,resizeMode: 'center', height: 45 , marginBottom: "3%"}}/>
                        </TouchableOpacity>  
                      </View>
                  </View>
                </Modal>
            </View>
          )}
          <Spinner
            visible={spinner}
            textStyle={{ color: "#fff" }}
            overlayColor="rgba(0,0,0,0.5)"
          />
      </ScrollView>
  )
}