import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import componants
import {REACT_APP_address} from '@env';
import colors from '../assets/colors/Colors';
import GreyHeader from '../Components/GreyHeader';

function StoresMenu() {
  //params
  const navigation = useNavigation();
  const [position, setPosition] = useState('');
  const [storeList, setStoreList] = useState([]);

  //functions

  //get user's current position
  useEffect(() => {
    const getCurrentPosition = () => {
      Geolocation.getCurrentPosition(
        pos => {
          //setPosition(JSON.stringify(pos));
          console.log('latitude ' + JSON.stringify(pos.coords.latitude));
          console.log('longitude ' + JSON.stringify(pos.coords.longitude));
          //console.log(JSON.stringify({ Location_Latitude: pos['coords']['latitude'], Location_Longitude: pos['coords']['longitude'], }),  );
          fetch('http:/' + REACT_APP_address + ':3000/store/address', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Location_Latitude: pos.coords.latitude,
              Location_Longitude: pos.coords.longitude,
            }),
          })
            .then(async res => {
              try {
                const jsonRes = await res.json();
                if (!jsonRes.status) {
                  //store the data from here
                  console.log(jsonRes.status);
                  console.log('post', jsonRes);
                } else {
                  console.log(jsonRes.status);
                  console.log(jsonRes.Address);
                  setPosition(jsonRes.Address);
                }
              } catch (err) {
                console.log('error', err);
              }
            })
            .catch(err => {
              console.log('error', err);
            });
        },
        error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
        {timeout: 30000, maximumAge: 3600000},
      );
    };
    getCurrentPosition();
  }, [position]);

  //get nearest stores list
  useEffect(() => {
    const getStores = () => {
      Geolocation.getCurrentPosition(pos => {
        fetch('http:/' + REACT_APP_address + ':3000/store/findNearest', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Location_Latitude: pos.coords.latitude,
            Location_Longitude: pos.coords.longitude,
          }),
        })
          .then(response => response.json())
          .then(data => {
            if (data.message.match('There are no stores nearby')) {
              console.log('store is:', data);
            } else {
              const store = JSON.parse(JSON.stringify(data));
              setStoreList(store.storeList);
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      });
    };
    getStores();
  });

  //when user clicks on any store from the stores list, we get the store's product
  const userChoice = async (id, storename) => {
    //console.error('storeid ', id);
    //console.error('storename ', storename);
    //connect to backend to get products of the store the user choose
    fetch('http:/' + REACT_APP_address + ':3000/product/StoreProducts', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({storeId: id}),
    })
      .then(response => response.json())
      .then(data => {
        const StoreData = {
          storeID: id,
          storeName: storename,
          storeProducts: data.Products,
        };
        //console.log('products are ', data);
        //save products in storage and go to storepage
        try {
          AsyncStorage.setItem('StoreData', JSON.stringify(StoreData));
          //console.warn('storedata are saved!');
        } catch (error) {
          console.warn('storedata error,', error);
        }
        navigation.navigate('StorePage');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={{flex: 1}}>
      {/**header */}
      <GreyHeader text="Stores" />
      {/**user's current location */}
      <View>
        <Text style={styles.text}>Your location address is</Text>
        <Text style={styles.locationText}>{position}</Text>
        <Text style={styles.text}>Choose the store you are shopping at</Text>
      </View>
      <View
        style={{
          flex: 4.5,
          paddingTop: 9,
          //backgroundColor: '#F4F4F8',
        }}>
        {/**if user has no products in cart show message, if there is products show them*/}
        <ScrollView>
          {storeList.length === 0 ? (
            <View style={styles.warningContainer}>
              <MaterialCommunityIcons
                name="alert-circle"
                size={160}
                color="#c4c4c4"
              />
              <Text style={styles.textWarning}>
                There are no stores near you
              </Text>
            </View>
          ) : (
            storeList.map((item, i) => {
              return (
                <View style={styles.itemsContainer}>
                  <TouchableOpacity
                    key={item.id}
                    style={styles.storeOption}
                    onPress={() => userChoice(item.id, item.name)}>
                    <View style={styles.itemInfo}>
                      <Image
                        style={{width: 35, height: 35, marginRight: 9}}
                        source={{
                          uri:
                            'http:/' +
                            REACT_APP_address +
                            ':3000//' +
                            item.logo.replace(/\\/g, '//'),
                        }}
                      />
                      <Text style={styles.itemText}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textWarning: {
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
  text: {
    margin: 10,
    fontFamily: 'Nunito-Bold',
    color: colors.default,
    fontSize: 16,
  },
  locationText: {
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Nunito-Regular',
    color: colors.default,
    fontSize: 16,
  },
  itemsContainer: {
    //marginVertical: 10,
    marginHorizontal: 10,
    //justifyContent: 'space-between',
  },
  storeOption: {
    height: 65,
    width: '100%',
    backgroundColor: '#F5F5F9',
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    marginVertical: 5,
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itemText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: colors.default,
    paddingLeft: 15,
  },
});
export default StoresMenu;
