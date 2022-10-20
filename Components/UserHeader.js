import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../assets/colors/Colors';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function UserHeader({name, storename}) {
  const navigation = useNavigation();

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
          <Text style={styles.textLocation}>{'  ' + storename}</Text>
        </TouchableOpacity>
        {/* name & cart container */}
        <View style={styles.name_cartContainer}>
          {/* Name Container */}
          <TouchableOpacity
            onPress={() => navigation.navigate('PersonalMenu')}
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
    borderColor: '#E7E7EB',
    borderBottomWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftWidth: 1.5,
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
    fontFamily: 'Nunito-Rgular',
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
  imageWarning: {
    width: 18,
    height: 18,
    bottom: 0,
    left: 5,
  },
  textName: {
    fontFamily: 'Nunito-Bold',
    color: colors.blackFont,
    fontSize: 24,
  },
  cartContainer: {
    backgroundColor: '#FFEB83',
    width: 35,
    height: 35,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageShoppingCart: {
    width: 18,
    height: 18,
    top: 8,
  },
});
