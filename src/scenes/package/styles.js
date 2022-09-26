import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "3%",
    marginHorizontal: "4%"
  },
  header: { 
    flexDirection: 'column',
    paddingBottom: 10
  },
  mainText: {
    fontSize: 25,
    fontFamily: 'UbuntuBold',
    padding : 5, 
  },
  text: {
    fontSize: 18,
    fontFamily: 'UbuntuBold',
    padding : 10,
  },
  itemLists:{  
    alignContent: 'flex-start'
  },
  item: {
    color: "#185354",
    fontSize: 14,
    backgroundColor: "#FFFFFF",
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderRadius: 10,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    marginBottom: "2%",
  },
  title: {
    marginBottom: 10,
    color: "#185354",
    fontSize: 14,
    fontFamily: "UbuntuMedium", 
  },
  numberText:{ 
    color:  '#169393', 
    fontFamily: "UbuntuBold",
  },
  tripHeader:{ 
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between', 
    borderBottomColor: '#E5F1F2',
    borderBottomWidth: 2,
    paddingBottom: "2%",
    marginBottom: "2%",
    height: 40
  },
  tripList: {
    display: "flex",
    flexDirection: "row"
  },
  triplabel: {
    fontSize: 12,
    marginBottom: 8,
    color: "rgba(23,25,48,0.6)"
  },
  tripname: {
    fontSize: 12,
    textTransform: "uppercase",
    fontFamily: "UbuntuMedium",
  }, 
  dateText: {
    fontSize: 12,
    textTransform: "uppercase",
    fontFamily: "UbuntuMedium",
    color: "#185354",
    marginVertical: 8,
  },
  statusBtn : { 
    display: "flex",
    flexDirection: "row",
    borderRadius: 15,  
    marginBottom: "2%", 
    paddingVertical: 2,
    paddingHorizontal: "3%",
    height: 25
  },
  statusText: {
    fontSize: 13,
    paddingTop: 2,
    textTransform: "uppercase",
    fontFamily: "UbuntuMedium",
    color: "#000000", 
  },
  reserved : {
    backgroundColor: "#E5F1F2"
  },
  received : {
    backgroundColor: "#C9EFEF", 
  }
})
