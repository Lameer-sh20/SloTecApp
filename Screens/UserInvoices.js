import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

//import componants
import {REACT_APP_address} from '@env';
import colors from '../assets/colors/Colors';
import YellowHeader from '../Components/YellowHeader';

function UserInvoices() {
  //parameters
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [storeId, setStoreId] = useState('');
  const [invoices, setInvoices] = useState([]);

  ///functions
  //get user id
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
  //get user invoices from DB
  useEffect(() => {
    const getInvoices = async () => {
      fetch(
        'http:/' + REACT_APP_address + ':3000/invoice/getUserStoreInvoices',
        {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({userId, storeId}),
        },
      )
        .then(response => response.json())
        .then(data => {
          // if (data.invoices !== null) {
          //   console.log(data.invoices);
          //   setInvoices(JSON.parse(JSON.stringify(data.invoices)));
          // }
          setInvoices(JSON.parse(JSON.stringify(data.invoices)));
          //console.log('user invoices ', data.invoices);
        })
        .catch(error => {
          //console.error('Error:here ', error);
        });
    };
    getInvoices();
  });

  return (
    <View style={{flex: 1}}>
      {/*header*/}
      <YellowHeader
        text="Invoices"
        onPress={() => navigation.navigate('StorePage')}
      />
      <View
        style={{
          flex: 4.5,
          paddingTop: 9,
          //backgroundColor: '#F4F4F8',
        }}>
        <ScrollView>
          {/*show if user has no invoices*/}
          {invoices.length === 0 ? (
            <View style={styles.warningContainer}>
              <MaterialCommunityIcons
                name="alert-circle"
                size={160}
                color="#c4c4c4"
              />
              <Text style={styles.text}>You do not have any invoices</Text>
            </View>
          ) : (
            //show if user has  invoices
            invoices.map((item, i) => {
              return (
                <TouchableOpacity
                  style={styles.listContainer}
                  onPress={() => {
                    navigation.navigate('InvoiceDetails', {
                      invoice: item,
                    });
                  }}>
                  <View style={styles.invoiceContainer}>
                    <View style={styles.date__name_priceContainer}>
                      <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>
                          {JSON.stringify(item.createdAt).substring(1, 11)},
                          {'  '}
                          {JSON.stringify(item.createdAt).substring(12, 20)}
                        </Text>
                      </View>
                      <Text style={styles.text}>Store: {item.store.name}</Text>
                      <Text style={styles.text}>
                        Total: {item.totalPrice} SAR
                      </Text>
                    </View>

                    <AntDesign name="right" size={20} color={colors.default} />
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 5,
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
  },
  warningContainer: {
    marginTop: 150,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 9,
    paddingBottom: 9,
  },
  invoiceContainer: {
    backgroundColor: '#F4F4F8',
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 10,
    width: '100%',
    borderColor: colors.borderColor,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  date__name_priceContainer: {
    marginTop: 9,
    marginBottom: 9,
  },
  dateContainer: {
    marginBottom: 9,
    //flexDirection: 'row',
  },
  dateText: {
    fontFamily: 'Nunito-Regular',
    color: colors.gray,
    fontSize: 16,
  },
});
export default UserInvoices;
