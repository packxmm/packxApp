import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "3%"
  },
  input: { 
    fontFamily: 'Ubuntu',
    width: "70%"
  },
  header: { 
    flex: 1,
    flexDirection: 'column',
    paddingBottom:  "6%",
    paddingTop:  "4%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainText: {
    fontSize: 25,
    fontFamily: 'UbuntuBold',
    paddingLeft: 5, 
    color: "#1B9494", 
  },
  text: {
    fontSize: 13, 
    fontFamily: 'Ubuntu',
    padding : 10,
    color: "#8E9696",
  }, 
  searchBar:{
    flexDirection: 'row',
    backgroundColor: "#FFFFFF",
    borderColor: "#C8C8C8",
    borderRadius: 15, 
    borderWidth: 1,
    marginVertical: 20,
    padding: 10,
    justifyContent: 'space-between'
  },
  itemLists:{  
    alignContent: 'flex-start'
  },
  item: {
    color: "#185354",
    flexDirection: 'row',
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
    textTransform: 'uppercase'
  },
  numberText:{ 
    color:  '#169393', 
    fontFamily: "UbuntuBold",
  },
  tripHeader:{
    flex: 1,  
    justifyContent: 'space-between', 
    borderBottomColor: '#E5F1F2',
    borderBottomWidth: 1,
    marginBottom: "2%",
  },
  tripList: {
    flex: 1,  
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
  datelabel: { 
    fontSize: 10,
    marginVertical: 8,
    color:  '#169393',
  },
  dateText: {
    fontSize: 12,
    textTransform: "uppercase",
    fontFamily: "UbuntuMedium",
    color: "#185354",
  },
  rightArr: {
    flex: 1 ,
    flexDirection: "row", 
    borderLeftColor: "#E5F1F2",
    borderLeftWidth: 1,
    alignItems: "center", 
    justifyContent: 'flex-end',
    marginLeft: "2%",
  }
})
