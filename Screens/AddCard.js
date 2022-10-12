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

function AddCard() {
  const navigation = useNavigation();
  //parameters
  const [holderName, setHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expDate, setExpDate] = useState('');

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
        text="Add Credit Card"
        onPress={() => navigation.navigate('PersonalMenu')}
      />
      {/*input boxes*/}
      <View style={styles.inputs} behavior="padding">
        <View style={styles.inputsContainer}>
          <Text style={styles.label}>Cardholder Name</Text>
          <InputBox
            placeholder="name"
            value={holderName}
            onChangeText={text => setHolderName(text)}
          />
        </View>

        <View style={styles.inputsContainer}>
          <Text style={styles.label}>Card Number</Text>
          <InputBox
            placeholder="xxxx xxxx xxxx xxxx"
            value={cardNumber}
            onChangeText={text => setCardNumber(text)}
          />
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.label}>CVV</Text>
          <InputBox
            placeholder="xxx"
            value={cvv}
            onChangeText={text => setCvv(text)}
          />
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.label}>Expiry Date</Text>
          <InputBox
            placeholder="MM / YY"
            value={expDate}
            onChangeText={text => setExpDate(text)}
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
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 17,
    marginLeft: 10,
    marginTop: 15,
  },
});
export default AddCard;
