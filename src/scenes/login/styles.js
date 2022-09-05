import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: "10%"
  },
  logoBox : { 
    alignSelf: "center",
    marginTop: 30
  },
  input: {
    backgroundColor: "#FFFFFF",
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
    width: "100%",
    height: 36,
    padding: 10,
    marginBottom: "5%",
    fontFamily: 'Ubuntu',
  },
  button: {
    backgroundColor: '#169393', 
    marginRight: "20%",
    width: "100%",
    marginTop: 20,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  buttonTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'UbuntuBold',
    textTransform: 'uppercase'
  },
  inputLabel: {
    marginBottom: "3%",
    color: "#7C7C7C",
    fontFamily: 'Ubuntu',
  },
  footerView: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    marginTop: 20
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d'
  },
  darkfooterText: {
    fontSize: 16,
    color: 'white',
  },
  footerLink: {
    color: "#169393",
    fontFamily: 'UbuntuBold',
    fontSize: 16
  }
})
