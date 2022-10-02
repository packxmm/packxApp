import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    margin: "10%",
    backgroundColor: "#FAFAFA"
  },
  logo: {
    flex: 1,
    height: 180,
    width: 180,
    alignSelf: "center",
    margin: 30,
    borderRadius: 20
  },
  input: {
    backgroundColor: "#FFFFFF",
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: "100%",
    height: 40,
    padding: 10,
    marginBottom: "5%",
    fontFamily: 'Ubuntu',
  },
  inputLabel: {
    marginBottom: "3%",
    color: "#333333",
    fontFamily: 'Ubuntu',
    fontSize: 12,
  },
  darkinput: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#303030',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    color: 'white'
  },
  button: {
    backgroundColor: '#169393', 
    width: "100%",
    marginRight: "20%",
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
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d'
  },
  darkfooterText: {
    fontSize: 16,
    color: 'white'
  }, 
  footerLink: {
    color: "#169393",
    fontFamily: 'UbuntuBold',
    fontSize: 16
  },
  link: {
    color: '#169393',
    textAlign: 'center',
    marginTop: 5
  },
  logoBox : {
    flex : 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: "10%" 
  }
})
