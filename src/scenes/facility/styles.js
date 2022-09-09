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
    marginBottom: 15,
    marginTop: 5
  },
  dateList: {
    display: "flex",
    flexDirection: "row",
    marginVertical : 10
  },
  dateBox: {
    flex: 2,
    marginRight: 10
  } 
})
