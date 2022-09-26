import { StyleSheet } from 'react-native';

export default StyleSheet.create({ 
  container: {
    flex: 1,
    paddingHorizontal: 20 ,
    backgroundColor: '#FAFAFA'
  },
  mainText: {
    fontSize: 18,
    fontFamily: 'UbuntuMedium',
    padding : 10, 
  }, 
  text:{ 
    fontSize: 13,
    fontFamily: "UbuntuMedium", 
    textTransform: 'capitalize',
  },
  title: { 
    color: "#185354",
    fontSize: 16,
    fontFamily: "UbuntuMedium", 
    textTransform: 'uppercase',
    paddingVertical: "3%"
  },
  numberText:{ 
    color:  '#169393', 
    fontFamily: "UbuntuBold",
  },
  tripHeader:{ 
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between', 
    marginVertical: "2%",
  },
  tripList: {
    display: "flex",
    flexDirection: "row", 
    padding: "2%",   
    borderTopColor: '#E5F1F2',
    borderTopWidth: 1,
  },
  triplabel: {
    fontSize: 12,
    marginBottom: 8,
    color: "rgba(23,25,48,0.6)",
    fontFamily: "Ubuntu",
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
  icon: {
    color: "#185354",
  },
  dateText: {
    fontSize: 12, 
    fontFamily: "UbuntuMedium",
    color: "#185354",
  },
  locLabel: { 
    fontSize: 10,
    marginVertical: 8, 
    fontFamily: 'Ubuntu',
    color: "rgba(23,25,48,0.6)"
  },
  locText: {
    fontSize: 12,
    paddingLeft: 5 ,
    fontFamily: 'Ubuntu',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    color: "#185354",
    fontSize: 14,
    backgroundColor: "#E5F1F2",
    borderRadius: 20,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    marginBottom: "3%",
  },
  reserved: {
    backgroundColor: "#CECECE", 
  },
  itemCount : {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between', 
  }
})
