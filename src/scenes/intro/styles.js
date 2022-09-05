import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
      flex: 1,
      flexDirection: "column",  
      paddingHorizontal: "10%" ,
      backgroundColor: "#FAFAFA", 
      justifyContent: 'center',
    },
    logoBox : {
      flex : 3,
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
      padding: "3%",
      lineHeight: 22,
      fontFamily: 'Ubuntu',
    },
    introImg: {
      alignSelf: 'center',
      width: 220,
      height: 184
    }
  });