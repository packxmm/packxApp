import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20 ,
    backgroundColor: '#FAFAFA', 
  },
  mainText: {
    fontSize: 18,
    fontFamily: 'UbuntuMedium',
    marginVertical :  "4%", 
  }, 
  text:{ 
    fontSize: 12, 
    fontFamily: "Ubuntu",
    textTransform: 'capitalize',
    flex: 1,
  },
  title: { 
    color: "#185354",
    fontSize: 16,
    fontFamily: "UbuntuMedium", 
    textTransform: 'uppercase',
    paddingVertical: "3%"
  }, 
  tripHeader:{  
    display: 'flex',
    marginVertical: "1%",
  },
  item: { 
    display: 'flex',
    flexDirection: 'row',
    color: "#185354",
    fontSize: 14,
    backgroundColor: "#E5F1F2",
    borderRadius: 20,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  itemCount : {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between', 
  },
  itemList: {
    display: "flex",
    flexDirection: "row", 
    padding: "2%",   
    borderTopColor: '#E5F1F2',
    borderTopWidth: 1,
  },
  tableTitle: {
    flex: 1,
    flexDirection: "row",  
    justifyContent: 'space-between',
    paddingVertical: "2%"
  },
  tableTitleText : { 
    flex: 1, 
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#2797A6',
    fontSize: 13,
    fontFamily: "UbuntuMedium", 
    textTransform: 'capitalize'
  },
  tableTitledec : {
    flex: 3,
    color: '#2797A6',
    fontSize: 13,
    fontFamily: "UbuntuMedium", 
    textTransform: 'capitalize' 
  },
  tableRow: { 
    flexDirection: "row",
    justifyContent: 'space-around',
    borderTopColor: '#E5F1F2',
    borderTopWidth: 1,
    paddingHorizontal :  "2%", 
    paddingVertical :  "3%" 
  },
  amountRow: { 
    flexDirection: "row",
    justifyContent: 'flex-end',
    borderTopColor: '#ECEFEF',
    borderTopWidth: 1,
    borderBottomColor: '#ECEFEF',
    borderBottomWidth: 1,
    padding :  "2%" 
  }, 
  dectext: {
    flex: 3, 
    fontSize: 13, 
    textTransform: 'capitalize',
    fontFamily: "Ubuntu",
  },
  totalLabel: {
    fontSize: 13,
    fontFamily: "UbuntuMedium", 
    paddingVertical :  "3%",
    paddingEnd:  "3%"
  } 
})