import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';

import {REACT_APP_address} from '@env';
import colors from '../assets/colors/Colors';

function ScannedProductPage({navigation, route}) {
  let [quantity, setQuantity] = useState(1);
  const [cartItem, setcartItem] = useState([]);

  const [barcodeNum, setbarcodeNum] = useState('');
  const [storeId, setstoreId] = useState('');
  const [scannedProduct, setScannedProduct] = useState([]);

  //console.log('params', route.params);
  //console.log('params id', storeId);
  //const itemInfo = [];
  //itemInfo.push(item);

  //functions
  useEffect(() => {
    getData();
  }, [quantity, cartItem]);

  useEffect(() => {
    const submitData = () => {
      console.warn('in submitt data');
      fetch('http://:3000/product/FindProductByBarcode', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({barcodeNum, storeId}),
      })
        .then(response => response.json())
        .then(data => {
          //console.log('respond is:', typeof data.Product);
          setScannedProduct(JSON.parse(JSON.stringify(data.Product)));
        })
        .catch(error => {
          //console.error('Error here :', error);
        });
      //console.warn('in submitt data2');
    };
    submitData();
  }, [barcodeNum, storeId]);

  const increment = () => {
    const value = (quantity += 1);
    //console.log('increament', quantity);
    setQuantity(value);
  };
  const decremeant = () => {
    if (quantity > 1) {
      const value = (quantity -= 1);
      //console.log('decrement', quantity);
      setQuantity(value);
    } else {
      //setQuantity(value);
      console.log('no less than zero', quantity);
    }
  };

  const addToCart1 = async data => {
    console.error('before add', data);
    let prod = cartItem.find(pro => pro.product.id === data.id);
    try {
      if (prod.product.id !== undefined) {
        //console.error('prod found ', prod);
        Toast.show({
          type: 'error',
          text1: 'Product is already in cart ',
          visibilityTime: 4000,
        });
      } else {
        console.error('should not be here ');
      }
    } catch (r) {
      //console.error('prod not found ', r);
      const cartProduct = {
        product: data,
        quant: quantity,
        storeid: storeId,
      };
      cartItem.push(cartProduct);
      //console.warn('add to cart', newcart);
      AsyncStorage.setItem('CartData', JSON.stringify(cartItem));
      console.warn('product saved!');
    }
  };

  const getData = async () => {
    try {
      //const value = await AsyncStorage.clear();
      const value = await AsyncStorage.getItem('CartData');
      const barcode = await AsyncStorage.getItem('Barcode');
      const storedata = await AsyncStorage.getItem('StoreData');
      if (value !== null || barcode !== null || storedata !== null) {
        setcartItem(JSON.parse(value));
        setbarcodeNum(barcode);
        setstoreId(JSON.parse(storedata).storeID);
        //console.warn('store id ', JSON.parse(storedata).storeID);
        //console.warn('barcode is  ', barcode);
        // const cartData = cartItem;
        //console.warn('got it', JSON.parse(value).product);
        //console.warn('chosen is', JSON.parse(prod));
      } else {
        //console.warn('nothing', value);
      }
    } catch (e) {
      console.error('Error while getting :', e);
      // error reading value
    }
    //console.log('product is ', cartItem);
  };

  return (
    <View style={styles.container}>
      {/** arrow and cart button */}
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity
          style={styles.arrowContainer}
          onPress={() => navigation.navigate('StorePage')}>
          <Ionicons name="ios-chevron-back-outline" size={30} color="#484038" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserCart')}
          style={styles.cartContainer}>
          <MaterialCommunityIcons
            name="cart-variant"
            size={25}
            color="#484038"
          />
        </TouchableOpacity>
      </View>
      {/** product */}
      {/** product image */}
      <ScrollView style={{backgroundColor: '#E7E7EB'}}>
        <View style={styles.prodImageContainer}>
          {/* <Image
            style={{width: 64, height: 64}}
            source={{uri: scannedProduct.uri}}
          /> */}
          <Toast
            ref={ref => {
              Toast.setRef(ref);
            }}
          />
        </View>
        {/** product info */}
        <View style={styles.productContainer}>
          {/** product name & price */}
          <View style={styles.name_price}>
            <Text style={styles.name}>{scannedProduct.name}</Text>
            <View style={styles.size_priceContainer}>
              <View style={styles.priceContainer}>
                <Text
                  style={[
                    Number(scannedProduct.saleprice) <
                    Number(scannedProduct.price)
                      ? styles.oldPrice
                      : styles.salePrice,
                  ]}>
                  SAR {scannedProduct.price}
                </Text>
                <Text style={styles.salePrice}>
                  {Number(scannedProduct.saleprice) ===
                  Number(scannedProduct.price)
                    ? ' '
                    : scannedProduct.saleprice}
                </Text>
              </View>
            </View>
          </View>
          {/** product counter & adding */}
          <View style={styles.quant_add}>
            <View style={styles.quantCounter}>
              <TouchableOpacity
                style={styles.plusMinusButtons}
                onPress={decremeant}>
                <Feather name="minus" size={25} color="#484038" />
              </TouchableOpacity>
              <Text style={styles.quantText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.plusMinusButtons}
                onPress={increment}>
                <Feather name="plus" size={25} color="#484038" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => addToCart1(scannedProduct)}
              style={styles.addToCartContainer}>
              <MaterialCommunityIcons
                name="cart-plus"
                size={25}
                color="#484038"
              />
            </TouchableOpacity>
          </View>
          {/** line */}
          <View style={styles.line} />
          {/** product additional info */}
          <View style={styles.infoText}>
            <Text>{scannedProduct.info}</Text>
          </View>
          {/** line */}
          <View style={styles.line} />
          {/** recomended products */}
          <TouchableOpacity onPress={() => getData()}>
            <Text style={styles.similarText}>Similar Products</Text>
          </TouchableOpacity>
          <Text style={{fontSize: 96}}>
            here should be the recomended products
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default ScannedProductPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topButtonsContainer: {
    //flex: 0.5,
    width: '100%',
    height: '8%',
    backgroundColor: '#E7E7EB',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  arrowContainer: {
    backgroundColor: '#FFEB83',
    width: 35,
    height: 35,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartContainer: {
    backgroundColor: '#FFEB83',
    width: 35,
    height: 35,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prodImageContainer: {
    width: '100%',
    height: '20%',
    backgroundColor: '#E7E7EB',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  productContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderColor: '#E7E7EB',
    borderTopWidth: 1.2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
  },
  name_price: {
    paddingHorizontal: 16,
    paddingTop: 16,
    //alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'Nunito-Bold',
    color: '#212429',
    fontSize: 22,
  },
  size_priceContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  size: {
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
  },
  defaultPrice: {
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
  },
  oldPrice: {
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  salePrice: {
    fontFamily: 'Nunito-Bold',
    color: colors.blue,
    fontSize: 16,
  },
  quantCounter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantText: {
    paddingHorizontal: 10,
    fontFamily: 'Nunito-Bold',
    color: '#212429',
    fontSize: 16,
  },
  quant_add: {
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  plusMinusButtons: {
    backgroundColor: '#FFEB83',
    width: 35,
    height: 35,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartContainer: {
    backgroundColor: '#FFEB83',
    width: '40%',
    height: 35,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#E7E7EB',
    marginLeft: 16,
    marginRight: 16,
  },
  infoText: {
    padding: 16,
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 20,
  },
  similarText: {
    padding: 16,
    fontFamily: 'Nunito-Bold',
    color: '#212429',
    fontSize: 20,
  },
});
