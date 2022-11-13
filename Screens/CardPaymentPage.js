import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

//import componants
import {REACT_APP_address} from '@env';
import colors from '../assets/colors/Colors';
import GreyHeader from '../Components/GreyHeader';

function CardPaymentPage({navigation, route}) {
  //params
  const [token, setToken] = useState('');
  const [code, onChangeText] = useState('');
  const [time, setTime] = useState(null);
  const [tempData, setTempData] = useState([]);
  const [cardNumb, setCard] = useState([]);

  // let creditCard = route.params.creditCard;
  // let phone = route.params.userPhone;
  // let storeName = route.params.storeName;
  // //let purchaseInfo = route.params.purchaseInfo;
  // let totalPrice = route.params.purchaseTotal;
  // let paymentGatwayId = route.params.paymentType;
  // let userId = route.params.userId;
  // let storeId = route.params.storeId;
  // let items = route.params.items;
  // let CreditCardHolder = route.params.cardHolderName;
  // let CreditCardNum = route.params.cardNum;

  //functions
  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          setToken(JSON.parse(value));
          console.log('token is not null,', value);
        } else {
          console.warn('token is null,', value);
        }
      } catch (e) {
        console.error('error', e);
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    const getTempPurch = async () => {
      try {
        const value = await AsyncStorage.getItem('TempPurchase');
        if (value !== null) {
          setTempData(JSON.parse(value));
          setCard(JSON.parse(value).CreditCardNum);
          //console.log('temp data not null,', JSON.parse(value).CreditCardNum);
        } else {
          console.warn('temp data is null,', value);
        }
      } catch (e) {
        console.error('error', e);
      }
    };
    getTempPurch();
  }, []);

  useEffect(() => {
    let time = getCurrentTime();
    setTime(time);
  }, []);

  const getCurrentTime = () => {
    let today = new Date();
    let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
    let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
    return hours + ':' + minutes + ':' + seconds;
  };

  const loaderHandler = async () => {
    setTimeout(() => {
      Alert.alert('Alert', 'Your purchase is successful', [
        {
          text: 'View Invoice',
          onPress: () => {
            try {
              AsyncStorage.setItem('CartData', JSON.stringify([]));
              console.log('CartData is set to []');
              navigation.navigate('UserInvoices');
            } catch (error) {
              console.warn('could not set CartData to []');
            }
          },
        },
      ]);
    }, 3000);
  };
  //when user clicks okay
  const setPurchase = () => {
    if (code === '' || code.length < 4 || code.length > 4) {
      Toast.show({
        type: 'error',
        text1: 'Please enter Secure Code',
        visibilityTime: 3000,
      });
    } else if (code.length === 4) {
      // send total and prodcuts to backend
      fetch('http:/' + REACT_APP_address + ':3000/invoice/AddInvoice', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          totalPrice: tempData.totalPrice,
          paymentGatwayId: tempData.paymentGatwayId,
          userId: tempData.userId,
          storeId: tempData.storeId,
          items: tempData.items,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === true) {
            //console.warn('invoice data', data.invoice_header);
            loaderHandler();
          } else {
            console.warn('could not make purchase', data);
          }
        })
        .catch(error => {
          console.error('Error: ', error);
        });
    }
  };

  return (
    <View style={{flex: 1}}>
      {/** header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CheckoutPage');
          }}>
          <Text style={{fontSize: 22, color: 'black'}}>Cancel</Text>
        </TouchableOpacity>
        <Image
          style={styles.madalLogo}
          source={require('../assets/Images/mada-logo.png')}
        />
      </View>
      <Toast
        ref={ref => {
          Toast.setRef(ref);
        }}
      />
      <View
        style={{
          flex: 4.5,
          marginVertical: 30,
          marginHorizontal: 5,
        }}>
        <Text
          style={{
            fontSize: 25,
            color: 'crimson',
            fontWeight: '600',
            marginTop: 30,
            marginBottom: 5,
            fontStyle: 'italic',
          }}>
          Enter Your One Time Password
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontWeight: '400',
            marginVertical: 10,
          }}>
          Please enter your one Time Password in the field below to confirm your
          identity for purchase. This information is not shared with the
          merchant.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            //justifyContent: 'space-between',
          }}>
          <View>
            <Text style={styles.textBold}>Marchant</Text>
            <Text style={styles.textBold}>Amount</Text>
            <Text style={styles.textBold}>Date</Text>
            <Text style={styles.textBold}>Card Number</Text>
            <Text style={styles.textBold}>Personal Message</Text>
            <Text style={styles.textBold}></Text>
          </View>
          {/**line */}
          <View style={{height: 1.2, backgroundColor: 'black'}} />
          <View
            style={{
              marginLeft: 10,
            }}>
            <Text style={styles.textThin}>{tempData.storeName}</Text>
            <Text style={styles.textThin}>{tempData.totalPrice} SAR</Text>
            <Text style={styles.textThin}>{time}</Text>
            <Text style={styles.textThin}>
              {'************' + JSON.stringify(cardNumb).substring(13, 17)}
            </Text>
            <Text style={styles.textThin}>{''}</Text>
          </View>
        </View>
        {/** code*/}
        <View
          style={{
            paddingTop: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <Text style={{fontSize: 25, color: 'crimson'}}>Secure Code</Text>
            <Text style={{fontSize: 15, color: 'crimson'}}> (Required)</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={code}
            placeholder=""
            keyboardType="numeric"
          />
        </View>
        {/**button */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'dodgerblue',
              width: 120,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setPurchase()}>
            <Text
              style={{
                fontSize: 22,
                color: 'black',
              }}>
              ok
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  madalLogo: {
    width: 120,
    height: 40,
  },
  textBold: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
  textThin: {
    fontSize: 20,
    color: 'gray',
    fontWeight: '400',
  },
  Text: {
    fontFamily: 'Nunito-Bold',
    color: colors.default,
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: 166,
    //margin: 12,
    borderColor: colors.gray2,
    borderWidth: 1,
    padding: 10,
    shadowColor: colors.gray2,
    //shadowRadius: 5,
    elevation: 3,
  },
  totalCartContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E7E7EB',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontFamily: 'Nunito-Bold',
    color: '#212429',
    fontSize: 17,
  },
  totalCartText: {
    fontFamily: 'Nunito-SemiBold',
    color: colors.blue,
    fontSize: 17,
  },
});
export default CardPaymentPage;

//keep running the loader shape for some time, then shows alert the purchse is done, then back to storepage
// useEffect(() => {
//   const loaderHandler = async () => {
//     setTimeout(() => {
//       Alert.alert('Alert', 'Your purchase is successful', [
//         {
//           text: 'View Invoice',
//           onPress: () => {
//             try {
//               AsyncStorage.setItem('CartData', JSON.stringify([]));
//               console.log('CartData is set to []');
//               navigation.navigate('UserInvoices');
//             } catch (error) {
//               console.warn('could not set CartData to []');
//             }
//           },
//         },
//       ]);
//     }, 10000);
//   };
//   loaderHandler();
// }, [navigation]);
