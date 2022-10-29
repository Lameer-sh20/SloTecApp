import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchSelector from 'react-native-switch-selector';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

//import components
import {REACT_APP_address} from '@env';
import colors from '../assets/colors/Colors';
import YellowHeader from '../Components/YellowHeader';
import InputBox from '../Components/InputBox';
import LongButton from '../Components/LongButton';

function UserInfo() {
  //parameters
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const genderOptions = [
    {label: 'Female', value: '2'},
    {label: 'Male', value: '1'},
  ];

  //functions
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserData');
      if (value !== null) {
        setId(JSON.parse(value).id);
        setName(JSON.parse(value).name);
        setEmail(JSON.parse(value).email);
        setGender(JSON.parse(value).gender);
      } else {
        console.log('UserData is null');
      }
    } catch (e) {
      console.error('no UserData in storage');
    }
  };

  //get user token(autherized) from storage
  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          setToken(JSON.parse(value));
          //console.log(JSON.parse(value));
        }
      } catch (e) {
        console.error('error', e);
      }
    };
    getToken();
  }, []);

  //when user cliks on save
  const submitData = async () => {
    fetch('http:/' + REACT_APP_address + ':3000/user/updateUser', {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({id, name, gender, email}),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === true) {
          //console.log(data);
          try {
            const user = JSON.stringify({
              id: data.user.id,
              name: data.user.name,
              gender: data.user.gender,
              email: data.user.email,
            });
            //console.error('res in signup', JSON.stringify(data.user));
            //console.error('res in signup', JSON.stringify(data.token));
            AsyncStorage.setItem('UserData', user);
            Toast.show({
              type: 'success',
              text1: 'Account updated successfully',
              visibilityTime: 4000,
            });
          } catch (error) {
            console.warn('data is not saved in storage');
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'Warning',
            text2: 'Account is not updated',
            visibilityTime: 4000,
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  return (
    <View>
      {/*header*/}
      <YellowHeader
        text="Profile"
        onPress={() => navigation.navigate('StorePage')}
      />
      {/*input boxes*/}
      <Toast
        ref={ref => {
          Toast.setRef(ref);
        }}
      />
      <View style={styles.inputs} behavior="padding">
        <Text style={styles.label}>Name</Text>
        <InputBox
          placeholder={name}
          value={name}
          onChangeText={text => setName(text)}
        />

        <Text style={styles.label}>Gender</Text>
        <View style={styles.inputContainer}>
          <SwitchSelector
            options={genderOptions}
            onPress={value => setGender(value)}
            textColor={'#212429'} //'#7a44cf'
            selectedColor={'#212429'}
            buttonColor={'#FFEB83'}
            backgroundColor={'#F5F5F9'}
            borderColor={'#E7E7EB'}
            borderWidth={0.5}
            hasPadding={true}
            buttonMargin={0.5}
            valuePadding={1.5}
            borderRadius={10}
          />
        </View>

        <Text style={styles.label}>Email</Text>
        <InputBox
          placeholder={email}
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      {/*button*/}
      <View style={styles.buttonContainer}>
        <LongButton text="Save" onPress={() => submitData()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputs: {
    paddingVertical: 20,
  },
  inputContainer: {
    //justifyContent: 'space-evenly',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontFamily: 'Nunito-SemiBold',
    color: '#212429',
    fontSize: 17,
    marginLeft: 10,
    marginTop: 15,
  },
});
export default UserInfo;
