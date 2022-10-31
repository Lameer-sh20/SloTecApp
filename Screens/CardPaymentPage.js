import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import componants
import colors from '../assets/colors/Colors';
import GreyHeader from '../Components/GreyHeader';

function CardPaymentPage({navigation, route}) {
  //params
  let invoice = route.params.invoice_header;

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
          marginHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.Text}>Please wait ..</Text>
        {/** total section*/}
        <View style={styles.totalCartContainer}>
          <Text style={styles.totalText}>Total</Text>
          <ActivityIndicator size="large" color={colors.blue} />
          <Text style={styles.totalCartText}>{invoice.totalPrice} SAR</Text>
        </View>
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
