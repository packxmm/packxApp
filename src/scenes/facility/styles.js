import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    maxHeight: 250,
    marginBottom: "5%",
  }, 
  addAddress: {
    flex: 3,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    backgroundColor: "#FFFFFF",
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 20,
    marginBottom: "5%",
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
  dateList: {
    display: "flex",
    flexDirection: "row",
    margin : "1%",
    justifyContent: "flex-end"
  },
  dateBox: {
    flex: 2,
    marginRight: 10
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
})
