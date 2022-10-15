import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../assets/colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

// import components
import SignHeader from '../Components/SignHeader';
import InputBox from '../Components/InputBox';
import LongButton from '../Components/LongButton';

function SignUpPage() {
  const navigation = useNavigation();
  //parameters
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  //functions
  const setData = async () => {
    if (name.length == 0 || phone.length == 0 || password.length == 0) {
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
        //console.warn('account created successfully!');
        //navigation.navigate('VerficationPage');
      } catch (error) {
        console.warn(error);
      }
    }
  };

  // const passData = () => {
  //   if (name.length == 0 || phone.length == 0 || password.length == 0) {
  //     Alert.alert('Warning!', 'Please fill the required info');
  //   } else {
  //     try {
  //       navigation.navigate('OtpPage', {
  //         name: name,
  //         phone: phone,
  //         password: password,
  //       });
  //     } catch (error) {
  //       console.warn(error);
  //     }
  //   }
  // };

  const submitData = () => {
    if (password.length <= 3 && password.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Alert!',
        text2: 'Password must be <= 6 charecters containing 1 letter',
        visibilityTime: 4000,
      });
    } else if (
      name.length === 0 ||
      phone.length === 0 ||
      password.length === 0
    ) {
      Toast.show({
        type: 'error',
        text1: 'Alert!',
        text2: 'Please fill the required information',
        visibilityTime: 4000,
      });
      //console.warn('fill the required info');
    } else {
      fetch('http://192.168.8.111:3000/user/getUserByPhone', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phone}),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          if (!data.status) {
            fetch('http://192.168.8.111:3000/user/sendOTP', {
              method: 'POST', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({name, phone, password}),
            })
              .then(response => response.json())
              .then(data => {
                console.log(phone);
                console.log(data.message);
                navigation.navigate('VerficationPage');
              })
              .catch(error => {
                console.error('Error:', error);
              });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Alert!',
              text2: data.message,
              visibilityTime: 5000,
            });
            //Alert.alert('Make login');
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
        text="Sign Up"
        onPress={() => navigation.navigate('MainPage')}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Please complete the following information
        </Text>
      </View>
      <Toast
        ref={ref => {
          Toast.setRef(ref);
        }}
      />
      <View style={styles.inputsContainer} behavior="padding">
        <InputBox
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
        />
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
            setData();
            submitData();
          }}
        />
      </View>
      <View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionstext}>Already have an account? </Text>
          <TouchableOpacity
            style={styles.clickableContainer}
            onPress={() => navigation.navigate('SignInPage')}>
            <Text style={styles.coloredText}>Sign in</Text>
          </TouchableOpacity>
        </View>
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
  word: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignText: 'center',
  },
  wordstyle: {
    marginVertical: 5,
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 13,
  },
});
export default SignUpPage;
