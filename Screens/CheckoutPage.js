import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../assets/colors/Colors';
import SignHeader from '../Components/SignHeader';
import LongButton from '../Components/LongButton';

function CheckoutPage() {
  const navigation = useNavigation();
  //params
  const [purchaseProducts, setPurchaseProducts] = useState([]);
  //let [status, setStatus] = useState('');
  let [purchaseTotal, setPurchaseTotal] = useState();
  const [isActive, setIsActive] = useState(false);
  const [paymentType, setPaymentType] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  //functions
  useEffect(() => {
    getData();
  });

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('PurchaseData');
      if (value !== null) {
        //console.warn('purchase not empty products', JSON.parse(value).products);
        //console.warn('purchase not empty total', JSON.parse(value).total);
        setPurchaseProducts(JSON.parse(value).products);
        setPurchaseTotal(JSON.parse(value).total);
      } else {
        console.warn('purchase is empty', value);
      }
    } catch (e) {
      console.warn('error', e);
    }
  };
  const paymentChoice = type => {
    console.warn('typeis', type);
    setIsActive(true);
    setPaymentType('cash');
  };

  const setPurchaseDate = () => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year + ', ' + hours + ':' + min + ':' + sec,
    );
  };
  const setPurchase = async type => {
    if (paymentType === 'cash') {
      setPurchaseDate();
      //console.warn('pay with', paymentType);
      //console.warn('date is ', currentDate);
      const UserData = await AsyncStorage.getItem('UserData');
      //console.warn('the user data is ', UserData);
      const newInvoice = {
        userData: UserData,
        purchaseDate: currentDate,
        paymentType: paymentType,
        totalPurchase: purchaseTotal,
        productsData: purchaseProducts,
      };
      // console.warn('invoice is', invoice);
      // console.warn('invoice is', invoice.userData);
      // console.warn('invoice is', invoice.purchaseDate);
      // console.warn('invoice is', invoice.paymentType);
      // console.warn('invoice is', invoice.totalPurchase);
      // console.warn('invoice is', typeof invoice.productsData);
      try {
        const value = await AsyncStorage.getItem('InvoiceData');
        if (value != null) {
          const invoices = JSON.parse(value);
          invoices.push(newInvoice);
          AsyncStorage.setItem('InvoiceData', JSON.stringify(invoices));
          //console.warn('previous invoices exists');
        } else {
          //console.warn('no previous invoices');
          const invoices = [];
          invoices.push(newInvoice);
          AsyncStorage.setItem('InvoiceData', JSON.stringify(invoices));
          //console.warn('purchase data saved');
        }
        Alert.alert('Successfully purchased', 'View your invoice');
      } catch (e) {
        console.error('purchase data not saved');
      }
    } else {
      console.warn('not okay ');
    }
  };
  return (
    <View style={{flex: 1}}>
      <SignHeader
        text="Checkout"
        onPress={() => navigation.navigate('UserCart')}
      />
      <View
        style={{
          flex: 4.5,
          //paddingTop: 9,
          backgroundColor: '#F4F4F8',
        }}>
        <ScrollView>
          {/* {purchaseProducts.map((item, i) => {
            return (
              <View style={styles.listContainer}>
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
                      <Text style={styles.quantText}>
                        Quantity: {item.quant}
                      </Text>
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
          })} */}
          <Text
            style={{
              fontFamily: 'Nunito-Bold',
              color: '#212429',
              fontSize: 17,
              padding: 10,
            }}>
            Payment Method
          </Text>
          <TouchableOpacity
            style={{
              fontFamily: 'Nunito-Bold',
              backgroundColor: 'lightgrey',
              fontSize: 17,
              padding: 9,
              borderRadius: 10,
              marginLeft: 9,
              marginRight: 9,
              flexDirection: 'row',
            }}
            onPress={() => paymentChoice('cash')}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="payment" size={40} color="#212429" />
            </View>
            <Text
              style={{
                fontFamily: 'Nunito-Bold',
                color: '#212429',
                fontSize: 17,
                padding: 10,
              }}>
              CreditCard
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              fontFamily: 'Nunito-Bold',
              backgroundColor: isActive ? '#FFEB83' : 'lightgrey',
              fontSize: 17,
              padding: 9,
              borderRadius: 10,
              margin: 9,
              //marginLeft: 9,
              //marginRight: 9,
              //marginBottom: 9,
              flexDirection: 'row',
            }}
            onPress={() => paymentChoice('cash')}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="cash" size={40} color="#212429" />
            </View>
            <Text
              style={{
                fontFamily: 'Nunito-Bold',
                color: '#212429',
                fontSize: 17,
                padding: 10,
              }}>
              Cash
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.checkoutContainer}>
        <View style={styles.totalCartContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalCartText}>SAR {purchaseTotal}</Text>
        </View>
        <LongButton text="Continue" onPress={() => setPurchase()} />
      </View>
      {/* <TouchableOpacity onPress={() => getData()}>
        <Text style={{fontSize: 40, color: 'black'}}>click</Text>
      </TouchableOpacity> */}
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
});
