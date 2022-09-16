import React from 'react'; 
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles'
import { Avatar } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/Button'
import WhiteButton from '../../components/Button/WhiteButton'

export default function Booked({route, navigation}) {
  const userData = route.params.user;  
  const packageData = route.params.packageInfo;  
  console.log(userData)
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{flex:1, flexDirection: 'row', paddingLeft: 15}} onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/images/back-arrow.png')} style={{ width: 28,resizeMode: 'center', height: 28}}/>
          <Text style={{color: "#c8c8c8", paddingLeft: 10, paddingTop: 2, fontSize: 18}}>Back To Lists</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);
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
              <Text style={styles.text}>{packageData.status}</Text>
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
                  <Text style={styles.tableTitleText}>$</Text> 
                  <Text style={styles.tableTitleText}>Manage</Text> 
              </View>
          </View>
          {packageData.items.map((val, index) => (
              <View key={index} style={styles.tableRow}>  
                  <Text style={styles.dectext}>{val.item}</Text> 
                  <Text style={styles.text}>{val.qty}</Text> 
                  <Text style={styles.text}>{val.weight ? val.weight : "-" }</Text> 
                  <Text style={styles.text}>{val.price ? val.price : "-"}</Text> 
                  <Text style={styles.text}>Remove</Text> 
              </View>
          ))}   
          <View style={styles.amountRow}>  
               <Text style={styles.totalLabel}>TOTAL AMOUNT </Text>
               <Text style={styles.totalLabel}>-</Text> 
          </View>
      </View>    
        <Button title={"Confirm"}>
          <FontAwesome style={{color: "#fff", marginRight: 10 }}  name='check' size={20} />
        </Button>
        <WhiteButton title={"Refuse"}>
          <FontAwesome style={{color: "#169393", marginRight: 10 }}  name='remove' size={20} />
        </WhiteButton>
    </View>
  )
}