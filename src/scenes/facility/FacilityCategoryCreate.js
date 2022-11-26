import React , { useState } from 'react';
import uuid from 'react-native-uuid';
import styles from './styles' 
import { firebase } from '../../firebase/config'
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button'
import Spinner from 'react-native-loading-spinner-overlay'
import { View, Text, TextInput, TouchableOpacity, Platform,ScrollView , StatusBar, useColorScheme, SafeAreaView} from 'react-native';

const data = [
  { category: 'General Item', value: '1' , itemname:'box'},
  { category: 'Clothing', value: '2', itemname:'tshirt' },
  { category: 'Electronics', value: '3' , itemname:'battery-half'},
  { category: 'Food', value: '4' , itemname:'utensils'},
  { category: 'Cosmetics', value: '5' , itemname:'spa'},
  { category: 'Watches', value: '6' , itemname:'clock'},
  { category: 'Phone', value: '7' , itemname:'mobile-alt'},
  { category: 'Custom Category', value: '8' , itemname:'clipboard-list'},
];

const prohibitedData = [
  { category: 'Radioactive materials', value: '1' , itemname:'fan'},
  { category: 'Strong Acid', value: '2', itemname:'flask' },
  { category: 'Explosive stuffs', value: '3' , itemname:'bahai'},
  { category: 'Cash or Money', value: '4' , itemname:'money-bill-alt'},
  { category: 'Classified Documents', value: '5' , itemname:'folder-minus'},
  { category: 'Alcholic Beverages', value: '6' , itemname:'glass-cheers'} 
];

const weight = [
  { weight: 'lb', value: '1' },
  { weight: 'kg', value: '2' },
  { weight: 'pc', value: '3' },
];

const currency = [
  { currency: 'USD', value: '1' },
  { currency: 'SGD', value: '2' },
  { currency: 'MMK', value: '3' },
  { currency: 'EUR', value: '4' },
  { currency: 'CAD', value: '5' },
  { currency: 'JPY', value: '6' },
  { currency: 'THB', value: '7' },
  { currency: 'AUD', value: '8' },
  { currency: 'THB', value: '9' },
  { currency: 'CHF', value: '10' },
  { currency: 'KPW', value: '11' },
  { currency: 'QAR', value: '12' },
  { currency: 'INR', value: '13' },
  { currency: 'IDR', value: '14' },
  { currency: 'LAK', value: '15' },
];

function FacilityCategoryForm(props){ 
  const userData = props.extraData;
  const [tripData] = useState(props.tripInfo); 
  const [spinner, setSpinner] = useState(false) 
  const tripInformation = props.route.params.otherParam;  
  console.log(tripInformation)

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

  const [categoryLists,setCategoryLists] = useState(props.tripInfo === undefined ? [] : tripData.categoryLists);
  const [value, setValue] = useState(null);
  const [category, setCategory] = useState(null);
  const [categoryItem, setCategoryItem] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [weightItem , setWeight] = useState(props.tripInfo === undefined ? null : tripData.categoryLists[0].weight);
  const [weightVal , setWeightVal] = useState(null);
  const [isFocusWeight, setIsFocusWeight] = useState(false); 
  const [currencyItem , setCurrency] = useState(null);
  const [currencyVal , setCurrencyVal] = useState(null);
  const [isFocusCur, setIsFocusCur ] = useState(false); 
  const [priceVal, onChangePrice] = useState("");
  const [prohibitedLists,setProLists] = useState(props.tripInfo === undefined ? [] : tripData.prohibitedLists);
  const [prohibitedVal, setprohibitedVal] = useState(null); 
  const [prohibitedName,setprohibitedName] = useState([]);
  const [prohibitedItem, setProhibitedItem] = useState(null);
  const [isPHFocus, setIsPHFocus] = useState(false);
  const [isEdit] = useState(props.tripInfo === undefined ? false : true);

  function addList(){
    setCategoryLists(countryList => [{ 
      category: category,
      item : categoryItem,
      weight: weightVal,
      price: priceVal,
      currency: currencyVal  
    },...countryList]);
  }
    
  function addProList(){
    setProLists(proLists => [{ 
      category: prohibitedName,
      item : prohibitedItem, 
    },...proLists]);
  }
 
  function goToTrips(){ 
    const generateUuid = uuid.v4();
    let getUuid;
    if(Platform.OS === 'android'){ 
      getUuid = generateUuid.replace('-', '');
    }else{ 
      getUuid = generateUuid.replaceAll('-', '');
    } 
    setSpinner(true)
    if(isEdit === true){
      const updateData = {   
        tripInfo : tripInformation,
        categoryLists : categoryLists,
        prohibitedLists : prohibitedLists, 
        timestamp : new Date().toLocaleString('en-US')
      }  
      const updateTrip = firebase.firestore().collection('trips').doc(tripData.tripId);
      updateTrip
      .update(updateData)
      .then(() => {
        props.navigation.navigate('MY TRIP');
        setSpinner(false)
      });
    }else{ 
      const data = { 
        tripId : getUuid,
        facilityId : userData.id,
        tripInfo : tripInformation,
        categoryLists : categoryLists,
        prohibitedLists : prohibitedLists,
        trackingStatus : "reserved",
        packageLists: [],
        timestamp : new Date().toLocaleString('en-US')
      }  
      const usersRef = firebase.firestore().collection('trips')
      usersRef
        .doc(getUuid)
        .set(data)
        .then(() => {
          props.navigation.navigate('MY TRIP')
        })
        .catch((error) => {
          setSpinner(false)
          alert(error)
        });
    }
  } 

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>  
      <StatusBar animated={true} backgroundColor="#FAFAFA" barStyle="dark-content"/> 
      <View>
      <View style={styles.header}>
        <Text style={styles.text}> Create New Trip </Text>
        <Text style={styles.text}> 2 of 2 </Text>
      </View>

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always">
          {categoryLists.length > 0 && (
            <ScrollView style={styles.addRoute}>
                <Text style={styles.label}>PRICIE CHART</Text>  
                {categoryLists.map((data, index ) => (
                  <View style={styles.itembox} key={index}>
                    <Text style={styles.itemlabel}> <FontAwesome5 style={styles.item} name={data.item} size={16} />  {data.category}</Text> 
                    <Text style={styles.itemlabel}>{data.price} {data.currency} / {data.weight}</Text>  
                  </View>
                 ))}
            </ScrollView>  
          )}
        <Text style={styles.inputLabel}>Select pre-set categories</Text>
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderboldStyle}
            selectedTextStyle={styles.selectedTextStyle} 
            iconStyle={styles.iconStyle}
            data={data} 
            fontFamily='Ubuntu' 
            maxHeight={200}  
            activeColor="#D9D9D9"
            labelField="category"
            valueField="value"
            placeholder={!isFocus ? 'Choose Category' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setCategory(item.category)
              setCategoryItem(item.itemname)
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <FontAwesome
                style={styles.icon}
                color={isFocus ? 'blue' : 'black'}
                name="list-alt"
                size={23}
              />
            )}
            renderRightIcon={() => (
              <FontAwesome
                style={styles.icon}
                color={isFocus ? 'blue' : 'black'}
                name="chevron-down"
                size={23}
              />
            )}
        />
        <View style={styles.addcategory}>
          <View style={styles.category}> 
            <Text style={styles.inputLabel}>Category</Text>
            <TextInput style={styles.input}  value={category} onChangeText={setCategory} placeholderTextColor="#D9D9D9" placeholder="Custom Category"/>
          </View>
          <View style={styles.amount}> 
            <Text style={styles.inputLabel}>Price</Text>
            <TextInput style={styles.input} placeholderTextColor="#D9D9D9" placeholder="Amount" onChangeText={onChangePrice}/>
          </View>
        </View>
        <View style={styles.dateList}>
          <View style={styles.dateBox}>
            <Text style={styles.inputLabel}>Weight</Text>
            <Dropdown
                style={[styles.weight, isFocusWeight && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle} 
                iconStyle={styles.iconStyle}
                data={weight} 
                maxHeight={300}
                labelField="weight"
                valueField="value"
                placeholder={!isFocusWeight ? 'LB / KG / PC' : '...'} 
                value={weightItem}
                onFocus={() => setIsFocusWeight(true)}
                onBlur={() => setIsFocusWeight(false)}
                onChange={item => {
                  setWeight(item.value);
                  setWeightVal(item.weight)
                  setIsFocusWeight(false);
                }} 
              renderRightIcon={() => (
                <FontAwesome
                  style={styles.icon}
                  color={isFocusWeight ? 'blue' : 'black'}
                  name="chevron-down"
                  size={20}
                />
              )}
            />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.inputLabel}>Currency</Text> 
            <Dropdown
                style={[styles.weight, isFocusCur && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle} 
                iconStyle={styles.iconStyle}
                data={currency}
                maxHeight={300}
                labelField="currency"
                valueField="value"
                placeholder={!isFocusCur ? 'Choose ' : 'Choose'} 
                value={currencyItem}
                onFocus={() => setIsFocusCur(true)}
                onBlur={() => setIsFocusCur(false)}
                onChange={item => {
                  setCurrency(item.value);
                  setCurrencyVal(item.currency);
                  setIsFocusCur(false);
                }} 
              renderRightIcon={() => (
                <FontAwesome
                  style={styles.icon}
                  color={isFocusCur ? 'blue' : 'black'}
                  name="chevron-down"
                  size={20}
                />
              )}
            />
          </View>
        </View>  
        <TouchableOpacity style={styles.dateList} onPress={addList} > 
                <FontAwesome
                  style={styles.icon}
                  name="plus-circle"
                  size={23}
                />
               <Text style={styles.label}> Add </Text> 
        </TouchableOpacity>
        {prohibitedLists.length > 0 && (
            <ScrollView style={styles.addRoute}>
                <Text style={styles.label}>PROHIBITED ITEM</Text>  
                {prohibitedLists.map((data , index) => (
                  <View style={styles.itembox} key={index}>
                    <Text style={styles.itemlabel}> <FontAwesome5 style={styles.item} name={data.item} size={16} />  {data.category}</Text>  
                  </View>
                 ))}
            </ScrollView>  
          )}
        <Text style={styles.inputLabel}>Select pre-set prohibited item</Text>
        <Dropdown
            style={[styles.dropdown, isPHFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderboldStyle}
            selectedTextStyle={styles.selectedTextStyle} 
            iconStyle={styles.iconStyle}
            data={prohibitedData} 
            fontFamily='Ubuntu' 
            maxHeight={200}  
            activeColor="#D9D9D9"
            labelField="category"
            valueField="value"
            placeholder={!isPHFocus ? 'Add prohibited item' : '...'}
            searchPlaceholder="Search..."
            value={prohibitedVal}
            onFocus={() => setIsPHFocus(true)}
            onBlur={() => setIsPHFocus(false)}
            onChange={item => {
              setprohibitedVal(item.value);
              setprohibitedName(item.category)
              setProhibitedItem(item.itemname)
              setIsPHFocus(false);
            }}
            renderLeftIcon={() => (
              <FontAwesome
                style={styles.icon}
                color={isPHFocus ? 'blue' : 'black'}
                name="ban"
                size={23}
              />
            )}
            renderRightIcon={() => (
              <FontAwesome
                style={styles.icon}
                color={isPHFocus ? 'blue' : 'black'}
                name="chevron-down"
                size={23}
              />
            )}
        /> 
        <View style={{ flex: 1 }}> 
          <Text style={styles.inputLabel}>Prohitbited item</Text>
          <TextInput style={styles.input} value={prohibitedName} placeholderTextColor="#D9D9D9" placeholder="Custom Prohitbited Item"/>
        </View>   
        <TouchableOpacity style={styles.dateList} onPress={addProList} > 
          <FontAwesome style={styles.icon} name="plus-circle" size={23} />
          <Text style={styles.label}> Add </Text> 
        </TouchableOpacity> 
        <Button title={"Create Trip"} onPress={goToTrips} children={"flag"}></Button>
      </KeyboardAwareScrollView>
      <Spinner
        visible={spinner}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default FacilityCategoryForm;
