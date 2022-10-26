import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', 
    paddingTop : "10%"
  },
  packageContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA', 
    padding : "5%",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
      fontSize: 21,
      color: "#1B9494",
      marginTop : "5%",
      textTransform: 'uppercase',
      fontFamily: 'UbuntuBold',
      marginHorizontal : "10%", 
      textAlign: 'center' 
  },
  text: {
      fontSize: 16,
      color: "#333333",
      textAlign: 'center',
      paddingVertical: "10%",
      paddingHorizontal: "3%",
      marginBottom: "5%",
      lineHeight: 22,
      fontFamily: 'Ubuntu',
  },
  introImg: {
    marginVertical : "7%",
  },
  subtitle: {
    textAlign: "center",
    color: "#185354",
    fontSize: 20,
    fontFamily: "Ubuntu",  
    paddingVertical: "5%", 
    borderBottomColor: "#D7DEDD",
    borderBottomWidth: 1,
  },
  inputLabel:{
    color: "#333333",
    fontFamily: "Ubuntu",  
    fontSize: 14
  },
  input: {
    padding: 10,
    fontSize: 14,
    borderBottomColor: "#D7DEDD",
    borderBottomWidth: 1,
    marginBottom: "5%",
    fontFamily: "Ubuntu",  
    marginTop: 5
  },
  itemInputLg: {
    flex: 5,
    padding: "3%",
    height: 39,
    fontSize: 14,
    borderColor: "#C8C8C8",
    color: "#535353",
    fontFamily: "Ubuntu",  
    borderWidth: 1,
    borderRadius: 10,
    marginVertical : "2%", 
    marginRight : "2%", 
  },
  itemInputXs: {
    flex: 1,
    padding: "3%",
    height: 39,
    fontSize: 14,
    borderColor: "#C8C8C8",
    color: "#535353",
    fontFamily: "Ubuntu",  
    borderWidth: 1,
    borderRadius: 10,
    marginVertical : "2%",  
  },
  itemHeader: { 
    flexDirection: "row" , 
    justifyContent: 'space-between',  
    marginVertical : "5%",  
  },
  itemRow: { 
    flexDirection: "row" , 
    justifyContent: 'space-between',
    borderTopColor: "#D7DEDD",
    borderTopWidth: 1,
    paddingVertical : "3%",  
  },
  addlabel: {
    fontSize: 24,
    color: "#169393",
    textTransform: "uppercase",
    fontFamily: 'UbuntuBold',
  }, 
  itemTitle: { 
    fontSize: 16,
    color: "#2797A6", 
    fontFamily: 'UbuntuMedium', 
  },
  addicon: {
    color: "#085252", 
    marginVertical: 2
  },
  deslabel: {
    fontSize: 14,
    color: "#707070", 
    fontFamily: 'Ubuntu',
    paddingVertical : "2%", 
  }
})
