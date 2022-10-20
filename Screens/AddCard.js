import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import colors from '../assets/colors/Colors';
import YellowHeader from '../Components/YellowHeader';
import InputBox from '../Components/InputBox';
import LongButton from '../Components/LongButton';

function AddCard() {
  const navigation = useNavigation();
  //parameters
  const [holderName, setHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [creditCards, setCreditCards] = useState([]);

  //functions
  useEffect(() => {
    getData();
  });

  const setData = async () => {
    if (cardNumber.length < 15 && cardNumber.length > 0) {
      console.error('card lenght', cardNumber.length);
      Toast.show({
        type: 'error',
        text1: 'Card number is not 16 number',
        visibilityTime: 4000,
      });
    } else if (expDate.length > 4 && expDate.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Please fill expirydata in the following MMYY ',
        visibilityTime: 4000,
      });
    } else if (expDate.length < 3 && expDate.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Please fill expirydata in the following MMYY ',
        visibilityTime: 4000,
      });
    } else if (
      holderName.length === 0 ||
      cardNumber.length === 0 ||
      expDate.length === 0
    ) {
      Toast.show({
        type: 'error',
        text1: 'Please fill the required information',
        visibilityTime: 4000,
      });
      //console.warn('fill the required info');
    } else {
      //console.warn('about to save');
      const creditCard = {
        holderName: holderName,
        cardNumber: cardNumber,
        expDate: expDate,
      };
      let credit = creditCards.find(
        card => card.cardNumber === creditCard.cardNumber,
      );
      //console.warn('is matched', credit.cardNumber);
      try {
        if (credit.cardNumber !== undefined) {
          //console.error('card found ', credit);
          Toast.show({
            type: 'error',
            text1: 'Card already saved',
            visibilityTime: 4000,
          });
        } else {
          console.error('should not be here ');
        }
      } catch (r) {
        console.error('card not found ', r);
        creditCards.push(creditCard);
        //console.warn('add to empty cards', creditCards);
        AsyncStorage.setItem('CardsData', JSON.stringify(creditCards));
        Toast.show({
          //type: 'error',
          text1: 'Card is saved',
          visibilityTime: 4000,
        });
      }
    }

    // await AsyncStorage.getItem('CardsData')
    //   .then(res => {
    //     if (res != null) {
    //       //console.warn('is not null', res);
    //       //const newcard = JSON.parse(res);
    //       console.warn('card from res', typeof creditCards);
    //       creditCards.push(creditCard);
    //       console.warn('add to filled cards', creditCards);
    //       AsyncStorage.setItem('CardsData', JSON.stringify(creditCards));
    //     } else {
    //       creditCards.push(creditCard);
    //       console.warn('add to empty cards', creditCards);
    //       AsyncStorage.setItem('CardsData', JSON.stringify(creditCards));
    //     }
    //   })
    //   .catch(err => {
    //     console.warn(err);
    //   });
    /////
    //console.log('length is ', cardNumber.length);
    // try {
    //   await AsyncStorage.setItem('CardsData', JSON.stringify(creditCard));
    //   console.warn('card saved!');
    // } catch (error) {
    //   console.warn('cards not saved,', error);
    // }
  };

  const getData = async () => {
    try {
      //console.warn('delete');
      //const value = await AsyncStorage.clear();
      const value = await AsyncStorage.getItem('CardsData');
      if (value !== null) {
        //console.warn('saved cards', value);
        setCreditCards(JSON.parse(value));
      } else {
        //console.warn('no saved cards', value);
      }
    } catch (e) {
      // error reading value
    }
  };
  //() => navigation.navigate('PersonalMenu')
  return (
    <View>
      {/*header*/}
      <YellowHeader
        text="Add Credit Card"
        onPress={() => navigation.navigate('UserCards')}
      />
      <Toast
        ref={ref => {
          Toast.setRef(ref);
        }}
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
          <Text style={styles.label}>Expiry Date</Text>
          <InputBox
            placeholder="MMYY"
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
            setData();
          }}
        />
      </View>
      {/* <Text>card is {typeof creditCards}</Text>
      <Text>card holder name is {creditCards.holderName}</Text>
      <Text>
        {creditCards.map(card => {
          return <Text> card is {card.holderName + card.cardNumber}</Text>;
        })}
      </Text> */}
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
export default AddCard;
