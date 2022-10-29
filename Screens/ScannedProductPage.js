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
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';

//import componants
import {REACT_APP_address} from '@env';
import colors from '../assets/colors/Colors';

function ScannedProductPage({navigation, route}) {
  //params
  let [quantity, setQuantity] = useState(1);
  const [cartItem, setcartItem] = useState([]);

  const [barcodeNum, setbarcodeNum] = useState('');
  const [storeId, setstoreId] = useState('');
  let [scannedProduct, setScannedProduct] = useState([]);
  const [scannedProductimage, setScannedProductimage] = useState('');
  const [scannedProductcategory, setScannedProductcategory] = useState('');
  const [scannedProductstore, setScannedProductstore] = useState('');
  const [scannedProductid, setScannedProductid] = useState('');

  const [similarProducts, setSimilarProducts] = useState([]);

  //functions
  //get barcode, storeid, cart data from storage
  useEffect(() => {
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
        } else {
          console.warn('nothing', value);
        }
      } catch (e) {
        console.error('Error while getting :', e);
      }
    };
    getData();
  }, []);

  //get product by barcode
  useEffect(() => {
    const submitData = () => {
      fetch(
        'http:/' + REACT_APP_address + ':3000/product/FindProductByBarcode',
        {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({barcodeNum, storeId}),
        },
      )
        .then(response => response.json())
        .then(data => {
          setScannedProduct(JSON.parse(JSON.stringify(data.Product)));
          setScannedProductid(JSON.parse(JSON.stringify(data.Product.id)));
          setScannedProductimage(
            JSON.parse(JSON.stringify(data.Product.image)),
          );
          setScannedProductcategory(
            JSON.parse(JSON.stringify(data.Product.categoryId)),
          );
          setScannedProductstore(
            JSON.parse(JSON.stringify(data.Product.storeId)),
          );
        })
        .catch(error => {
          //console.error('Error here :', error);
        });
      //console.warn('in submitt data2');
    };
    submitData();
  }, [barcodeNum, storeId]);

  //find similar product
  useEffect(() => {
    const findSimilar = () => {
      fetch('http:/' + REACT_APP_address + ':3000/product/FindSimilar', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeId: scannedProductstore,
          categoryId: scannedProductcategory,
          id: scannedProductid,
        }),
      })
        .then(response => response.json())
        .then(data => {
          setSimilarProducts(data);
          //console.log('similar products are ', data);
        })
        .catch(error => {
          console.error('can not find similar:', error);
        });
    };
    findSimilar();
  }, [scannedProductstore, scannedProductcategory, scannedProductid]);

  //related to quantity
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

  // adding item to cart
  const addToCart1 = async data => {
    //console.error('before add', data);
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
      console.log('product saved!');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.topButtonsContainer}>
        {/**back and cart buttons */}
        <TouchableOpacity
          style={styles.arrowContainer}
          onPress={() => navigation.navigate('StorePage')}>
          <AntDesign name="left" size={28} color="#484038" />
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
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        {/**scanned product*/}
        <View style={styles.prodImageContainer}>
          <Image
            style={{width: 200, height: 200}}
            resizeMode="contain"
            source={{
              uri:
                'http:/' +
                REACT_APP_address +
                ':3000//' +
                scannedProductimage.replace(/\\/g, '//'),
            }}
          />
          <Toast
            ref={ref => {
              Toast.setRef(ref);
            }}
          />
        </View>
        <View style={styles.productContainer}>
          <View style={styles.name_price}>
            <Text style={styles.name}>{scannedProduct.name}</Text>
            <View style={styles.size_priceContainer}>
              <View style={styles.priceContainer}>
                <Text
                  style={[
                    Number(scannedProduct.sellPrice) !==
                    Number(scannedProduct.price)
                      ? styles.oldPrice
                      : styles.sellPrice,
                  ]}>
                  {scannedProduct.price * quantity} SAR
                </Text>
                <Text style={styles.sellPrice}>
                  {Number(scannedProduct.sellPrice) ===
                  Number(scannedProduct.price)
                    ? ' '
                    : scannedProduct.sellPrice + ' SAR'}
                </Text>
              </View>
            </View>
          </View>
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
          <View style={styles.line} />
          <View>
            <Text style={styles.infoText}>{scannedProduct.description}</Text>
          </View>
        </View>
        <View style={styles.line} />
        {/**similar products*/}
        <Text style={styles.similarText}>Similar Products</Text>
        <ScrollView horizontal={true}>
          <View
            style={{flex: 3, backgroundColor: 'white', flexDirection: 'row'}}>
            {similarProducts.map((item, i) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductPage', {product: item})
                  }>
                  <View style={styles.similarProduct}>
                    <View style={styles.similarImageContainer}>
                      <Image
                        style={styles.similarProductImage}
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

                    <View style={{height: 1.2, backgroundColor: '#E7E7EB'}} />

                    <View style={styles.similarInfoContainer}>
                      <Text style={styles.similarProductName}>{item.name}</Text>
                      <Text
                        style={[
                          Number(item.sellPrice) !== Number(item.price)
                            ? styles.similarOldPrice
                            : styles.similarSellPrice,
                        ]}>
                        {item.price} SAR
                      </Text>
                      <Text style={styles.similarSellPrice}>
                        {Number(item.sellPrice) === Number(item.price)
                          ? ' '
                          : item.sellPrice + ' SAR'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

export default ScannedProductPage;

const styles = StyleSheet.create({
  topButtonsContainer: {
    flex: 0.1,
    //backgroundColor: 'red',
    //backgroundColor: '#E7E7EB',
    width: '100%',
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
    flex: 3,
    //backgroundColor: '#E7E7EB',
    //backgroundColor: 'green',
    width: '100%',
    height: '20%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  productContainer: {
    flex: 3,
    width: '100%',
    //height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderColor: colors.borderColor,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
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
    color: colors.default,
    fontSize: 18,
  },
  size_priceContainer: {
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  size: {
    fontFamily: 'Nunito-Regular',
    color: colors.default,
    fontSize: 16,
  },
  oldPrice: {
    fontFamily: 'Nunito-Regular',
    color: colors.gray2,
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  sellPrice: {
    fontFamily: 'Nunito-SemiBold',
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
    fontFamily: 'Nunito-SemiBold',
    color: colors.default,
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
    backgroundColor: colors.borderColor,
    marginLeft: 16,
    marginRight: 16,
  },
  infoText: {
    padding: 16,
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
  },
  similarText: {
    padding: 16,
    fontFamily: 'Nunito-Bold',
    color: colors.default,
    fontSize: 18,
  },
  similarProduct: {
    backgroundColor: '#ffffff',
    width: 150,
    height: 190,
    borderWidth: 1,
    borderRadius: 15,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    borderColor: colors.borderColor,
    //marginRight: 10,
    //alignItems: 'center',
  },
  similarImageContainer: {
    flex: 3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'green',
    borderRadius: 15,
    width: '95%',
    height: '68%',
  },
  similarProductImage: {
    width: '90%',
    height: '80%',
    //backgroundColor: 'transparent',
  },
  similarInfoContainer: {
    paddingLeft: 9,
    paddingBottom: 5,
  },
  similarProductName: {
    fontFamily: 'Nunito-SemiBold',
    color: colors.default,
    fontSize: 13,
    paddingVertical: 3,
  },
  similarOldPrice: {
    fontFamily: 'Nunito-Regular',
    color: colors.gray2,
    fontSize: 13,
    textDecorationLine: 'line-through',
  },
  similarSellPrice: {
    fontFamily: 'Nunito-SemiBold',
    color: colors.blue,
    fontSize: 13,
  },
});
