import React , { useState } from 'react';
import uuid from 'react-native-uuid';
import { firebase } from '../../firebase/config'
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 
import Spinner from 'react-native-loading-spinner-overlay'
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet,ScrollView , StatusBar, useColorScheme} from 'react-native';

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
  console.log(userData)
  const [spinner, setSpinner] = useState(false)
  const scheme = useColorScheme();
  const tripInformation = props.route.params;  
  console.log("Facility Category Form")
  console.log(tripInformation.otherParam)

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

  const [categoryLists,setCategoryLists] = useState([]);
  const [value, setValue] = useState(null);
  const [category, setCategory] = useState(null);
  const [categoryItem, setCategoryItem] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [weightItem , setWeight] = useState(null);
  const [weightVal , setWeightVal] = useState(null);
  const [isFocusWeight, setIsFocusWeight] = useState(false); 
  const [currencyItem , setCurrency] = useState(null);
  const [currencyVal , setCurrencyVal] = useState(null);
  const [isFocusCur, setIsFocusCur ] = useState(false); 
  const [priceVal, onChangePrice] = useState("");
  const [prohibitedLists,setProLists] = useState([]);
  const [prohibitedVal, setprohibitedVal] = useState(null); 
  const [prohibitedName,setprohibitedName] = useState([]);
  const [prohibitedItem, setProhibitedItem] = useState(null);
  const [isPHFocus, setIsPHFocus] = useState(false);

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
 
  function goToOrder(){ 
    const generateUuid = uuid.v4();
    const getUuid = generateUuid.replaceAll('-', '');
    console.log("getUuid " + getUuid)
    setSpinner(true)
    const data = { 
      tripId : getUuid,
      facilityId : userData.id,
      tripInfo : tripInformation.otherParam,
      categoryLists : categoryLists,
      prohibitedLists : prohibitedLists
    } 
    const usersRef = firebase.firestore().collection('trips')
    usersRef
      .doc(getUuid)
      .set(data)
      .then(() => {
        props.navigation.navigate('PROFILE', {trips: data})
      })
      .catch((error) => {
        setSpinner(false)
        alert(error)
      });
  } 

  return (
    <ScrollView> 
      <StatusBar barStyle= { scheme.dark ? "light-content" : "dark-content" }/>
      <View style={[styles.container , {marginTop: StatusBar.currentHeight}]}>
      <View style={styles.header}>
        <Text style={styles.text}> Create New Trip </Text>
        <Text style={styles.text}> 2 of 2 </Text>
      </View>
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
            <TextInput style={styles.input} defaultValue={category} onChangeText={setCategory} placeholder="Custom Category"/>
          </View>
          <View style={styles.amount}> 
            <Text style={styles.inputLabel}>Price</Text>
            <TextInput style={styles.input} placeholder="Amount" onChangeText={onChangePrice}/>
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
          <TextInput style={styles.input} defaultValue={prohibitedName} placeholder="Custom Item"/>
        </View>  
         
        <TouchableOpacity style={styles.dateList} onPress={addProList} > 
               <FontAwesome style={styles.icon} name="plus-circle" size={23} />
               <Text style={styles.label}> Add </Text> 
        </TouchableOpacity>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center', marginTop: 15}}> 
        <TouchableOpacity onPress={goToOrder} >
            <Image source={require('../../../assets/images/createTripBtn.png')} style={{ width: 316,resizeMode: 'center', height: 45}}/>
        </TouchableOpacity>
      </View> 
      <Spinner
        visible={spinner}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </View>
    </ScrollView>
  );
};

export default FacilityCategoryForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "4%"
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20
  },
  text: {
    fontSize: 18,
    fontFamily: 'UbuntuBold',
    paddingLeft: 10,
  },
  addRoute: {
    flex: 2,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    backgroundColor: "#FFFFFF",
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 20,
    height: 250,
    marginBottom: "5%",
  }, 
  addcategory: { 
    flex: 2,
    paddingHorizontal: "1%",
    display: "flex",
    flexDirection: "row",
  },
  category: { 
    width: "55%",
    marginRight: "5%",
  },
  amount: { 
    width: "40%",
  },
  inputLabel:{
    color: "#333333",
    fontSize: 12
  },
  input: {
    padding: 10,
    fontSize: 14,
    borderBottomColor: "#D7DEDD",
    borderBottomWidth: 1,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    fontFamily: 'Ubuntu',
  },
  weight: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    fontSize: 14,
    borderBottomColor: "#D7DEDD",
    fontFamily: 'Ubuntu',
    borderBottomWidth: 1,
    marginVertical: 10,
    backgroundColor: "#ffffff",
  },
  dateList: {
    display: "flex",
    flexDirection: "row",
    margin : "1%",
    justifyContent: "flex-end"
  },
  dateBox: {
    flex: 2,
    marginRight: "5%",
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: 'Ubuntu',
    color: "#D9D9D9",
  },
  selectedTextStyle :{ 
    fontSize: 14,
    fontFamily: 'Ubuntu',
    color: "#333333",
  },
  placeholderboldStyle: {
    fontSize: 14,
    fontFamily: 'UbuntuBold',
    color: "#333333",
  },
  dropdown: {
    width: '80%',
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    padding: 5,
    marginVertical: 20,
    color: "#333",
    fontFamily: 'UbuntuBold',
  },
  icon: {
    color: "#085252", 
    marginHorizontal: 10
  },
  label: {
    fontSize: 16,
    color: "#085252",
    fontFamily: 'UbuntuBold',
    marginBottom: 10, 
  },
  item: {
    color: "#085252", 
  },
  itemlabel: { 
    fontSize: 14,
    color: "#085252", 
  },
  itembox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30
  }
});
