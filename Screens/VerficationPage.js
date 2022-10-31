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

function VerficationPage() {
  //params
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [OTP, setOtp] = useState('');

  //functions
  //calls getdata function, to get user data from storage
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Usertemp');
      if (value !== null) {
        setPhone(JSON.parse(value).phone);
        setName(JSON.parse(value).name);
        setPassword(JSON.parse(value).password);
        console.log(JSON.parse(value));
      }
    } catch (e) {
      console.warn('error', e);
    }
  };

  //when user clicks on continue
  const submitData = async () => {
    //send otp entered by user to validate number
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
        //it entered otp is true, then signup the user with the data from storage
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
              //create local storage to store user info
              try {
                const user = JSON.stringify({
                  id: data.user.id,
                  name: data.user.name,
                  phone: data.user.phone,
                });
                //console.log('res in verfication', JSON.stringify(data.user));
                //console.log('res in verfication', JSON.stringify(data.token));
                AsyncStorage.setItem('UserData', user);
                AsyncStorage.setItem('token', JSON.stringify(data.token));
                console.warn('token and user data saved');
              } catch (error) {
                console.warn('token is not saved');
              }
              navigation.navigate('StoresMenu');
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
        //it entered otp is wrong, then show message
        else {
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
      {/**header */}
      <SignHeader
        text="Verfication"
        onPress={() => navigation.navigate('SignUpPage')}
      />
      {/**inputs section */}
      <View style={styles.textContainer}>
        <Toast
          ref={ref => {
            Toast.setRef(ref);
          }}
        />
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
      {/**continue button */}
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
export default VerficationPage;
