import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1, 
    padding : "3%", 
    backgroundColor: '#FAFAFA', 
    fontFamily: "Ubuntu",
  },
  text:{ 
    fontSize: 12,  
    color: "#7B6F72",
    fontFamily: "UbuntuMedium",  
  },
  count: { 
    fontSize: 12,  
    textTransform: 'capitalize',
    fontFamily: "UbuntuMedium", 
    lineHeight: 30
  },
  title: { 
    color: "#185354",
    fontSize: 16,
    fontFamily: "UbuntuMedium", 
    textTransform: 'uppercase',
    paddingTop: "2%"
  }, 
  subtitle: { 
    color: "#1D1617",
    fontSize: 14, 
    paddingVertical: "3%"
  }, 
  itemCount : {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between', 
  },
  item: { 
    flexDirection: 'row',
    color: "#185354",
    fontSize: 14, 
    padding: "5%" 
  },
  icon: {
    color: "#185354",
    marginRight: "2%"
  },
  righticon: {
    alignSelf: 'flex-end',
    color: "#0C9494",
  },
  account: { 
    backgroundColor: "#FFFFFF",
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderRadius: 10,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    marginBottom: "2%",
  },
  accountTitle:{ 
    fontSize: 16,   
    fontFamily: "UbuntuMedium", 
    paddingBottom: "2%",
  },
  accountLabel : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: "4%",  
    borderBottomColor: "#D7DEDD",
    borderBottomWidth: 1,
  },
  accountText:{ 
    flex: 6,
    fontSize: 13,   
    textTransform: 'capitalize', 
    fontFamily: "UbuntuLight",
  }
})
