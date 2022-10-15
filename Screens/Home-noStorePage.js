import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../assets/colors/Colors';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import UserHeader from '../Components/UserHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home_noStorePage() {
  const navigation = useNavigation();
  //const route = useRoute();
  const [name, setName] = useState('');

  //const {phone, name, password, OTP} = route.params;

  // const passData = () => {
  //   navigation.navigate('Home_xSupermarketPage', {
  //     name: name,
  //     phone: phone,
  //     password: password,
  //     otp: OTP,
  //   });
  // };

  useEffect(() => {
    getData();
  });

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserData');
      if (value !== null) {
        setName(JSON.parse(value).name);
        console.warn('the name is ', value);
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View style={styles.pageContainer}>
      <UserHeader name={name}> </UserHeader>
      <View style={styles.Container}>
        {/**click to choose store */}
        <TouchableOpacity
          style={styles.Container}
          onPress={() => navigation.navigate('StoresMenu')}>
          <Icons name="not-listed-location" size={160} color="#c4c4c4" />
          <Text style={styles.text}>
            Click to choose the Store you want to shop from
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pagecontainer: {
    flex: 1,
  },
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
export default Home_noStorePage;
