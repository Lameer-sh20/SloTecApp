import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import components
import {REACT_APP_address} from '@env';
import SignHeader from '../Components/SignHeader';
import InputBox from '../Components/InputBox';
import LongButton from '../Components/LongButton';

// resetting password flow: ResetPassPage >> VerficationPage2 >> ResetPassPage2
function ResetPassPage() {
  //parameters
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');

  //functions

  // if user clicks on continue
  const submitData = async () => {
    if (phone.length > 10 && phone.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Alert!',
        text2: 'Phone must be 10 digits',
        visibilityTime: 4000,
      });
    } else if (phone.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Please fill the required information',
        visibilityTime: 4000,
      });
      //console.warn('fill the required info');
    } else {
      //all conditions are valid, save in local storage and connect with backend
      try {
        const user = JSON.stringify({
          phone: phone,
        });
        await AsyncStorage.setItem('PhoneTemp', user);
      } catch (error) {
        console.warn(error);
      }
      //start connecting with backend, send otp to number
      fetch('http:/' + REACT_APP_address + ':3000/user/sendOTP', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phone}),
      })
        .then(response => response.json())
        .then(data => {
          //if otp is sent correctly go to verficationpage2
          navigation.navigate('VerficationPage2');
          //console.log('respond is ', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };
  // actual page flow
  return (
    <View style={styles.pageContainer}>
      {/**header */}
      <SignHeader
        text="Reset Password"
        onPress={() => navigation.navigate('SignUpPage')}
      />
      {/**inputs section */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Please complete the following information
          {'\n'}
          to reset your password
        </Text>
      </View>
      <Toast
        ref={ref => {
          Toast.setRef(ref);
        }}
      />
      <View style={styles.inputsContainer} behavior="padding">
        <InputBox
          placeholder="05xxxxxxxx"
          value={phone}
          onChangeText={text => setPhone(text)}
        />
      </View>
      {/**continue button */}
      <View style={styles.buttonContainer}>
        <LongButton
          text="Countinue"
          onPress={() => {
            submitData();
          }}
        />
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
    marginVertical: 15,
  },
});
export default ResetPassPage;
