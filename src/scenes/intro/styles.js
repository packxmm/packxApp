import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
      flex: 1,
      flexDirection: "column",  
      paddingHorizontal: "5%" ,
      backgroundColor: "#FAFAFA", 
      justifyContent: 'center',
    },
    logoBox : {
      flex : 2,
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    socialBtn: {
      flex: 2, 
      flexDirection: "row", 
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontSize: 21,
      color: "#1B9494",
      textTransform: 'uppercase',
      fontFamily: 'UbuntuBold',
      marginTop: "10%", 
      alignSelf: 'center'
    },
    text: {
      fontSize: 16,
      color: "#8E9696",
      textAlign: 'center',
      padding: "2%",
      lineHeight: 22,
      fontFamily: 'Ubuntu',
    },
    introImg: {
      alignSelf: 'center',
      width: 220,
      height: 184
    },
    fotterText: {
      fontSize: 16,
      textAlign: 'center',
      paddingVertical: "2%",
      lineHeight: 22,
      fontFamily: 'Ubuntu',
    }
  });