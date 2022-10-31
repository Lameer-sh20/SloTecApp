import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import components
import {REACT_APP_address} from '@env';
import colors from '../assets/colors/Colors';
import SignHeader from '../Components/SignHeader';
import InputBox from '../Components/InputBox';
import LongButton from '../Components/LongButton';

function ResetPassPage() {
  //parameters
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  let [password, setPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');

  //functions
  //call getdata function
  useEffect(() => {
    getData();
  }, []);

  //get user's phone number from storage
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('PhoneTemp');
      if (value !== null) {
        setPhone(JSON.parse(value).phone);
        //console.warn(JSON.parse(value));
      }
    } catch (e) {
      console.error('error', e);
    }
  };

  //when user clicks on continue
  const submitData = async () => {
    if (password.length <= 3 && password.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Alert!',
        text2: 'Password must be <= 6 charecters containing 1 letter',
        visibilityTime: 4000,
      });
    } else if (password.length > 6 && password.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Alert!',
        text2: 'Password must be <= 6 charecters containing 1 letter',
        visibilityTime: 4000,
      });
    } else if (confirmPassword.length <= 3 && confirmPassword.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Alert!',
        text2: 'Password must be <= 6 charecters containing 1 letter',
        visibilityTime: 4000,
      });
    } else if (confirmPassword.length > 6 && confirmPassword.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Alert!',
        text2: 'Password must be <= 6 charecters containing 1 letter',
        visibilityTime: 4000,
      });
    } else if (password.length > 0 && !password.includes(confirmPassword)) {
      Toast.show({
        type: 'error',
        text1: 'Make sure your passwords match',
        visibilityTime: 4000,
      });
    } else if (
      confirmPassword.length > 0 &&
      !password.includes(confirmPassword)
    ) {
      Toast.show({
        type: 'error',
        text1: 'Make sure your passwords match',
        visibilityTime: 4000,
      });
    } else if (password.length === 0 || confirmPassword.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Please fill the required information',
        visibilityTime: 4000,
      });
    } else {
      //all conditions are valid, start connecting with backend
      //connect to backend
      fetch('http:/' + REACT_APP_address + ':3000/user/forgotPassword', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phone, password, confirmPassword}),
      })
        .then(response => response.json())
        .then(data => {
          //if password reseted successfully
          if (data.status) {
            Toast.show({
              type: 'success',
              text1: 'Password is updated successfully, please sign in',
              visibilityTime: 4000,
            });
            setTimeout(() => {
              navigation.navigate('SignInPage');
            }, 2000);
          }
          //if password is not reseted successfully
          else {
            Toast.show({
              type: 'error',
              text1: 'Password is not updated',
              visibilityTime: 4000,
            });
          }
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
          placeholder="New password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <InputBox
          placeholder="Confirm new password"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry={true}
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
    color: colors.default,
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
