import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

//import componants
import colors from '../assets/colors/Colors';
import YellowHeader from '../Components/YellowHeader';

function InvoiceDetails({navigation, route}) {
  //params
  let invoice = route.params.invoice;
  console.log('in details', invoice);

  return (
    <View style={{flex: 1}}>
      {/*header*/}
      <YellowHeader
        text="Invoice Details"
        onPress={() => navigation.navigate('UserInvoices')}
      />
      <View
        style={{
          flex: 4.5,
          paddingTop: 9,
          //backgroundColor: '#F4F4F8',
        }}>
        {/*details*/}
        <ScrollView>
          <View
            style={{
              paddingHorizontal: 9,
              paddingBottom: 9,
            }}>
            <View style={styles.invoiceHeaderContainer}>
              <View style={styles.date__name_priceContainer}>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>
                    {JSON.stringify(invoice.createdAt).substring(1, 11)},{'  '}
                    {JSON.stringify(invoice.createdAt).substring(12, 20)}
                  </Text>
                </View>
                <Text style={styles.text}>Store: {invoice.store.name}</Text>
                <Text style={styles.text}>Total: {invoice.totalPrice} SAR</Text>
                <Text style={styles.text}>
                  Payment Method: {invoice.payment_gatway.name}
                </Text>
              </View>
            </View>

            <View style={styles.invoiceDetailsContainer}>
              {invoice.invoice_details.map((item, i) => {
                return (
                  <View style={styles.productsContainer}>
                    <Text style={styles.productsText}>{item.product.name}</Text>
                    <View style={styles.quantity_priceContainer}>
                      <Text style={styles.productsText}>
                        {item.quantity} x {item.product.sellPrice} SAR
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingVertical: 3,
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
  },
  invoiceHeaderContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    width: '100%',
    borderColor: colors.borderColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  date__name_priceContainer: {
    marginTop: 9,
    marginBottom: 9,
  },
  dateContainer: {
    marginTop: 9,
    marginBottom: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'Nunito-Regular',
    color: colors.gray,
    fontSize: 16,
  },
  invoiceDetailsContainer: {
    backgroundColor: 'white',
    paddingTop: 9,
    width: '100%',
    borderColor: colors.borderColor,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  productsContainer: {
    paddingHorizontal: 12,
    paddingBottom: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantity_priceContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  productsText: {
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 15,
  },
});
export default InvoiceDetails;
