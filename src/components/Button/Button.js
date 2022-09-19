import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const styles = {
  root: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#169393', 
    marginRight: "20%",
    width: "100%",
    // marginBottom: 20,
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: "row",
  },
  buttonTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'UbuntuBold',
    textTransform: 'uppercase'
  }
}

const Button = ({
  title,
  onPress,
  children
}) => {
  const btnStyle = [styles.root, styles.button]
  const txtStyle = [styles.text, styles.buttonTitle]
  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={onPress} style={btnStyle}>
        {children && <FontAwesome5 style={{color: "#fff", marginRight: 10 }}  name={children} size={20}/>}
        {title && <Text style={txtStyle}>{title}</Text>}
      </TouchableOpacity>
    </View>
  )
}

Button.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  onPress: PropTypes.func,
  children: PropTypes.string,
  textStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
}

Button.defaultProps = {
  title: null,
  width: 'auto',
  height: 'auto',
  color: 'black',
  backgroundColor: '#cacaca',
  onPress: () => {},
  children: null,
  textStyle: {},
  style: {},
}

export default Button
