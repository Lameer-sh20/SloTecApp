import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../assets/colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

// import components
import {REACT_APP_address} from '@env';
import SignHeader from '../Components/SignHeader';
import InputBox from '../Components/InputBox';
import LongButton from '../Components/LongButton';

function SignInPage() {
  const navigation = useNavigation();
  //parameters
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  //functions
  useEffect(() => {
    setData();
  });
  const setData = async () => {
    if (phone.length == 0 || password.length == 0) {
      //console.warn('fill the required info');
    } else {
      try {
        const user = JSON.stringify({
          name: name,
          phone: phone,
          password: password,
        });
        //await AsyncStorage.setItem('UserData', JSON.stringify(user));
        await AsyncStorage.setItem('UserData', user);
        console.log('account created successfully!', name);
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const submitData = () => {
    if (password.length <= 3 && password.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Alert!',
        text2: 'Password must be at least 6 charecters containing 1 letter',
        visibilityTime: 4000,
      });
    } else if (phone.length == 0 || password.length == 0) {
      Toast.show({
        type: 'error',
        text1: 'Alert!',
        text2: 'Please fill the required information',
        visibilityTime: 4000,
      });
      //console.warn('fill the required info');
    } else {
      fetch('http:/' + REACT_APP_address + ':3000/user/login', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phone, password}),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status == null) {
            Toast.show({
              type: 'error',
              text1: 'Alert!',
              text2: data.message,
              visibilityTime: 5000,
            });
            //console.error('data is', data);
          } else {
            const user = JSON.parse(JSON.stringify(data.data.user));
            console.log('name is', user.name);
            setName(user.name);
            navigation.navigate('Home_noStorePage');
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
      <SignHeader
        text="Sign In"
        onPress={() => navigation.navigate('SignUpPage')}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Please enter your phone number and {name}password
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
      <View style={styles.buttonContainer}>
        <LongButton
          text="Countinue"
          onPress={() => {
            submitData();
          }}
        />
      </View>
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
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionstext: {
    fontFamily: 'Nunito-Regular',
    color: '#212429',
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
