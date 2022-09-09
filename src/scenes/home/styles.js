import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "3%"
  },
  createBtn:{
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  header: {
    color: "#185354",
    fontSize: 16,
    fontFamily: "UbuntuBold",
    padding: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: 'UbuntuBold',
    paddingLeft: 10,
  },
  amountDue:{
    flexDirection: 'row',
    backgroundColor: "#FFFFFF",
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 20,
    height: 125,
    marginVertical: 20,
    padding: 20,
    justifyContent: 'space-between'
  },
  priceLabel: {
    fontSize: 35,
    fontFamily: "UbuntuBold",
    paddingTop: 20
  },
  facilityCalendar: {
    backgroundColor: "#FFFFFF",
    shadowColor: 'rgba(0,0,0,0.09)',
    shadowOffset: {width: 2, height: 16},
    shadowOpacity: 0.2,
    shadowRadius: 9,
    borderRadius: 8,
    marginBottom: 20
  }
})
