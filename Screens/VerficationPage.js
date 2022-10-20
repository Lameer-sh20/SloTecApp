import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import components
import colors from '../assets/colors/Colors';
import {REACT_APP_address} from '@env';
import SignHeader from '../Components/SignHeader';
import InputBox from '../Components/InputBox';
import LongButton from '../Components/LongButton';

function VerficationPage() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [OTP, setOtp] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserData');
      if (value !== null) {
        setPhone(JSON.parse(value).phone);
        setName(JSON.parse(value).name);
        setPassword(JSON.parse(value).password);
        console.warn(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  };
  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('UserData');
  //     if (value !== null) {
  //       console.warn(JSON.parse(value));
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  // const passData = () => {
  //   navigation.navigate('VerficationPage', {
  //     name: name,
  //     phone: phone,
  //     password: password,
  //     otp: OTP,
  //   });
  // };

  const submitData = async () => {
    fetch('http:/' + REACT_APP_address + ':3000/user/verfiyOTP', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({phone, OTP}),
    })
      .then(response => response.json())
      .then(data => {
        //console.log('res in otp', data);
        //console.log(data.status);
        if (data.status) {
          fetch('http:/' + REACT_APP_address + ':3000/user/signUp', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, phone, password}),
          })
            .then(response => response.json())
            .then(data => {
              //console.log('res in otp', data);
              //create local storage to store user info
              try {
                console.log('res in signup', JSON.stringify(data.user));
                console.log('res in signup', JSON.stringify(data.token));
                console.log('res in signup', typeof data);
                console.log('res in signup', data);
                //AsyncStorage.setItem('UserData', JSON.stringify(data.user));
                //AsyncStorage.setItem('token', JSON.stringify(data.token));
                console.warn('token and user data saved');
              } catch (error) {
                console.warn('token is saved');
              }
              navigation.navigate('StoresMenu');
            })
            .catch(error => {
              console.error('Error:', error);
            });
        } else {
          Alert.alert('wrong otp');
          console.warn('phone is', phone);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.pageContainer}>
      <SignHeader
        text="Verfication"
        onPress={() => navigation.navigate('SignUpPage')}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          A confirmation code has been sent to your{'\n'} Please enter it below
        </Text>
      </View>
      <View style={styles.inputsContainer} behavior="padding">
        <InputBox
          placeholder="OTP code"
          value={OTP}
          onChangeText={text => setOtp(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <LongButton text="Countinue" onPress={submitData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pagecontainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 50,
    textAlign: 'center',
    justifyContent: 'center',

    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
  },
  inputContainer: {
    //justifyContent: 'space-evenly',
    //marginVertical: 15,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
export default VerficationPage;
