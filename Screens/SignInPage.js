import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

// import components
import {REACT_APP_address} from '@env';
import colors from '../assets/colors/Colors';
import SignHeader from '../Components/SignHeader';
import InputBox from '../Components/InputBox';
import LongButton from '../Components/LongButton';

function SignInPage() {
  //parameters
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  let [password, setPassword] = useState('');

  //functions

  //if user clicks on continue
  const submitData = async () => {
    if (password.length <= 3 && password.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: 'Password must be <= 6 charecters containing 1 letter',
        visibilityTime: 4000,
      });
    } else if (password.length > 6 && password.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: 'Password must be <= 6 charecters containing 1 letter',
        visibilityTime: 4000,
      });
    } else if (phone.length === 0 || password.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: 'Please fill the required information',
        visibilityTime: 4000,
      });
      //console.warn('fill the required info');
    } else {
      // all conditions are valid, start connecting with backend
      fetch('http:/' + REACT_APP_address + ':3000/user/login', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phone, password}),
      })
        .then(response => response.json())
        .then(data => {
          //couldn't sign in user
          if (data.status == null) {
            Toast.show({
              type: 'error',
              text1: 'Warning',
              text2: data.message,
              visibilityTime: 5000,
            });
            console.error('data is', data);
          }
          //sign in user successfully, store data (info, token) in storage
          else {
            const info = JSON.parse(JSON.stringify(data.data.user));
            try {
              const user = JSON.stringify({
                id: info.id,
                name: info.name,
                phone: info.phone,
                gender: info.gender,
                email: info.email,
              });
              AsyncStorage.setItem('UserData', user);
              AsyncStorage.setItem('token', JSON.stringify(data.token));
              //console.warn('token and user data saved');
            } catch (error) {
              console.warn('token is not saved');
            }
            navigation.navigate('StoresMenu');
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
        text="Sign In"
        onPress={() => navigation.navigate('SignUpPage')}
      />
      {/**inputs section */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Please enter your phone number and password
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
        <InputBox
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
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
      {/**asking if user doesn't have account, or forgot password */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionstext}>Forgot your password? </Text>
        <TouchableOpacity
          style={styles.clickableContainer}
          onPress={() => navigation.navigate('ResetPassPage')}>
          <Text style={styles.coloredText}>Reset Password</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
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
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionstext: {
    fontFamily: 'Nunito-Regular',
    color: colors.default,
    fontSize: 13,
  },
  clickableContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coloredText: {
    fontFamily: 'Nunito-Bold',
    color: colors.blue,
    fontSize: 13,
  },
});
export default SignInPage;

// useEffect(() => {
//   //setData();
// });
// const setData = async () => {
//   if (phone.length == 0 || password.length == 0) {
//     //console.warn('fill the required info');
//   } else {
//     try {
//       const user = JSON.stringify({
//         name: name,
//         phone: phone,
//         password: password,
//       });
//       //await AsyncStorage.setItem('UserData', JSON.stringify(user));
//       await AsyncStorage.setItem('UserData', user);
//       //console.log('account created successfully!', name);
//     } catch (error) {
//       console.warn(error);
//     }
//   }
// };
