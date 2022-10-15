import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import colors from '../assets/colors/Colors';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignHeader from '../Components/SignHeader';

function StoresMenu() {
  const navigation = useNavigation();
  const [position, setPosition] = useState('');
  const [storeId, setStoreId] = useState('');
  const products = [
    {
      id: '1',
      name: 'apple',
      price: '10',
      saleprice: '9',
      info: 'it is good',

      uri: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      id: '2',
      name: 'orange',
      price: '15',
      saleprice: '15',
      info: 'it is good',

      uri: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      id: '3',
      name: 'carrot',
      price: '20',
      saleprice: '19.5',
      info: 'it is good',

      uri: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      id: '4',
      name: 'melon',
      price: '25',
      saleprice: '25',

      info: 'it is good',

      uri: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      id: '5',
      name: 'mango',
      price: '30',
      saleprice: '25',

      info: 'it is good',

      uri: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      id: '6',
      name: 'kiwi',
      price: '35',
      saleprice: '35',

      info: 'it is good',

      uri: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      id: '7',
      name: 'blueberry',
      price: '40',
      saleprice: '40',

      info: 'it is good',
      uri: 'https://reactnative.dev/img/tiny_logo.png',
    },
  ];
  const StoreData = {storeID: storeId, storeProducts: products};

  useEffect(() => {
    getCurrentPosition();
    //setData();
  });

  const setData = async () => {
    try {
      await AsyncStorage.setItem('StoreData', JSON.stringify(StoreData));
      console.warn('storedata are saved!');
    } catch (error) {
      console.warn('storedata error,', error);
    }
  };

  ///    uncomment this to see the store info from storage
  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('StoreData');
  //     if (value !== null) {
  //       console.error(JSON.parse(value).storeID);
  //       console.error(JSON.parse(value).storeProducts);
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  const userChoice = id => {
    setStoreId(id);
    setData();
    navigation.navigate('StorePage');
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        //setPosition(JSON.stringify(pos));
        //console.log('latitude ' + JSON.stringify(pos['coords']['latitude']));
        //console.log('longitude ' + JSON.stringify(pos['coords']['longitude']));
        //console.log(JSON.stringify({ "Location_Latitude": pos["coords"]["latitude"], "Location_Longitude": pos["coords"]["longitude"] }),)
        fetch('http://192.168.8.111:3000/store/address', {
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
              console.log(err);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {timeout: 2000, maximumAge: 3600000},
    );
  };
  return (
    <View>
      <ScrollView>
        <SignHeader
          text="Stores"
          onPress={() => navigation.navigate('Home_noStorePage')}
        />
        <View>
          <Text style={styles.text}>
            Your location address is {'\n'} {position}
          </Text>
          <Text style={styles.text}>Choose the store you are shopping at</Text>
        </View>
        <View style={styles.itemsContainer}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => userChoice(JSON.stringify(1))}>
            <View style={styles.itemInfo}>
              <Text>logo</Text>
              <Text style={styles.itemText}>click here</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 10,
    fontFamily: 'Nunito-Bold',
    color: '#212429',
    fontSize: 16,
  },
  itemsContainer: {
    //marginVertical: 10,
    marginHorizontal: 10,
    //justifyContent: 'space-between',
  },
  item: {
    height: 65,
    width: '100%',
    backgroundColor: '#F5F5F9',
    borderColor: '#E7E7EB',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    //elevation: 4, // is it a shadow ??
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  itemInfo: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
  },
  itemText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 17,
    color: '#212429',
    paddingLeft: 15,
  },
});
export default StoresMenu;
