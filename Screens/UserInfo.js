import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import colors from '../assets/colors/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';

import {useNavigation} from '@react-navigation/native';

import YellowHeader from '../Components/YellowHeader';
import InputBox from '../Components/InputBox';
import LongButton from '../Components/LongButton';

function UserInfo() {
  const navigation = useNavigation();
  //parameters
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  //functions
  // useEffect(() => {
  //   getData();
  // });

  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('UserData');
  //     if (value !== null) {
  //       setPhone(JSON.parse(value).phone);
  //       setName(JSON.parse(value).name);
  //       setPassword(JSON.parse(value).password);
  //       console.warn(value);
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // };
  return (
    <View>
      {/*header*/}
      <YellowHeader
        text="Profile"
        onPress={() => navigation.navigate('PersonalMenu')}
      />
      {/*input boxes*/}
      <View style={styles.inputs} behavior="padding">
        <View style={styles.inputsContainer}>
          <Text style={styles.label}>Name</Text>
          <InputBox
            placeholder="name"
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>

        <View style={styles.inputsContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <InputBox
            placeholder="05xxxxxxxx"
            value={phone}
            onChangeText={text => setPhone(text)}
          />
        </View>

        <View style={styles.inputsContainer}>
          <Text style={styles.label}>Email</Text>
          <InputBox
            placeholder="example@mail.com"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
      </View>
      {/*button*/}
      <View style={styles.buttonContainer}>
        <LongButton
          text="Save"
          onPress={() => {
            '....';
          }}
        />
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
    paddingVertical: 20,
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
