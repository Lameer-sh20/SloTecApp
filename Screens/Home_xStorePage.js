import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../assets/colors/Colors';
import {REACT_APP_address} from '@env';
import UserHeader from '../Components/UserHeader';

function Home_xStorePage({navigation}) {
  const [name, setName] = useState('');
  const [storeProducts, setStoreProducts] = useState([]);
  const [storeID, setStoreID] = useState('');
  const [storeName, setStoreName] = useState('');

  //const [productId, setproductId] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const storedata = await AsyncStorage.getItem('StoreData');
      const value = await AsyncStorage.getItem('UserData');
      if (value !== null || storedata !== null) {
        //console.warn(JSON.parse(value).name);
        //console.warn(JSON.parse(storedata));
        //console.warn('store data are ', JSON.parse(storedata));
        setStoreName(JSON.parse(storedata).storeName);
        setStoreProducts(JSON.parse(storedata).storeProducts);
        setStoreID(JSON.parse(storedata).storeID);
        setName(JSON.parse(value).name);
      } else if (storedata == null || value == null) {
        console.warn('store data is null');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const productsMenu = ({item}) => {
    const handleOnPress = () => {
      navigation.navigate('ProductPage', {product: item});
      //const chosenProd = {product: item, storeid: storeID};
      //AsyncStorage.setItem('chosenProduct', JSON.stringify(chosenProd));
      //console.warn('to show is', chosenProd);
    };
    return (
      <TouchableOpacity style={styles.product} onPress={handleOnPress}>
        {/**product image */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.productImage}
            resizeMode="contain"
            source={{
              uri:
                'http:/' +
                REACT_APP_address +
                ':3000//' +
                item.image.replace(/\\/g, '//'),
            }}
          />
        </View>
        {/**line */}
        <View style={{height: 1.2, backgroundColor: '#E7E7EB'}} />
        {/**info */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text
            style={[
              Number(item.sellprice) < Number(item.price)
                ? styles.oldPrice
                : styles.sellPrice,
            ]}>
            SAR {item.price}
          </Text>
          <Text style={styles.sellPrice}>
            {Number(item.sellPrice) === Number(item.price)
              ? ' '
              : 'SAR ' + item.sellPrice}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.pageContainer}>
      <UserHeader name={name} storename={storeName} />
      <View style={styles.Container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Latest Offers</Text>
        </View>
        <View style={styles.menuContainer}>
          {/* {storeProducts.map((item, i) => {
            return (
              <Text style={styles.productName}>
                product name is {item.name}
              </Text>
            );
          })} */}
          <FlatList
            data={storeProducts}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={productsMenu}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  pagecontainer: {
    flex: 1,
  },
  Container: {
    //backgroundColor: '#F4F4F8',
    alignItems: 'center',
  },
  textContainer: {
    height: '5%',
    width: '95%',
    backgroundColor: '#FECD42',
    borderRadius: 15,
    //borderColor: colors.mainYellow,
    //borderWidth: 0.5,

    justifyContent: 'center',
    alignItems: 'center',

    //paddingVertical: 10,
    //paddingHorizontal: 10,
    //marginVertical: 9,
    marginTop: 9,
    marginBottom: 9,
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Nunito-Bold',
  },
  menuContainer: {
    //paddingHorizontal: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: '87%',
    justifyContent: 'space-evenly',
    //alignItems: 'center',
  },
  product: {
    backgroundColor: '#ffffff',
    width: '48%',
    height: 250,
    borderWidth: 1.2,
    borderRadius: 15,
    marginLeft: 5,
    marginBottom: 5,
    borderColor: '#E7E7EB',
    //marginRight: 10,
    //alignItems: 'center',
  },
  imageContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 15,
    width: '95%',
    height: '68%',
  },
  productImage: {
    width: '90%',
    height: '70%',
    backgroundColor: 'transparent',
  },
  infoContainer: {
    paddingLeft: 9,
  },
  productName: {
    fontFamily: 'Nunito-Bold',
    color: '#212429',
    fontSize: 15,
    paddingVertical: 3,
  },
  defaultPrice: {
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 15,
  },
  oldPrice: {
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 15,
    textDecorationLine: 'line-through',
  },
  sellPrice: {
    fontFamily: 'Nunito-Bold',
    color: colors.blue,
    fontSize: 15,
  },
});
export default Home_xStorePage;
