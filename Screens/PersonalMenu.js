import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';

//import componants
import colors from '../assets/colors/Colors';
import YellowHeader from '../Components/YellowHeader';

function PersonalMenu() {
  //params
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  //functions
  //get user Token(user is signedup/in), other wise is null
  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (!value.match(/null/)) {
          setToken(JSON.parse(value));
          console.log('token is not null,', value);
        } else {
          setToken(JSON.parse(null));
          console.log('token is null,', value);
        }
      } catch (e) {
        console.error('error', e);
      }
    };
    getToken();
  }, []);

  //if user chose any option, handeling autherized and untherized users
  const userChoice = async option => {
    if (option === 1) {
      if (token != null) {
        navigation.navigate('UserInfo');
      } else {
        console.log('token is null,', token);
        try {
          Alert.alert('Warning', 'You do not have account in SloTec', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Create account',
              onPress: () => {
                navigation.navigate('SignUpPage');
              },
            },
          ]);
        } catch (e) {
          console.warn('all data are not deleted successfully');
        }
      }
    } else if (option === 2) {
      if (token != null) {
        navigation.navigate('UserCards');
      } else {
        console.log('token is null,', token);
        try {
          Alert.alert('Warning', 'You do not have account in SloTec', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Create account',
              onPress: () => {
                navigation.navigate('SignUpPage');
              },
            },
          ]);
        } catch (e) {
          console.warn('all data are not deleted successfully');
        }
      }
    } else if (option === 3) {
      if (token != null) {
        navigation.navigate('UserInvoices');
      } else {
        console.log('token is null,', token);
        try {
          Alert.alert('Warning', 'You do not have account in SloTec', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Create account',
              onPress: () => {
                navigation.navigate('SignUpPage');
              },
            },
          ]);
        } catch (e) {
          console.warn('all data are not deleted successfully');
        }
      }
    } else if (option === 4) {
      if (token != null) {
        Alert.alert('Sign out', 'Do you want to sign out from SloTec?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              deleteStorage();
            },
          },
        ]);
      } else {
        console.log('token is null,', token);
        try {
          Alert.alert('Warning', 'You do not have account in SloTec', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Create account',
              onPress: () => {
                navigation.navigate('SignUpPage');
              },
            },
          ]);
        } catch (e) {
          console.warn('error in sign out', e);
        }
      }
    }
  };

  //is called when user wants to sign out
  const deleteStorage = async () => {
    await AsyncStorage.clear();
    console.log('all data deleted successfully');
    navigation.navigate('MainPage');
  };
  return (
    <View>
      {/*header*/}
      <YellowHeader
        text="Personal"
        onPress={() => navigation.navigate('StorePage')}
      />
      {/*profile*/}
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => userChoice(1)}>
        <View style={styles.leftContainer}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="user-alt" size={25} color={colors.default} />
          </View>
          <Text style={styles.text}>My Profile</Text>
        </View>
        <View style={styles.rightContainer}>
          <AntDesign name="right" size={20} color={colors.default} />
        </View>
      </TouchableOpacity>
      {/*credit cards*/}
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => userChoice(2)}>
        <View style={styles.leftContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="payment" size={35} color={colors.default} />
          </View>
          <Text style={styles.text}>My Credit Cards</Text>
        </View>
        <View style={styles.rightContainer}>
          <AntDesign name="right" size={20} color={colors.default} />
        </View>
      </TouchableOpacity>
      {/* invoices */}
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => userChoice(3)}>
        <View style={styles.leftContainer}>
          <View style={styles.iconContainer}>
            <FontAwesome5
              name="file-invoice"
              size={28}
              color={colors.default}
            />
          </View>
          <Text style={styles.text}>My Invoices</Text>
        </View>
        <View style={styles.rightContainer}>
          <AntDesign name="right" size={20} color={colors.default} />
        </View>
      </TouchableOpacity>
      {/* sign out */}
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => userChoice(4)}>
        <View style={styles.leftContainer}>
          <View style={styles.iconContainer}>
            <Octicons name="sign-out" size={28} color={colors.default} />
          </View>
          <Text style={styles.text}>Sign out</Text>
        </View>
        <View style={styles.rightContainer}>
          <AntDesign name="right" size={20} color={colors.default} />
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
    borderColor: colors.borderColor,
    borderBottomWidth: 1,
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
    color: colors.default,
    fontSize: 16,
  },
});
export default PersonalMenu;
