import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListView = ({ data }) => {
    return(
        <View style={styles.item}>
        <Text style={styles.title}>{data.tripId}</Text>
        <View style={styles.tripList}>
          <View style={{flex: 2}}>
            <Text style={styles.triplabel}>From</Text>
            <Text style={styles.tripname}>{data.from}</Text>
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.triplabel}>To</Text>
            <Text style={styles.tripname}>{data.to}</Text>
          </View>
          <View style={{flex: 3, alignItems: "flex-end", justifyContent: "center"}}>
            <Text style={styles.tripStatus}>{data.tripStatus}</Text>
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
      fontSize: 20
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