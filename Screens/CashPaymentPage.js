import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';

//import componants
import colors from '../assets/colors/Colors';
import GreyHeader from '../Components/GreyHeader';

function CashPaymentPage({navigation, route}) {
  //parms
  let invoice = route.params.invoice_header;

  //function
  //keep running the loader shape for some time, then shows alert the purchse is done, then back to storepage
  useEffect(() => {
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
      }, 10000);
    };
    loaderHandler();
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      {/** header */}
      <GreyHeader text="Payment" />
      <View
        style={{
          flex: 4.5,
          marginVertical: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/** QR section*/}
        <ScrollView>
          <Text style={styles.Text}>
            Please Show the QRCode at the cashier counter
          </Text>
          <View style={styles.qrContainer}>
            <QRCode
              value={JSON.stringify(invoice.id)}
              size={330}
              color="black"
              backgroundColor="white"
            />
          </View>
          {/** total section*/}
          <View style={styles.totalCartContainer}>
            <Text style={styles.totalText}>Total</Text>
            <ActivityIndicator size="large" color={colors.blue} />
            <Text style={styles.totalCartText}>{invoice.totalPrice} SAR</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Text: {
    fontFamily: 'Nunito-Bold',
    color: colors.default,
    fontSize: 20,
    textAlign: 'center',
  },
  qrContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  totalCartContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E7E7EB',
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
export default CashPaymentPage;
