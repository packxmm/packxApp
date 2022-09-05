import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import AppIntroSlider from 'react-native-app-intro-slider';
// import UserScreen from '../User/User';

const slides = [
  {
    key: 1,
    title: 'SELECT THE TRIP',
    text: 'Select your ideal destination to send your package from our provided list of trips.',
    image: require('../../../assets/images/intro1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'RESERVE YOUR PACKAGE',
    text: 'After selecting, check the facility details, pricing and other information and reserve your package.',
    image: require('../../../assets/images/intro2.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'DROP AT THE FACILITY',
    text: 'After reservation, drop off your package at the facility and it’s all set.',
    image: require('../../../assets/images/intro3.png'),
    backgroundColor: '#22bcb5',
  }
];
 
export default class slider extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showRealApp: false
        };
    }
  _renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Image source={item.image} style={styles.introImg}/>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }
  _onDone = () => {
    this.setState({ showRealApp: true });
  }
  render() {
    if (this.state.showRealApp) {
      return <UserScreen />;
    } else {
      return <AppIntroSlider 
        renderItem={this._renderItem} 
        data={slides} 
        onDone={this._onDone} 
        showPrevButton={false} 
        activeDotStyle={{backgroundColor: '#185354',marginRight: 20,marginTop: 10}} 
        dotStyle={{backgroundColor: '#E5F1F2',marginRight: 20,marginTop: 10}}/>;
    }
  }
}
