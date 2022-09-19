import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 3, 
    paddingHorizontal : "3%",  
    marginTop :  "3%",
    backgroundColor: '#FAFAFA', 
    fontFamily: "Ubuntu",
    justifyContent: 'center',
    alignItems: 'center' 
  },
  title: {
      fontSize: 21,
      color: "#1B9494",
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
    resizeMode: 'center',
    width: 162,
    height: 181,
    marginVertical : "7%",
  }
})
