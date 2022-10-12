import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import colors from '../assets/colors/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useNavigation} from '@react-navigation/native';

import YellowHeader from '../Components/YellowHeader';

function UserCards() {
  const navigation = useNavigation();
  //parameters

  //functions

  return (
    <View>
      {/*header*/}
      <YellowHeader
        text="Credit Cards"
        onPress={() => navigation.navigate('PersonalMenu')}
      />
      {/*alert icon*/}
      <View style={styles.Container}>
        {/**click to add card */}
        <TouchableOpacity
          style={styles.Container}
          onPress={() => navigation.navigate('AddCard')}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={160}
            color="#c4c4c4"
          />
          <Text style={styles.text}>Click to add new Credit Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    marginTop: 90,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  text: {
    marginTop: 5,
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
  },
});
export default UserCards;
