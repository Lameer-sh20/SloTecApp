import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Alert, Button} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
function Location() {
  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition(JSON.stringify(pos));
        console.log('possss ' + JSON.stringify(pos));
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {timeout: 2000, maximumAge: 3600000},
    );
  };

  const [position, setPosition] = useState('');

  return (
    <View>
      <Text>
        <Text style={styles.title}>Current position: </Text>
        {position}
      </Text>
      <Button title="Get Current Position" onPress={getCurrentPosition} />
    </View>
  );
}

export default Location;

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});
