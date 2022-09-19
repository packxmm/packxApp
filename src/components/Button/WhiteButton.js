import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const styles = {
  root: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  button: {
    marginRight: "20%",
    width: "100%",
    marginBottom: 40,
    height: 45,
    borderRadius: 5,
    borderColor: '#169393', 
    borderWidth: 1, 
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: "row",
  },
  buttonTitle: {
    color: '#169393',
    fontSize: 20,
    fontFamily: 'UbuntuBold',
    textTransform: 'uppercase'
  }
}

const WhiteButton = ({
  title,
  onPress,
  children
}) => {
  const btnStyle = [styles.root, styles.button]
  const txtStyle = [styles.text, styles.buttonTitle]
  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={onPress} style={btnStyle}>
        {children && <FontAwesome style={{color: "#169393", marginRight: 10 }} name={children} size={20} />}
        {title && <Text style={txtStyle}>{title}</Text>}
      </TouchableOpacity>
    </View>
  )
}

WhiteButton.propTypes = {
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

WhiteButton.defaultProps = {
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

export default WhiteButton
