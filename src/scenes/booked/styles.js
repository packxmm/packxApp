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
    fontSize: 11, 
    fontFamily: "Ubuntu",
    color: "#3F3D56"
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
    paddingVertical: "2%",   
    borderTopColor: '#E5F1F2',
    borderTopWidth: 1,
  },
  tableTitle: {
    flex: 1,
    flexDirection: "row",  
    justifyContent: 'space-between',
    paddingVertical: "2%",
  },
  tableTitleText : { 
    flex: 1, 
    color: '#2797A6',
    fontSize: 12,
    fontFamily: "UbuntuMedium", 
    textTransform: 'capitalize'
  },
  tableTitledec : {
    flex: 3,
    color: '#2797A6',
    fontSize: 12,
    fontFamily: "UbuntuMedium", 
    textTransform: 'capitalize' 
  },
  tableRow: { 
    flexDirection: "row",
    justifyContent: 'space-around',
    borderTopColor: '#E5F1F2',
    borderTopWidth: 1, 
    paddingVertical :  "3%" 
  },
  amountRow: { 
    flexDirection: "column",
    alignItems: 'flex-end',
    borderTopColor: '#ECEFEF',
    borderTopWidth: 1,
    padding :  "2%" 
  }, 
  amountText : {
      flexDirection: "row",
      borderBottomColor: '#ECEFEF',
      borderBottomWidth: 1,
      marginVertical :  "2%" 
  },
  switchRow : {
      flexDirection: "row",
      alignItems: 'center',
  },
  dectext: {
    flex: 3, 
    fontSize: 11, 
    textTransform: 'capitalize',
    fontFamily: "Ubuntu",
    color: "#3F3D56"
  },
  totalLabel: {
    fontSize: 13,
    fontFamily: "UbuntuMedium", 
    paddingVertical :  "3%",
    paddingEnd:  "3%"
  },
  input: {
    flex: 1,
    fontSize: 11,
    color: "#3F3D56",
    fontFamily: 'Ubuntu',
    marginHorizontal: "2%",
    textAlign: 'center'
  },
  switchBtn : {
    marginRight: "3%",
    transform: [{ scaleX: .7 }, { scaleY: .7 }]
  }
})
