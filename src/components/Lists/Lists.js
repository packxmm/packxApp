import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListView = ({ data , showStatus, index}) => {
    return(
        <View style={styles.item} key={index}>
        <Text style={styles.title}>TRIP NUMBER - {data.tripId.slice(0,8)}</Text>
        <View style={styles.tripList}>
          <View style={{flex: 2}}>
            <Text style={styles.triplabel}>From</Text>
            <Text style={styles.tripname}>{data.tripInfo.dropOff}</Text>
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.triplabel}>To</Text>
            <Text style={styles.tripname}>{data.tripInfo.desVal}</Text>
          </View>
          <View style={{flex: 2, alignItems: "flex-end", justifyContent: "center"}}>
            <Text style={styles.tripStatus}>{data.trackingStatus}</Text>
          </View>
          </View>
      </View>
    )
}
export default ListView;

const styles = StyleSheet.create({
    item: {
      color: "#185354",
      fontSize: 14,
      padding: 10,
      borderTopColor: '#E5F1F2',
      borderTopWidth: 2,
    },
    title: {
      marginBottom: 10,
      color: "#169393",
      fontSize: 14,
      fontFamily: "UbuntuBold",
    },
    tripList: {
      display: "flex",
      flexDirection: "row"
    },
    tripStatus: {
      color: "#185354",
      fontSize: 17, 
      fontFamily: "Ubuntu",
    },
    triplabel: {
      fontSize: 12,
      marginBottom: 10,
      color: "rgba(23,25,48,0.6)"
    },
    tripname: {
      textTransform: "uppercase",
      fontFamily: "UbuntuMedium",
    }
  });