import React , { useState } from 'react'; 
import DatePicker from 'react-native-datepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, Text, TouchableOpacity , ScrollView, TextInput, StatusBar, useColorScheme, Platform, SafeAreaView} from 'react-native';
import styles from './styles' 
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button'

function FacilityCreateScreen(props){ 
  console.log(props.navigation)

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

  const scheme = useColorScheme(); 
  const [dropOffVal, setDropOffCity] = useState("");
  const [desVal, setDesCity] = useState("");
  const [locDropOff, setLocDropOff] = useState("");
  const [seclocDropOff, setSecLocDropOff] = useState("");
  const [locPickUp, setLocPickUp] = useState("");
  const [seclocPickUp, setSecLocPickUp] = useState("");
  const [facilityInfo, setFacilityInfo] = useState("");
  const [dropOffDate, setdropOffDate] = useState(new Date().toLocaleDateString("en-US"));
  const [pickUpDate, setpickUpDate] = useState(new Date().toLocaleDateString("en-US"));
  const goToNext =  () => {  
    props.navigation.navigate('CreateCategory', { 
      otherParam: {
        dropOff : dropOffVal,
        desVal : desVal,
        dropOffDate : dropOffDate,
        pickUpDate : pickUpDate,
        dropOffAddress: locDropOff,
        secdropOffAddress: seclocDropOff,
        pickUpAddress: locPickUp,  
        secpickUpAddress: seclocPickUp,  
        facilityInfo: facilityInfo  
      }
    });
  } 

  return (
    <SafeAreaView>
    <ScrollView>
    <StatusBar barStyle="dark-content" />
      <View style={[styles.container , {marginTop: StatusBar.currentHeight}]}>
        <View style={styles.header}>
          <Text style={styles.text}> Create New Trip </Text>
          <Text style={styles.text}> 1 of 2 </Text>
        </View>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always">
          <View style={styles.addRoute}>
              <Text style={styles.inputLabel} >From</Text>
              <TextInput style={styles.input} onChangeText={setDropOffCity} placeholder="Drop Off City" multiline={true}/>
              <Text style={styles.inputLabel}>To</Text>
              <TextInput style={styles.input} onChangeText={setDesCity} placeholder="Destination City"  multiline={true}/>
              <View style={styles.dateList}>
                <View style={styles.dateBox}>
                  <Text style={styles.inputLabel}>Last Drop-Off Date</Text>  
                  <DatePicker
                    style={styles.datePickerStyle} 
                    mode="date"
                    date={dropOffDate}
                    placeholder="Pick The Date"
                    format="MM/DD/YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        right: -5,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        borderColor : "gray",
                        alignItems: "flex-start",
                        borderWidth: 0,
                        borderBottomWidth: 1,
                      },
                      placeholderText: {
                        fontSize: 14,
                        color: "gray"
                      },
                      dateText: {
                        fontSize: 14
                      },
                      datePicker:{
                        backgroundColor: scheme === 'dark' ? '#222222' : '#ffffff'
                      }
                    }}
                    onDateChange={(date) => {
                      setdropOffDate(date);
                    }}
                  /> 
                </View>
                <View style={{flex: 2}}>
                  <Text style={styles.inputLabel}>Pick-Up Date</Text>
                  <DatePicker
                    style={styles.datePickerStyle} 
                    date={pickUpDate}
                    mode="date"
                    placeholder="Pick The Date"
                    format="MM/DD/YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        right: -5,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        borderColor : "gray",
                        alignItems: "flex-start",
                        borderWidth: 0,
                        borderBottomWidth: 1,
                      },
                      placeholderText: {
                        fontSize: 14,
                        color: "gray"
                      },
                      dateText: {
                        fontSize: 14,
                        color: "#000"
                      },
                      datePicker:{
                        backgroundColor: scheme === 'dark' ? '#222222' : '#ffffff'
                      }
                    }}
                    onDateChange={(date) => {
                      setpickUpDate(date);
                    }}
                  /> 
                </View>
              </View> 
          </View>
          <View style={styles.addAddress}>
              <View style={{flex: 2}}>
                <Text style={styles.inputLabel}>Drop-Off Address</Text>
                <TextInput style={styles.input} onChangeText={setLocDropOff} placeholder="Location To Drop-Off Package" multiline={true}/>
                <TextInput style={styles.input} onChangeText={setSecLocDropOff} placeholder="2nd Address Line ( Optional )" multiline={true}/>
              </View>
              <View style={{flex: 2}}>
                <Text style={styles.inputLabel}>Pick-Up Address</Text>
                <TextInput style={styles.input} onChangeText={setLocPickUp} placeholder="Location To Pick-Up Package" multiline={true}/>
                <TextInput style={styles.input} onChangeText={setSecLocPickUp} placeholder="2nd Address Line ( Optional )" multiline={true}/>
              </View>
              <View style={{flex: 2}}>
                <Text style={styles.inputLabel}>Facility Information</Text>
                <TextInput style={[styles.input, {height: 150}]} onChangeText={setFacilityInfo} placeholder="Describe The Annoucements" multiline={true}
    numberOfLines={10}/>
              </View>
          </View>  
        <Button title={"Next"} onPress={goToNext} children={"arrow-circle-right"}></Button>
        </KeyboardAwareScrollView>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default FacilityCreateScreen;
