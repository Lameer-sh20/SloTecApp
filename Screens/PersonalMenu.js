import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';

import colors from '../assets/colors/Colors';
import YellowHeader from '../Components/YellowHeader';

function PersonalMenu() {
  //params
  const navigation = useNavigation();
  //functions
  const signOut = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Sign out', 'Do you want to sign out from SloTec?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            console.warn('all data deleted successfully');
            navigation.navigate('MainPage');
          },
        },
      ]);
    } catch (e) {
      //console.warn('all data are not deleted successfully');
    }
  };
  return (
    <View>
      <YellowHeader
        text="Personal"
        onPress={() => navigation.navigate('StorePage')}
      />
      {/*profile*/}
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => navigation.navigate('UserInfo')}>
        <View style={styles.leftContainer}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="user-alt" size={30} color="212429" />
          </View>
          <Text style={styles.text}>My Profile</Text>
        </View>
        <View style={styles.rightContainer}>
          <AntDesign name="right" size={30} color="212429" />
        </View>
      </TouchableOpacity>
      {/*credit cards*/}
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => navigation.navigate('UserCards')}>
        <View style={styles.leftContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="payment" size={44} color="212429" />
          </View>
          <Text style={styles.text}>My Credit Cards</Text>
        </View>
        <View style={styles.rightContainer}>
          <AntDesign name="right" size={30} color="212429" />
        </View>
      </TouchableOpacity>
      {/* invoices */}
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => navigation.navigate('UserInvoices')}>
        <View style={styles.leftContainer}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="file-invoice" size={35} color="212429" />
          </View>
          <Text style={styles.text}>My Invoices</Text>
        </View>
        <View style={styles.rightContainer}>
          <AntDesign name="right" size={30} color="212429" />
        </View>
      </TouchableOpacity>
      {/* sign out */}
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => signOut()}>
        <View style={styles.leftContainer}>
          <View style={styles.iconContainer}>
            <Octicons name="sign-out" size={35} color="212429" />
          </View>
          <Text style={styles.text}>Sign out</Text>
        </View>
        <View style={styles.rightContainer}>
          <AntDesign name="right" size={30} color="212429" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#E7E7EB',
    borderBottomWidth: 1.5,
  },
  iconContainer: {
    //backgroundColor: colors.blue,
    height: 40,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    //paddingLeft: 16,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Nunito-Bold',
    color: '#212429',
    fontSize: 17,
  },
});
export default PersonalMenu;
