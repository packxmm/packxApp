import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FAFAFA', 
    fontFamily: "Ubuntu",
  },
  scrollView:{ 
    paddingHorizontal : "3%",  
  },
  text:{ 
    fontSize: 12,  
    color: "#7B6F72",
    fontFamily: "UbuntuMedium", 
    paddingTop : "3%", 
    paddingEnd : "1%", 
  },
  count: { 
    fontSize: 13,  
    textTransform: 'capitalize',
    fontFamily: "UbuntuMedium", 
    lineHeight: 28
  },
  title: { 
    color: "#185354",
    fontSize: 16,
    fontFamily: "UbuntuMedium", 
    textTransform: 'uppercase',
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
