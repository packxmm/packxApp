import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container:{
      flex: 1, 
      justifyContent: 'flex-start', 
      backgroundColor: "#FAFAFA"
  }, 
  scrollView:{ 
    paddingHorizontal : "3%",  
  },
  header: {
    fontSize: 16,
    fontFamily: 'UbuntuBold',
    paddingVertical : 10,
    marginTop: "2%",
  },
  item: {
    flex: 1,
    flexDirection: 'row', 
    fontSize: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    marginBottom: "3%",
  },
  title: { 
    color: "#085252",
    fontSize: 16,
    fontFamily: "UbuntuMedium",
  },
  date: {
    fontSize: 13,
    color: "#7C7C7C",
    fontFamily: "UbuntuMedium",
    marginTop: 5,
    borderEndColor: "#7C7C7C",
    borderEndWidth: 2,
    marginRight: 5
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
  text:{ 
    color:  '#085252', 
    fontFamily: "UbuntuMedium",
  }
})
