import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Dropdown} from 'react-native-element-dropdown';

//import componants
import {REACT_APP_address} from '@env';
import YellowHeader from '../Components/YellowHeader';
import InputBox from '../Components/InputBox';
import LongButton from '../Components/LongButton';

function AddCard() {
  //parameters
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [creditCards, setCreditCards] = useState([]);

  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [expiresDate, setexpiresDate] = useState('');

  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);

  const [isFocusYear, setIsFocusYear] = useState(false);
  const [isFocusMonth, setIsFocusMonth] = useState(false);

  const yearsOptions = [
    {label: '2023', value: '2023'},
    {label: '2024', value: '2024'},
    {label: '2025', value: '2025'},
    {label: '2026', value: '2026'},
    {label: '2027', value: '2027'},
  ];

  const monthsOptions = [
    {label: '01', value: '01'},
    {label: '02', value: '02'},
    {label: '03', value: '03'},
    {label: '04', value: '04'},
    {label: '05', value: '05'},
    {label: '06', value: '06'},
    {label: '07', value: '07'},
    {label: '08', value: '08'},
    {label: '09', value: '09'},
    {label: '10', value: '10'},
    {label: '11', value: '11'},
    {label: '12', value: '12'},
  ];

  //functions

  //get user id from storage
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('UserData');
        if (value !== null) {
          setUserId(JSON.parse(value).id);
          //console.warn(value);
        } else {
          console.log('UserData is null');
        }
      } catch (e) {
        console.error('no UserData in storage');
      }
    };
    getData();
  }, []);

  //get user Token(user is signedup/in), other wise is null
  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          setToken(JSON.parse(value));
          console.log('token is not null');
        } else {
          console.warn('token is null');
        }
      } catch (e) {
        console.error('error', e);
      }
    };
    getToken();
  }, []);

  //get cards from DB
  useEffect(() => {
    const getCards = async () => {
      fetch('http:/' + REACT_APP_address + ':3000/card/getUserCards', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({userId}),
      })
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          setCreditCards(data.cards);
        })
        .catch(error => {
          console.error('Error: ', error);
        });
    };
    getCards();
  }, [userId, token, creditCards]);

  // save card in DB
  const setData = async () => {
    setexpiresDate(year + '-' + month);
    if (
      cardHolderName.length === 0 ||
      cardNum.length === 0 ||
      expiresDate === 'null-null'
    ) {
      Toast.show({
        type: 'error',
        text1: 'Please fill the required information',
        visibilityTime: 4000,
      });
    }
    if (cardNum.length < 15 && cardNum.length > 0) {
      //console.error('card lenght', cardNum.length);
      Toast.show({
        type: 'error',
        text1: 'Card number is not 16 number',
        visibilityTime: 4000,
      });
    } else {
      //console.warn('about to save');
      try {
        const creditCard = {
          cardHolderName: cardHolderName,
          cardNum: cardNum,
          expDate: expiresDate,
        };
        let credit = creditCards.find(
          card => card.cardNum === creditCard.cardNum,
        );
        //card exists before
        if (credit.cardNum !== null) {
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
        //card do not exists before
        console.log('card do not exist before');
        fetch('http:/' + REACT_APP_address + ':3000/card/addCard', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({userId, cardHolderName, cardNum, expiresDate}),
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === true) {
              console.log(data.message);
              Toast.show({
                type: 'success',
                text1: data.message,
                visibilityTime: 4000,
              });
            } else {
              console.log(data.message);
              // Toast.show({
              //   type: 'error',
              //   text1: data.message,
              //   visibilityTime: 4000,
              // });
            }
          })
          .catch(error => {
            console.error('Error: ', error);
          });
      }
    }
  };

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
      <View style={styles.inputs}>
        <View style={styles.inputsContainer}>
          <Text style={styles.label}>Cardholder Name</Text>
          <InputBox
            placeholder="name"
            value={cardHolderName}
            onChangeText={text => setCardHolderName(text)}
          />
        </View>

        <View style={styles.inputsContainer}>
          <Text style={styles.label}>Card Number</Text>
          <InputBox
            placeholder="xxxx xxxx xxxx xxxx"
            value={cardNum}
            onChangeText={text => setCardNum(text)}
          />
        </View>

        <View style={styles.inputsContainer}>
          <Text style={styles.label}>Expiry Date</Text>
          <View style={styles.expDateContainer}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={yearsOptions}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocusYear ? 'YYYY' : '...'}
              value={year}
              onFocus={() => setIsFocusYear(true)}
              onBlur={() => setIsFocusYear(false)}
              onChange={item => {
                setYear(item.value);
                setIsFocusYear(false);
              }}
            />

            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={monthsOptions}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocusMonth ? 'MM' : '...'}
              value={month}
              onFocus={() => setIsFocusMonth(true)}
              onBlur={() => setIsFocusMonth(false)}
              onChange={item => {
                setMonth(item.value);
                setIsFocusMonth(false);
              }}
            />
          </View>
        </View>
      </View>
      {/*save button*/}
      <View style={styles.buttonContainer}>
        <LongButton
          text="Save"
          onPress={() => {
            setData();
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
  expDateContainer: {
    flexDirection: 'row',
  },
  dropdown: {
    height: 45,
    width: 100,
    paddingHorizontal: 8,
    backgroundColor: '#F5F5F9',
    fontSize: 17,
    padding: 9,
    borderRadius: 10,
    marginLeft: 9,
    marginRight: 9,
    marginBottom: 9,
    marginTop: 9,
    borderColor: '#E7E7EB',
    borderWidth: 0.5,
  },
  placeholderStyle: {
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
  },
  selectedTextStyle: {
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
  },
});
export default AddCard;

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
//console.log('length is ', cardNum.length);
// try {
//   await AsyncStorage.setItem('CardsData', JSON.stringify(creditCard));
//   console.warn('card saved!');
// } catch (error) {
//   console.warn('cards not saved,', error);
// }

//const setData = async () => {
//   try {
//     setExpDate(year + '-' + month);
//   } catch (e) {
//     console.error('could notset expiry date', e);
//   }
//   if (cardNum.length < 15 && cardNum.length > 0) {
//     //console.error('card lenght', cardNum.length);
//     Toast.show({
//       type: 'error',
//       text1: 'Card number is not 16 number',
//       visibilityTime: 4000,
//     });
//   } else if (year.length < 0 || month.length < 0) {
//     Toast.show({
//       type: 'error',
//       text1: 'Please chose your card expiry date',
//       visibilityTime: 4000,
//     });
//   } else if (
//     holderName.length === 0 ||
//     cardNum.length === 0 ||
//     expDate.length === 0
//   ) {
//     Toast.show({
//       type: 'error',
//       text1: 'Please fill the required information',
//       visibilityTime: 4000,
//     });
//     //console.warn('fill the required info');
//   } else {
//     //console.warn('about to save');
//     const creditCard = {
//       holderName: holderName,
//       cardNum: cardNum,
//       expDate: expDate,
//     };
//     let credit = creditCards.find(
//       card => card.cardNum === creditCard.cardNum,
//     );
//     //console.warn('is matched', credit.cardNum);
//     try {
//       if (credit.cardNum !== undefined) {
//         //console.error('card found ', credit);
//         Toast.show({
//           type: 'error',
//           text1: 'Card already saved',
//           visibilityTime: 4000,
//         });
//       } else {
//         console.error('should not be here ');
//       }
//     } catch (r) {
//       console.log('card do not exist before ');
//       creditCards.push(creditCard);
//       //console.warn('add to empty cards', creditCards);
//       AsyncStorage.setItem('CardsData', JSON.stringify(creditCards));
//       Toast.show({
//         type: 'success',
//         text1: 'Credit Card is saved',
//         visibilityTime: 4000,
//       });
//     }
//   }
// };
