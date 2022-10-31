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
import colors from '../assets/colors/Colors';
import {REACT_APP_address} from '@env';

function ProductPage({navigation, route}) {
  //params
  let [quantity, setQuantity] = useState(1);
  const [cartItem, setcartItem] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);

  let chosenProduct = route.params.product;

  //functions
  useEffect(() => {
    const getData = async () => {
      try {
        //const value = await AsyncStorage.clear();
        const value = await AsyncStorage.getItem('CartData');
        //const prod = await AsyncStorage.getItem('chosenProduct');
        if (value !== null) {
          setcartItem(JSON.parse(value));
          //console.warn('got it', JSON.parse(value).product);
        } else {
          console.log('cart is empty', value);
        }
      } catch (e) {
        console.error('no CartData in storage');
      }
    };
    getData();
  }, [quantity, cartItem]);

  //find similar products
  useEffect(() => {
    const findSimilar = () => {
      fetch('http:/' + REACT_APP_address + ':3000/product/FindSimilar', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeId: chosenProduct.storeId,
          categoryId: chosenProduct.categoryId,
          id: chosenProduct.id,
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
  }, [chosenProduct.storeId, chosenProduct.categoryId, chosenProduct.id]);

  //to increment and decreament quantity
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
      //console.log('no less than zero', quantity);
    }
  };

  //adding product to cart
  const addToCart1 = async data => {
    //await AsyncStorage.getItem('CartData').clear();
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
      };
      cartItem.push(cartProduct);
      //console.warn('add to cart', cartItem);
      AsyncStorage.setItem('CartData', JSON.stringify(cartItem));
      Toast.show({
        text1: 'Product is Added to cart',
        visibilityTime: 4000,
      });
      //console.warn('product saved!');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.topButtonsContainer}>
        {/**header */}
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
      {/**product information*/}
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.prodImageContainer}>
          <Image
            style={{width: 200, height: 200}}
            resizeMode="contain"
            source={{
              uri:
                'http:/' +
                REACT_APP_address +
                ':3000//' +
                chosenProduct.image.replace(/\\/g, '//'),
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
            <Text style={styles.name}>{chosenProduct.name}</Text>
            <View style={styles.size_priceContainer}>
              <View style={styles.priceContainer}>
                <Text
                  style={[
                    Number(chosenProduct.sellPrice) !==
                    Number(chosenProduct.price)
                      ? styles.oldPrice
                      : styles.sellPrice,
                  ]}>
                  {chosenProduct.price * quantity} SAR
                </Text>
                <Text style={styles.sellPrice}>
                  {Number(chosenProduct.sellPrice) ===
                  Number(chosenProduct.price)
                    ? ' '
                    : chosenProduct.sellPrice * quantity + ' SAR'}
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
              onPress={() => addToCart1(chosenProduct)}
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
            <Text style={styles.infoText}>{chosenProduct.description}</Text>
          </View>
        </View>
        <View style={styles.line} />
        {/**similar product*/}
        <Text style={styles.similarText}>Similar Products</Text>
        <ScrollView horizontal={true}>
          <View
            style={{flex: 3, backgroundColor: 'white', flexDirection: 'row'}}>
            {similarProducts.map((item, i) => {
              return (
                <TouchableOpacity
                  key={item.id}
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
                    {/**line */}
                    <View style={{height: 1.2, backgroundColor: '#E7E7EB'}} />
                    {/**info */}
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

export default ProductPage;

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
