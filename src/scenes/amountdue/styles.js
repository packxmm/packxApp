import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container:{
      flex: 1, 
      paddingHorizontal: "5%", 
      marginTop: "5%" 
  }, 
  amountDue:{
    backgroundColor: "#FFFFFF",
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 15,
    marginVertical: "2%",
    padding: "5%",
    justifyContent: 'space-between'
  },
  header: {
    fontSize: 16,
    fontFamily: 'UbuntuBold',
    paddingBottom : 10,
  },
  title: {
    marginBottom: 10,
    color: "#169393",
    fontSize: 14,
    fontFamily: "UbuntuBold", 
  },
  Row: { 
    flexDirection: 'row', 
    justifyContent: "space-between",
  },
  icon: {
    color: "#185354",
  }, 
  itembox: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    borderTopColor: "#E5F1F2",
    borderTopWidth: 1,
    padding: 10
  },
  text: {
    flex: 2,
    fontSize: 14,
    fontFamily: "Ubuntu", 
    textAlign: 'right'
  },
  amountText : {
      flexDirection: "row",
      justifyContent: "flex-end",
      borderTopColor: '#ECEFEF',
      borderTopWidth: 1,
      marginTop :  "1%",
      paddingTop :  "5%" 
  },
  totalLabel: {
    flex: 4,
    fontSize: 13,
    fontFamily: "UbuntuMedium", 
    padding :  "1%",
    textAlign: 'right'
  },
  item: {
    color: "#185354",
    fontSize: 14,
    padding: 10,
    borderTopColor: '#E5F1F2',
    borderTopWidth: 2,
  },
  tripList: {
    display: "flex",
    flexDirection: "row"
  },
  tripStatus: {
    color: "#185354",
    fontSize: 17, 
    fontFamily: "Ubuntu",
  },
  triplabel: {
    fontSize: 12,
    marginBottom: 10,
    color: "rgba(23,25,48,0.6)"
  },
  tripname: {
    textTransform: "uppercase",
    fontFamily: "UbuntuMedium",
  },
  totalAmount: {
    fontSize: 16,
    fontFamily: 'UbuntuMedium',
    paddingBottom : 10,
  },
})
