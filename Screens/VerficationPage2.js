import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

// import components
import colors from '../assets/colors/Colors';
import {REACT_APP_address} from '@env';
import SignHeader from '../Components/SignHeader';
import InputBox from '../Components/InputBox';
import LongButton from '../Components/LongButton';

//same as VerficationPage but this is for resetting pas flow: ResetPassPage >> VerficationPage2 >> ResetPassPage2
function VerficationPage2() {
  //params
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [OTP, setOtp] = useState('');

  //functions
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('PhoneTemp');
      if (value !== null) {
        setPhone(JSON.parse(value).phone);
        //console.log(JSON.parse(value));
      }
    } catch (e) {
      console.error('error', e);
    }
  };

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
        //console.log(data.status);
        if (data.status) {
          navigation.navigate('ResetPassPage2');
        } else {
          Toast.show({
            type: 'error',
            text1: 'Wrong OTP',
            visibilityTime: 4000,
          });
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
      <Toast
        ref={ref => {
          Toast.setRef(ref);
        }}
      />
      <View style={styles.inputsContainer} behavior="padding">
        <InputBox
          placeholder="OTP code"
          value={OTP}
          onChangeText={text => setOtp(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <LongButton text="Countinue" onPress={() => submitData()} />
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
    color: colors.default,
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
export default VerficationPage2;
