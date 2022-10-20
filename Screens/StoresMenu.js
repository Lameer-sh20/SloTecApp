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
import colors from '../assets/colors/Colors';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {REACT_APP_address} from '@env';
import SignHeader from '../Components/SignHeader';

function StoresMenu() {
  const navigation = useNavigation();
  const [position, setPosition] = useState('');
  const [storeList, setStoreList] = useState([]);

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
    getCurrentPosition();
  }, [position]);

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
            const store = JSON.parse(JSON.stringify(data));
            console.log('store is', store.storeList);
            setStoreList(store.storeList);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      });
    };
    getStores();
  }, [position]);

  const userChoice = async (id, storename) => {
    //console.error('storeid ', id);
    //console.error('storename ', storename);

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
        console.log('products are ', StoreData);
        try {
          AsyncStorage.setItem('StoreData', JSON.stringify(StoreData));
          console.warn('storedata are saved!');
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
    <View>
      <SignHeader
        text="Stores"
        onPress={() => navigation.navigate('Home_noStorePage')}
      />
      <ScrollView>
        <View>
          <Text style={styles.text}>Your location address is</Text>
          <Text style={styles.locationText}>{position}</Text>
          <Text style={styles.text}>Choose the store you are shopping at</Text>
        </View>
        <View style={styles.itemsContainer}>
          {storeList.map((item, i) => {
            return (
              <TouchableOpacity
                style={styles.storeOption}
                onPress={() => userChoice(JSON.stringify(1), item.name)}>
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
            );
          })}
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
  locationText: {
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Nunito-SemiBold',
    color: '#212429',
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
    borderColor: '#E7E7EB',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    //elevation: 4, // is it a shadow ??
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
    fontSize: 17,
    color: '#212429',
    paddingLeft: 15,
  },
});
export default StoresMenu;

// const getStoreProducts = () => {
//   fetch('http:/192.168.8.111:3000/product/StoreProducts', {
//     method: 'POST', // or 'PUT'
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({storeId: JSON.stringify(1)}),
//   })
//     .then(response => response.json())
//     .then(data => {
//       //const store = JSON.parse(JSON.stringify(data));
//       console.log('products are ', data.Products);
//       //setStoreList(store.storeList);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// };

{
  /* <View style={styles.name_sizeContainer}>
  <Image
    style={{width: 40, height: 40, marginRight: 9}}
    source={{
      uri: 'http://192.168.8.111:3000//' + item.logo.replace(/\\/g, '//'),
    }}
  />
  <Text style={styles.name}>
    {'http://192.168.8.111:3000//' + item.logo.replace(/\\/g, '//')}
  </Text>
  <Text style={styles.name}>{item.name}</Text>
</View>; */
}

//const [storeId, setStoreId] = useState('');
// const products = [
//   {
//     id: '1',
//     name: 'apple',
//     price: '10',
//     saleprice: '9',
//     info: 'it is good',

//     uri: 'https://purepng.com/public/uploads/large/purepng.com-fresh-applefoodsweettastyhealthyfruitappleleaf-981524677946vfurf.png',
//   },
//   {
//     id: '2',
//     name: 'orange',
//     price: '15',
//     saleprice: '15',
//     info: 'it is good',
//     uri: 'https://purepng.com/public/uploads/large/purepng.com-orangeorangefruitfoodtastydeliciousorangecolor-331522582483ulajt.png',
//   },
//   {
//     id: '3',
//     name: 'carrot',
//     price: '20',
//     saleprice: '19.5',
//     info: 'it is good',

//     uri: 'https://i.pinimg.com/originals/bb/b7/f3/bbb7f3bb0fe59ee186ea8b5b579c84be.png',
//   },
//   {
//     id: '4',
//     name: 'melon',
//     price: '25',
//     saleprice: '25',

//     info: 'it is good',

//     uri: 'https://image.similarpng.com/very-thumbnail/2021/01/Watermelon-fruit-is-sweet-on-transparent-background-PNG.png',
//   },
//   {
//     id: '5',
//     name: 'mango',
//     price: '30',
//     saleprice: '25',

//     info: 'it is good',

//     uri: 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c15d.png',
//   },
//   {
//     id: '6',
//     name: 'kiwi',
//     price: '35',
//     saleprice: '35',
//     info: 'it is good',
//     uri: 'https://toppng.com/uploads/preview/kiwi-fruit-11526058601mhbdehacwr.png',
//   },
//   {
//     id: '7',
//     name: 'blueberry',
//     price: '40',
//     saleprice: '40',

//     info: 'it is good',
//     uri: 'https://www.pngimages.in/uploads/png-thumb/Blueberries_images_png_HD_new.png',
//   },
// ];
