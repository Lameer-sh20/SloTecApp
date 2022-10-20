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

import colors from '../assets/colors/Colors';

function ProductPage({navigation, route}) {
  //params
  let [quantity, setQuantity] = useState(1);
  const [cartItem, setcartItem] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);

  let chosenProduct = route.params.product;
  //let storeId = route.params.storeid;

  //functions
  useEffect(() => {
    getData();
  }, [quantity, cartItem]);

  useEffect(() => {
    const findSimilar = () => {
      fetch('http:/192.168.8.111:3000/product/FindSimilar', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeId: chosenProduct.storeId,
          categoryId: chosenProduct.categoryId,
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
  }, [chosenProduct.storeId, chosenProduct.categoryId]);

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

  // add to cart even if product exists !!
  // const addToCart = async data => {
  //   //console.warn('new !!!', data.id);
  //   const cartProduct = {
  //     product: data,
  //     quant: quantity,
  //   };
  //   let prod = cartItem.find(item => item.product.id === data.id);

  //   // const cartProduct = [
  //   //   {
  //   //     product: data,
  //   //     quant: quantity,
  //   //   },
  //   // ];
  //   // try {
  //   //   await AsyncStorage.setItem('cart', JSON.stringify(cartProduct));
  //   //   console.warn('product saved!');
  //   // } catch (error) {
  //   //   console.warn('product error,', error);
  //   // }
  //   await AsyncStorage.getItem('CartData')
  //     .then(res => {
  //       if (res != null) {
  //         //console.warn('is not null', res);
  //         const newcart = JSON.parse(res);
  //         //console.warn('new product', cartProduct);
  //         newcart.push(cartProduct);
  //         //console.warn('add to cart', newcart);
  //         AsyncStorage.setItem('CartData', JSON.stringify(newcart));
  //         console.warn('product saved!');
  //       } else {
  //         console.warn('cart is empty');
  //         const newcart = [];
  //         newcart.push(cartProduct);
  //         AsyncStorage.setItem('CartData', JSON.stringify(newcart));
  //       }
  //     })
  //     .catch(err => {
  //       console.warn(err);
  //     });
  //   // try {
  //   //   if (cart !== null) {
  //   //     console.warn('cart has items');
  //   //     const newcart = JSON.parse(cart);
  //   //     newcart.push(cartProduct);
  //   //     await AsyncStorage.setItem('cart', JSON.stringify(newcart));
  //   //     console.warn('cart is not null');
  //   //   } else {
  //   //     console.warn('cart is empty');
  //   //   }
  //   // } catch (e) {
  //   //   console.warn('cant add to cart', e);
  //   // }
  //   ////////////////////
  //   // try {
  //   //   const value = JSON.parse(JSON.stringify({data}));
  //   //   console.log('cant store', value);
  //   //   setcartItem(value(data));
  //   // } catch (e) {
  //   //   console.log('cant store', e);
  //   // }

  //   //console.warn(data);
  //   //const cartProduct = {product: data, quant: quantity};
  //   //const existingProducts = await AsyncStorage.getItem('Cart');
  //   // let newProduct = JSON.parse(existingProducts);
  //   // if (!newProduct) {
  //   //   newProduct = [];
  //   //   newProduct.push(cartProduct);
  //   // }
  //   // await AsyncStorage.setItem('Cart', JSON.stringify(newProduct))
  //   //   .then(() => {
  //   //     console.log('It was saved successfully');
  //   //   })
  //   //   .catch(() => {
  //   //     console.log('There was an error saving the product');
  //   //   });
  //   // try {
  //   //   await AsyncStorage.getItem('Cart').then(cart => {
  //   //     if (cart != null) {
  //   //       console.warn('cart has items');
  //   //       const value = JSON.parse(cart);
  //   //       value.push(data);
  //   //       AsyncStorage.setItem('UserCart', JSON.stringify(value));
  //   //       console.warn('cart is not null');
  //   //     } else {
  //   //       console.warn('cart is empty');
  //   //       const value = [];
  //   //       value.push(data);
  //   //       AsyncStorage.setItem('Cart', JSON.stringify(value));
  //   //       console.warn('cart was null');
  //   //     }
  //   //     console.warn('check successfully');
  //   //   });
  //   // } catch (error) {
  //   //   console.warn('error,', error);
  //   // }
  // };

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

  const getData = async () => {
    try {
      //const value = await AsyncStorage.clear();
      const value = await AsyncStorage.getItem('CartData');
      //const prod = await AsyncStorage.getItem('chosenProduct');
      if (value !== null) {
        setcartItem(JSON.parse(value));
        // const cartData = cartItem;
        //console.warn('got it', JSON.parse(value).product);
        //console.warn('chosen is', JSON.parse(prod));
      } else {
        //console.warn('nothing', value);
      }
    } catch (e) {
      // error reading value
    }
    //console.log('product is ', cartItem);
  };
  return (
    <View style={{flex: 1}}>
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
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.prodImageContainer}>
          <Image
            style={{width: 200, height: 200}}
            resizeMode="contain"
            source={{
              uri:
                'http://192.168.8.111:3000//' +
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
                    Number(chosenProduct.sellPrice) <
                    Number(chosenProduct.price)
                      ? styles.oldPrice
                      : styles.sellPrice,
                  ]}>
                  SAR {chosenProduct.price}
                </Text>
                <Text style={styles.sellPrice}>
                  {Number(chosenProduct.sellPrice) ===
                  Number(chosenProduct.price)
                    ? ' '
                    : 'SAR ' + chosenProduct.sellPrice}
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

        <Text style={styles.similarText}>Similar Products</Text>
        <ScrollView horizontal={true}>
          <View
            style={{flex: 3, backgroundColor: 'white', flexDirection: 'row'}}>
            {similarProducts.map((item, i) => {
              return (
                <TouchableOpacity>
                  <View style={styles.similarProduct}>
                    <View style={styles.similarImageContainer}>
                      <Image
                        style={styles.similarProductImage}
                        resizeMode="contain"
                        source={{
                          uri:
                            'http://192.168.8.111:3000//' +
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
                          Number(item.sellprice) < Number(item.price)
                            ? styles.similarOldPrice
                            : styles.similarSellPrice,
                        ]}>
                        SAR {item.price}
                      </Text>
                      <Text style={styles.similarSellPrice}>
                        {Number(item.sellPrice) === Number(item.price)
                          ? ' '
                          : 'SAR ' + item.sellPrice}
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
    fontSize: 20,
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
  oldPrice: {
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  sellPrice: {
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
    fontSize: 15,
  },
  similarText: {
    padding: 16,
    fontFamily: 'Nunito-Bold',
    color: '#212429',
    fontSize: 20,
  },
  similarProductsContainer: {
    backgroundColor: 'red',
  },
  similarProduct: {
    backgroundColor: '#ffffff',
    width: 150,
    height: 190,
    borderWidth: 1.2,
    borderRadius: 15,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    borderColor: '#E7E7EB',
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
    fontFamily: 'Nunito-Bold',
    color: '#212429',
    fontSize: 13,
    paddingVertical: 3,
  },
  similarOldPrice: {
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 13,
    textDecorationLine: 'line-through',
  },
  similarSellPrice: {
    fontFamily: 'Nunito-Bold',
    color: colors.blue,
    fontSize: 13,
  },
});
