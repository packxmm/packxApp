import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container:{
      flex: 1, 
      paddingHorizontal: "8%", 
      marginTop: "15%" 
  }, 
  header: {
    fontSize: 18,
    fontFamily: 'UbuntuBold',
    paddingVertical : 10,
  },
  title: {
    marginBottom: 10,
    color: "#185354",
    fontSize: 16,
    fontFamily: "UbuntuMedium", 
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
