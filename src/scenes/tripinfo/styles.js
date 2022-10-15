import { StyleSheet } from 'react-native';

export default StyleSheet.create({ 
  container: {
    flex: 1,
    paddingHorizontal: 20 ,
    backgroundColor: '#FAFAFA'
  },
  mainText: {
    fontSize: 16,
    color:  '#185354',  
    fontFamily: 'UbuntuBold', 
    textTransform: 'uppercase',
    paddingBottom : "3%", 
  }, 
  text:{ 
    fontSize: 13,
    fontFamily: "UbuntuMedium", 
    textTransform: 'capitalize',
  },
  title: { 
    color: "#185354",
    fontSize: 16,
    fontFamily: "UbuntuBold", 
    textTransform: 'uppercase',
    paddingVertical: "3%"
  },
  numberText:{  
    fontSize: 13,
    fontFamily: "UbuntuMedium",
    paddingTop: "2%",
    paddingHorizontal: "3%"
  },
  tripHeader:{ 
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between', 
    marginVertical: "2%",
  },
  tripList: { 
    flexDirection: "column",     
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    backgroundColor: "#FFFFFF",
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 11,
    marginVertical: "5%",
  },
  triplabel: {
    fontSize: 11,
    marginBottom: 8, 
    textTransform: "uppercase",
    fontFamily: "UbuntuLight",
  },
  tripname: {
    fontSize: 13,
    marginBottom: 8, 
    textTransform: "uppercase",
    fontFamily: "UbuntuMedium",
  }, 
  icon: {
    color: "#185354",
  }, 
  facilityInfo: {
    fontFamily: 'Ubuntu',
    fontSize: 12,
    paddingLeft: 5,
    lineHeight: 20 
  },
  catText: {
    color: "#1B9494",
    fontFamily: 'UbuntuMedium',
    fontSize: 13,
    paddingLeft: 5 
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
  item: {
    flex: 1,
    flexDirection: 'row',
    color: "#185354",
    fontSize: 14,
    backgroundColor: "#E5F1F2",
    borderRadius: 20,
    paddingHorizontal: "2%",
    paddingVertical: "3%",
    marginBottom: "3%",
  },
  itemCount : {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between', 
  },
  itemlabel: { 
    fontSize: 13, 
    fontFamily: 'Ubuntu',
    alignSelf: 'flex-start',
  },
  itembox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30
  },
  link: {
    color: '#169393',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 15
  },
  view: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'flex-end',
    margin: 0,
    height: 20
  }
})
