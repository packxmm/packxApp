import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20 ,
        backgroundColor: '#FAFAFA'
      },
      mainText: {
        fontSize: 17,
        color:  '#333333',  
        fontFamily: 'UbuntuBold',
        borderBottomColor: "#333",
        borderBottomWidth: 2,
        marginVertical : "2%", 
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
        fontSize: 12,
        fontFamily: "Ubuntu",
        paddingTop: "5%",
        paddingLeft: "10%",
      },
      tripHeader:{ 
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between', 
        marginVertical: "2%",
      },
      tripDetails: { 
        flexDirection: "column",     
        paddingHorizontal: "5%",
        paddingVertical: "3%",
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
        paddingVertical: "2%",
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
        paddingHorizontal: "4%",
        paddingVertical: "4%",
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
        marginTop: "3%",
      },
      itembox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 30
      },
      view: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'flex-end',
        margin: 0,
        height: 20
      },
      modalView: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20, 
        marginTop:  '30%',
        padding : '5%'
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
        fontSize: 12,
        color: "#2797A6", 
        fontFamily: 'UbuntuMedium', 
        textTransform: 'capitalize'
      },
      addicon: {
        color: "#085252", 
        marginVertical: 2
      },
      deslabel: {
        fontSize: 12,
        color: "#707070", 
        fontFamily: 'Ubuntu',
        paddingVertical : "1%", 
      },
      statusBox : {
        flex: 4, 
        flexDirection: 'column', 
        marginTop: "3%",
        marginBottom: "15%",
      },
      itemStatus: { 
        flexDirection: "row" , 
        justifyContent: 'space-around', 
      },
      statusTitle: { 
        fontSize: 14,
        color: "#2797A6",  
        marginTop: "3%",
        fontFamily: 'UbuntuMedium', 
        textTransform: 'capitalize',
      }
})
