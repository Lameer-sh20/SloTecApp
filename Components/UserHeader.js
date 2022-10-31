import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import componants
import colors from '../assets/colors/Colors';

function UserHeader({name, storename}) {
  //params
  const navigation = useNavigation();

  //functions

  return (
    <View style={styles.container}>
      {/* header content */}
      <View style={styles.headerContent}>
        {/* location name & icon container */}
        <TouchableOpacity
          onPress={() => navigation.navigate('StoresMenu')}
          style={styles.locationContainer}>
          <Image
            source={require('../assets/Images/location.png')}
            style={styles.imageLocation}
          />
          <Text style={styles.textLocation}> Shopping at </Text>
          <Text style={styles.textLocation2}>{storename}</Text>
        </TouchableOpacity>
        {/* name & cart container */}
        <View style={styles.name_cartContainer}>
          {/* Name Container */}
          <TouchableOpacity
            onPress={() => navigation.navigate('UserInfo')}
            style={styles.nameContainer}>
            <Text style={styles.textName}>Hello, {name}</Text>
          </TouchableOpacity>
          {/* cart icon Container */}
          <TouchableOpacity
            onPress={() => navigation.navigate('UserCart')}
            style={styles.cartContainer}>
            <MaterialCommunityIcons
              name="cart-variant"
              size={25}
              color="#484038"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default UserHeader;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    height: 95,
    backgroundColor: '#FCFDFF',
    width: '100%',
    borderColor: colors.borderColor,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftWidth: 1,
  },
  headerContent: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    //marginVertical: 10,
    //flexDirection: 'column-reverse',
    justifyContent: 'center',
  },
  locationContainer: {
    paddingBottom: 7,
    flexDirection: 'row',
    //top: 22,
  },
  imageLocation: {
    width: 18,
    height: 20,
  },
  textLocation: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#484038',
  },
  textLocation2: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#484038',
  },
  name_cartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //paddingHorizontal: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textName: {
    fontFamily: 'Nunito-Bold',
    color: colors.default,
    fontSize: 24,
  },
  cartContainer: {
    backgroundColor: colors.Yellow,
    width: 35,
    height: 35,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
