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
    // marginBottom: 10,
    color: "#169393",
    fontSize: 14,
    fontFamily: "UbuntuBold", 
  },
  Row: { 
    flexDirection: 'row', 
    justifyContent: "space-between",
    borderBottomColor: "#E5F1F2",
    borderBottomWidth: 2,
    paddingBottom: 10
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
    color: "#7C7C7C",
    fontSize: 14,
    fontFamily: "UbuntuMedium",
    lineHeight: 19,
    marginRight: 10
  },
})
