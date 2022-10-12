import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from 'react-native';
import colors from '../assets/colors/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import components
import SignHeader from '../Components/SignHeader';
import InputBox from '../Components/InputBox';
import LongButton from '../Components/LongButton';

function VerficationPage() {
  const navigation = useNavigation();
  const route = useRoute();

  //const {phone, name, password} = route.params;
  //console.log(route.params.name);
  // const phone = route.params.phone;
  // const password = route.params.password;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [OTP, setOtp] = useState('');

  useEffect(() => {
    getData();
  });

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserData');
      if (value !== null) {
        setPhone(JSON.parse(value).phone);
        setName(JSON.parse(value).name);
        setPassword(JSON.parse(value).password);
        console.warn(JSON.parse(value).phone);
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

  const submitData = () => {
    fetch('http://192.168.8.111:3000/user/verfiyOTP', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({phone, OTP}),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.status);
        if (data.status) {
          fetch('http://192.168.8.111:3000/user/signUp', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, phone, password}),
          })
            .then(response => response.json())
            .then(data => {
              console.log(phone);
              console.log(data);
              //create local storage to store user info
              navigation.navigate('Home_noStorePage');
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
