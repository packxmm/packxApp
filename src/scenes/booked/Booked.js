import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, Image, TextInput , Switch} from 'react-native';
import styles from './styles'
import { Avatar } from 'react-native-elements' 
import Button from '../../components/Button'
import WhiteButton from '../../components/Button/WhiteButton'

export default function Booked({route, navigation}) {
  const userData = route.params.user;  
  const tripData = route.params.trip;  
  const currency = tripData.categoryLists[0].currency;
  const weight = tripData.categoryLists[0].weight;
  const [packageData, setPackageData] = useState(route.params.packageInfo);  
  const [totalAmount, setTotalAmount] = useState(0);
  const [confirmed, setConfiremd] = useState(false); 
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{flex:1, flexDirection: 'row', paddingLeft: 15}} onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/images/back-arrow.png')} style={{ width: 28,resizeMode: 'center', height: 28}}/>
          <Text style={{color: "#c8c8c8", paddingLeft: 10, paddingTop: 2, fontSize: 18}}>Back To Lists</Text>
        </TouchableOpacity>
      )
    });
    let total = 0;
    packageData.items.forEach(item => {
      if(item.price !== undefined){ 
        total += parseInt(item.price);
      }
    })
    setTotalAmount(total);
  }, [navigation]);

  const setWeight = (text, index) => {
    let newItem = packageData.items[index];
    newItem.wgt = text;
    setPackageData(prevState => ({
        ...prevState,
        [packageData.items[index]]: newItem
    }));
  }

  const setPrice = (text, index) => {
    let newItem = packageData.items[index];
    newItem.price = text;
    setPackageData(prevState => ({
        ...prevState,
        [packageData.items[index]]: newItem
    }));
    let total = 0;
    packageData.items.forEach(item => {
      if(item.price !== undefined){ 
        total += parseInt(item.price);
      }
    })
    setTotalAmount(total);
  }

  const confirmBooking = () => {  
    setPackageData(prevState => ({
        ...prevState,
        total: totalAmount
    }));
    setConfiremd(true)
  }

  const saveData = () => {   
    if(isEnabled == true){
      setPackageData(prevState => ({
          ...prevState,
          status: "Paid"
      }));
    }
    console.log(packageData)
  }
  return ( 
    <View style={styles.container}>  
      <View style={styles.tripHeader}> 
          <Text style={styles.mainText}>BOOKED TRIP</Text> 
      </View> 
      <View style={styles.item}> 
          <View style={{flex: 1, alignContent: "center"}}> 
            <Avatar
              size="large"
              rounded
              title="NI"
              source={{ uri: userData.avatar }}
            />  
          </View> 
          <View style={{flex: 2, alignItems: 'flex-start', paddingLeft: "5%", justifyContent: "center"}}>
              <Text style={styles.title}>{userData.fullName}</Text>  
          </View>
          <View style={{flex: 1 ,flexDirection: "column" }}>
              <View style={styles.itemCount}>
              <Text style={styles.title}>{packageData.items.length}</Text>
              <Image source={require('../../../assets/images/Package.png')} style={{ width: 28,resizeMode: 'center', height: 27, marginBottom: 10 }}/> 
              </View> 
              <View style={styles.itemCount}>
              <Text style={styles.totalLabel}>{packageData.status}</Text>
              <Image source={require('../../../assets/images/cashImg.png')} style={{ width: 28,resizeMode: 'center', height: 20}}/> 
              </View> 
          </View>
      </View>   
      <View style={{flex: 6}}>
          <View style={styles.tripHeader}> 
              <Text style={styles.mainText}>RESERVED ITEMS</Text> 
          </View>
          <View style={styles.itemList}> 
              <View style={styles.tableTitle}> 
                  <Text style={styles.tableTitledec}>Item Description</Text> 
                  <Text style={styles.tableTitleText}>Qty</Text> 
                  <Text style={styles.tableTitleText}>Wgt</Text> 
                  <Text style={[styles.tableTitleText]}>$</Text> 
                  { confirmed === false && ( 
                    <Text style={styles.tableTitleText}>Manage</Text> 
                  )}
              </View>
          </View>
          {packageData.items.map((val, index) => (
              <View key={index} style={styles.tableRow}>  
                  <Text style={styles.dectext}>{val.item}</Text> 
                  <Text style={[styles.text]}>{val.qty}</Text>  
                  { confirmed === false ? ( 
                    <>
                      <TextInput style={styles.input} value={val.wgt} onChangeText={text => setWeight(text, index)} keyboardType="numeric" placeholder={weight}/>
                      <TextInput style={styles.input} value={val.price} onChangeText={text => setPrice(text, index)} keyboardType="numeric" placeholder={currency}/>
                      <Text style={[styles.text, {color: "#990404"}]}>Remove</Text> 
                    </>
                  ) : (
                    <>
                      <Text style={[styles.text]}>{val.wgt} {weight}</Text>  
                      <Text style={[styles.text]}>{val.price} {currency}</Text>  
                    </>
                  )}
              </View>
          ))}   
          <View style={styles.amountRow}>  
                <View style={styles.amountText}>
                  <Text style={styles.totalLabel}>TOTAL AMOUNT </Text>
                  <Text style={styles.totalLabel}>{totalAmount} {currency}</Text> 
                </View>
               { confirmed === true && (   
                <View style={styles.switchRow}>
                  <Text style={styles.totalLabel}>Unpaid</Text>  
                  <Switch
                      style={styles.switchBtn}
                      trackColor={{ false: "#767577", true: "#2797A6" }}
                      thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                    <Text style={styles.totalLabel}>Paid</Text>  
                </View>
                )}
          </View>
      </View>    
      
      { confirmed === true ? ( 
        <View  style={{marginBottom: "5%"}}>
          <Button title={"Save"} children={'save'} onPress={saveData}/> 
        </View> 
      ) :
      (
        <>
          <Button title={"Confirm"} children={'check'}  onPress={confirmBooking} /> 
          <WhiteButton title={"Refuse"} children={'remove'}/>
        </>
      )
      }
    </View>
  )
}