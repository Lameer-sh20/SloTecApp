import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dropdown} from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';

//import componants
import {REACT_APP_address} from '@env';
import colors from '../assets/colors/Colors';
import SignHeader from '../Components/SignHeader';

function CheckoutPage() {
  //params
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  const [storeId, setStoreId] = useState('');

  const [purchaseProducts, setPurchaseProducts] = useState([]);
  let [purchaseTotal, setPurchaseTotal] = useState();

  //const [cardEnabled, setCardEnabled] = useState(false);
  const [cashEnabled, setCashEnabled] = useState(false);
  const [payEnabled, setPayEnabled] = useState(false);
  const [paymentType, setPaymentType] = useState('');

  const [fullCreditCards, setFullCreditCards] = useState([]);
  const [creditCards, setCreditCards] = useState([]);
  //const [chosenCard, setChosenCard] = useState([]);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  //functions
  //get purchase(products, total) data
  useEffect(() => {
    const getData = async () => {
      try {
        const purchase = await AsyncStorage.getItem('PurchaseData');
        if (purchase !== null) {
          //console.log('purchase not empty products', JSON.parse(value).products);
          //console.log('purchase not empty total', JSON.parse(value).total);
          setPurchaseProducts(JSON.parse(purchase).products);
          setPurchaseTotal(JSON.parse(purchase).total);
        } else {
          console.warn('purchase is empty', purchase);
        }
      } catch (e) {
        console.error('could not get purchase from storage', e);
      }
    };
    getData();
  }, []);

  //get user id
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('UserData');
        if (value !== null) {
          setUserId(JSON.parse(value).id);
          //console.log(value);
        } else {
          console.warn('UserData is null');
        }
      } catch (e) {
        console.error('no UserData in storage');
      }
    };
    getData();
  }, []);

  //get current store data from storage (to get store id)
  useEffect(() => {
    const getData = async () => {
      try {
        const storedata = await AsyncStorage.getItem('StoreData');
        if (storedata !== null) {
          //console.warn(JSON.parse(storedata).storeID);
          setStoreId(JSON.parse(storedata).storeID);
        } else if (storedata == null) {
          console.warn('StoreData is null');
        }
      } catch (e) {
        console.error(e);
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

  //get user cards from DB
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
          if (data.cards[0] === undefined) {
            Toast.show({
              type: 'error',
              text1: 'There are no saved credit cards to pay online',
              text2: 'Click to add card or pay in cash',
              onPress: () => {
                navigation.navigate('AddCard');
              },
              visibilityTime: 3000,
            });
            console.log('no cards');
          } else {
            setFullCreditCards(data.cards);
          }
        })
        .catch(error => {
          //console.error('Error: ', error);
        });
    };
    getCards();
  }, [userId, token, navigation]);

  //adjust cards just to view in credit cards list
  useEffect(() => {
    const adjustCards = () => {
      //console.log('new array', newArray);
      try {
        let newArray = fullCreditCards.map(item => {
          return {
            label:
              '************' + JSON.stringify(item.cardNum).substring(13, 17),
            value: item.cardNum,
          };
        });
        setCreditCards(newArray);
      } catch (e) {
        //console.error('could not adjust cards, user does not have saved cards');
      }
    };
    adjustCards();
  }, [fullCreditCards, navigation]);

  //function is to handle user choice switching color (yellow, gray)
  const paymentChoice = type => {
    if (type === 'card') {
      setCashEnabled(false);
      setPayEnabled(true);
      setPaymentType(JSON.stringify(2));
    } else if (type === 'cash') {
      setIsFocus(false);
      setValue(null);
      setCashEnabled(true);
      setPayEnabled(true);
      setPaymentType(JSON.stringify(1));
    }
  };

  // create unpaid invoice when user clicks 'pay'
  const paymentHandler = async type => {
    Alert.alert('Alert', 'Do you want to continue to payment?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          setPurchase(type);
        },
      },
    ]);
  };

  //called by payment handler to set purchse based on user choice
  const setPurchase = async type => {
    //just to match needed format in DB
    const items = [];
    for (let i = 0; i < purchaseProducts.length; i++) {
      const prod = {
        productId: purchaseProducts[i].product.id,
        quantity: purchaseProducts[i].quant,
        PurchasingPrice:
          purchaseProducts[i].product.sellPrice * purchaseProducts[i].quant,
      };
      items.push(prod);
    }
    //console.log('purchase data', items);
    /////////////////////////////////////////////////
    ///1 = cash
    if (type === '1') {
      // send total and prodcuts to backend
      fetch('http:/' + REACT_APP_address + ':3000/invoice/AddInvoice', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          totalPrice: purchaseTotal,
          paymentGatwayId: paymentType,
          userId: userId,
          storeId: storeId,
          items: items,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === true) {
            //console.warn('invoice data', data.invoice_header);
            navigation.navigate('CashPaymentPage', {
              invoice_header: data.invoice_header,
            });
          } else {
            console.warn('could not make purchase', data);
          }
        })
        .catch(error => {
          console.error('Error: ', error);
        });
    }
    /////////////////////////////////////////////////
    ///2 = credit card
    else if (type === '2') {
      //console.warn('pay with:', paymentType);
      //get chosen credit card
      let card = fullCreditCards.find(data => data.cardNum === value);
      console.log('chosen card is', card);
      // send total and prodcuts to backend
      fetch('http:/' + REACT_APP_address + ':3000/invoice/AddInvoice', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          totalPrice: purchaseTotal,
          paymentGatwayId: paymentType,
          userId: userId,
          storeId: storeId,
          items: items,
          CreditCardHolder: card.cardHolderName,
          CreditCardNum: card.cardNum,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === true) {
            //console.warn('invoice data', data.invoice_header);
            navigation.navigate('CardPaymentPage', {
              invoice_header: data.invoice_header,
            });
          } else {
            console.warn('could not make purchase', data);
          }
        })
        .catch(error => {
          console.error('Error: ', error);
        });
    } else {
      console.warn('not okay');
    }
  };

  ////////
  return (
    <View style={{flex: 1}}>
      {/** header */}
      <SignHeader
        text="Checkout"
        onPress={() => navigation.navigate('UserCart')}
      />
      <View
        style={{
          flex: 4.5,
          paddingTop: 9,
          backgroundColor: '#F4F4F8',
        }}>
        <ScrollView>
          {/** show products section */}
          {purchaseProducts.map((item, i) => {
            return (
              <View key={item.product.id} style={styles.listContainer}>
                <View style={styles.productContainer}>
                  <View style={styles.name__size_priceContainer}>
                    <View style={styles.name_sizeContainer}>
                      <Text style={styles.name}>{item.product.name}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#E7E7EB',
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                  />
                  <View style={styles.quant_totalContainer}>
                    <View style={styles.quantCounter}>
                      <Text style={styles.quantText}>Qty: {item.quant}</Text>
                    </View>
                    <Text style={styles.itemTotal}>
                      {item.product.saleprice === undefined
                        ? 'SAR ' + item.product.price * item.quant
                        : 'SAR ' + item.product.saleprice * item.quant}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
          {/** show payment section */}
          <Text
            style={{
              fontFamily: 'Nunito-Bold',
              color: '#212429',
              fontSize: 17,
              paddingTop: 2,
              paddingBottom: 10,
              paddingHorizontal: 10,
            }}>
            Payment Methods
          </Text>

          <View>
            <Dropdown
              style={value ? styles.dropdownActive : styles.dropdownUnactive}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={creditCards}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Credit Card' : '...'}
              value={value}
              onFocus={() => setIsFocus(true)}
              onChange={item => {
                setValue(item.value);
                paymentChoice('card');
              }}
              renderLeftIcon={() => (
                <MaterialIcons
                  name="payment"
                  size={35}
                  color="#212429"
                  style={{
                    marginLeft: 4,
                    marginRight: 9,
                  }}
                />
              )}
            />
          </View>

          <TouchableOpacity
            style={
              cashEnabled
                ? styles.paymentOptionActive
                : styles.paymentOptionUnactive
            }
            onPress={() => paymentChoice('cash')}>
            <MaterialCommunityIcons name="cash" size={40} color="#212429" />
            <Text style={styles.paymentOptionText}>Cash</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/** checkout section*/}
      <View style={styles.checkoutContainer}>
        <View style={styles.totalCartContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalCartText}>SAR {purchaseTotal}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={
              payEnabled ? styles.buttonActivated : styles.buttonUnactivated
            }
            onPress={() => paymentHandler(paymentType)}
            disabled={!payEnabled}>
            <Text style={styles.buttonText}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast
        ref={ref => {
          Toast.setRef(ref);
        }}
      />
    </View>
  );
}
export default CheckoutPage;

const styles = StyleSheet.create({
  pagecontainer: {
    flex: 1,
    //justifyContent: 'center',
  },
  listContainer: {
    paddingHorizontal: 9,
    paddingBottom: 5,
  },
  productContainer: {
    backgroundColor: 'white',
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 10,
    width: '100%',
    //height: '100%',
  },
  name__size_priceContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name_sizeContainer: {
    flexDirection: 'row',
  },
  name: {
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
  },
  size: {
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
  },
  priceContainer: {
    //add if needed
  },
  defaultPrice: {
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
  },
  oldPrice: {
    fontFamily: 'Nunito-Regular',
    color: 'grey',
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  salePrice: {
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
  },
  quant_totalContainer: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantCounter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantText: {
    //paddingHorizontal: 10,
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
  },
  itemTotal: {
    fontFamily: 'Nunito-SemiBold',
    color: colors.blue,
    fontSize: 16,
  },
  checkoutContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1.2,
    borderColor: '#E7E7EB',
  },
  totalCartContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  paymentOptionActive: {
    backgroundColor: '#FFEB83',
    fontSize: 17,
    padding: 9,
    borderRadius: 10,
    marginLeft: 9,
    marginRight: 9,
    marginBottom: 9,
    flexDirection: 'row',
  },
  paymentOptionUnactive: {
    backgroundColor: colors.gray2,
    fontSize: 17,
    padding: 9,
    borderRadius: 10,
    marginLeft: 9,
    marginRight: 9,
    marginBottom: 9,
    flexDirection: 'row',
  },
  paymentOptionText: {
    fontFamily: 'Nunito-SemiBold',
    color: '#212429',
    fontSize: 17,
    padding: 10,
  },
  buttonContainer: {
    width: '100%',
    height: 55,
    paddingHorizontal: 10,
  },
  buttonActivated: {
    backgroundColor: '#FFEB83',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonUnactivated: {
    backgroundColor: colors.gray2,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonText: {
    fontFamily: 'Nunito-Bold',
    color: '#484038',
    //fontWeight: '700',
    fontSize: 17,
  },
  dropdownUnactive: {
    height: 60,
    paddingHorizontal: 8,
    backgroundColor: colors.gray2,
    fontSize: 17,
    padding: 9,
    borderRadius: 10,
    marginLeft: 9,
    marginRight: 9,
    marginBottom: 9,
  },
  dropdownActive: {
    height: 60,
    paddingHorizontal: 8,
    backgroundColor: '#FFEB83',
    fontSize: 17,
    padding: 9,
    borderRadius: 10,
    marginLeft: 9,
    marginRight: 9,
    marginBottom: 9,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontFamily: 'Nunito-SemiBold',
    color: '#212429',
    fontSize: 17,
  },
  selectedTextStyle: {
    fontFamily: 'Nunito-SemiBold',
    color: '#212429',
    fontSize: 17,
  },
});
