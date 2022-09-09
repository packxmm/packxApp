import React , { useState } from 'react'; 
import DatePicker from 'react-native-datepicker';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Image,ScrollView, SafeAreaView , useColorScheme } from 'react-native';
import styles from './styles'

function FacilityCreateScreen(props){ 

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{flex:1, flexDirection: 'row', paddingLeft: 15}} onPress={() => props.navigation.goBack()}>
          <Image source={require('../../../assets/images/back-arrow.png')} style={{ width: 28,resizeMode: 'center', height: 28}}/>
          <Text style={{color: "#c8c8c8", paddingLeft: 10, paddingTop: 2, fontSize: 18}}>Back</Text>
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
  const [dropOffDate, setdropOffDate] = useState(new Date());
  const [pickUpDate, setpickUpDate] = useState(new Date());
 
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
    <ScrollView>
      <StatusBar barStyle= { scheme.dark ? "light-content" : "dark-content" }/>
      <View style={[styles.container , {marginTop: StatusBar.currentHeight}]}>
        <View style={styles.header}>
          <Text style={styles.text}> Create New Trip </Text>
          <Text style={styles.text}> 1 of 2 </Text>
        </View>
          <SafeAreaView style={styles.addRoute}>
              <Text style={styles.inputLabel} >From</Text>
              <TextInput style={styles.input} onChangeText={setDropOffCity} placeholder="Drop Off City"/>
              <Text style={styles.inputLabel}>To</Text>
              <TextInput style={styles.input} onChangeText={setDesCity} placeholder="Destination City"/>
              <View style={styles.dateList}>
                <View style={styles.dateBox}>
                  <Text style={styles.inputLabel}>Last Drop-Off Date</Text>  
                  <DatePicker
                    style={styles.datePickerStyle} 
                    mode="date"
                    date={dropOffDate}
                    placeholder="Pick The Date"
                    format="DD/MM/YYYY"
                    minDate="01-01-1900"
                    maxDate="06-10-2022"
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
                    format="DD/MM/YYYY"
                    minDate="01-01-1900"
                    maxDate="06-10-2022"
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
                      }
                    }}
                    onDateChange={(date) => {
                      setpickUpDate(date);
                    }}
                  /> 
                </View>
              </View>
          </SafeAreaView> 
          <SafeAreaView style={styles.addAddress}>
            <View style={{flex: 2}}>
              <Text style={styles.inputLabel}>Drop-Off Address</Text>
              <TextInput style={styles.input} onChangeText={setLocDropOff} placeholder="Location To Drop-Off Package"/>
              <TextInput style={styles.input} onChangeText={setSecLocDropOff} placeholder="2nd Address Line ( Optional )"/>
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.inputLabel}>Pick-Up Address</Text>
              <TextInput style={styles.input} onChangeText={setLocPickUp} placeholder="Location To Pick-Up Package"/>
              <TextInput style={styles.input} onChangeText={setSecLocPickUp} placeholder="2nd Address Line ( Optional )"/>
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.inputLabel}>Facility Information</Text>
              <TextInput style={styles.input} onChangeText={setFacilityInfo} placeholder="Describe The Annoucements" multiline={true}
  numberOfLines={3}/>
            </View>
        </SafeAreaView>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center'}}> 
          <TouchableOpacity onPress={goToNext} >
              <Image source={require('../../../assets/images/nextBtn.png')} style={{ width: 316,resizeMode: 'center', height: 45}}/>
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default FacilityCreateScreen;
