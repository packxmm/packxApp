import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container:{
      flex: 1, 
      justifyContent: 'flex-start',
      paddingHorizontal: "8%", 
      backgroundColor: "#FAFAFA"
  }, 
  header: {
    fontSize: 20,
    fontFamily: 'UbuntuMedium',
    color: "#085252",
    paddingVertical : 10,
    marginTop: "2%",
    textAlign: "center"
  },
  item: {
    flex: 1,
    flexDirection: 'row', 
    fontSize: 14,
    paddingVertical: "5%",
    borderTopColor: "#E5F1F2",
    borderTopWidth: 1
  },
  tripItem: {
    backgroundColor: "#FFFFFF",
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderRadius: 10,
    paddingHorizontal: "5%",
    paddingVertical: "3%", 
    marginBottom: "3%", 
  },
  title: { 
    color: "#085252",
    fontSize: 14,
    fontFamily: "UbuntuMedium",
    paddingVertical: "2%", 
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
  text:{ 
    color:  '#085252', 
    fontFamily: "UbuntuMedium",
  },
  tripList: {
    display: "flex",
    flexDirection: "row", 
    padding: "2%",   
    borderTopColor: '#E5F1F2',
    borderTopWidth: 1,
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
  datelabel: { 
    fontSize: 10,
    marginVertical: 8,
    color:  '#169393',
  },
  icon: {
    color: "#185354",
  },
  tripTitle: {
    fontSize: 16, 
    fontFamily: "UbuntuMedium",
    color: "#185354",
    marginVertical: 10
  },
  mainText: {
    fontSize: 17,
    color:  '#333333',  
    fontFamily: 'UbuntuBold',
    borderBottomColor: "#333",
    borderBottomWidth: 2,
    marginVertical : "2%", 
  },
  itemLists: { 
    flexDirection: "column",  
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    backgroundColor: "#FFFFFF",
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderRadius: 5,
    marginVertical: "4%",
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
  itemTitle: { 
    fontSize: 12,
    color: "#2797A6", 
    fontFamily: 'UbuntuMedium', 
    textTransform: 'capitalize'
  },
  deslabel: {
    fontSize: 12,
    color: "#707070", 
    fontFamily: 'Ubuntu',
    paddingVertical : "1%", 
  },
  userId: {
    fontSize: 13,
    color: "#7B6F72", 
    fontFamily: 'Ubuntu',
    paddingVertical : "1%", 
  },
})
