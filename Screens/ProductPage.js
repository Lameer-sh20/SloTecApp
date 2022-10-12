import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';

import colors from '../assets/colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

function ProductPage({navigation, route}) {
  let [quantity, setQuantity] = useState(1);
  const [cartItem, setcartItem] = useState([]);

  //const route = useRoute();
  //const {itemId} = route.params;
  const {item} = route.params;
  const itemInfo = [];
  itemInfo.push(item);

  const increment = () => {
    const value = (quantity += 1);
    console.log(quantity);
    setQuantity(value);
  };
  const decremeant = () => {
    if (quantity > 1) {
      const value = (quantity -= 1);
      console.log('decrement', quantity);
      setQuantity(value);
    } else {
      //setQuantity(value);
      console.log('no less than zero', quantity);
    }
  };
  const addToCart = async data => {
    const cartProduct = {
      product: data,
      quant: quantity,
    };
    // const cartProduct = [
    //   {
    //     product: data,
    //     quant: quantity,
    //   },
    // ];
    // try {
    //   await AsyncStorage.setItem('cart', JSON.stringify(cartProduct));
    //   console.warn('product saved!');
    // } catch (error) {
    //   console.warn('product error,', error);
    // }
    await AsyncStorage.getItem('cart')
      .then(res => {
        if (res != null) {
          //console.warn('is not null', res);
          const newcart = JSON.parse(res);
          //console.warn('newcart', cartProduct);
          newcart.push(cartProduct);
          //console.warn('add to newcart', newcart);
          AsyncStorage.setItem('cart', JSON.stringify(newcart));
          console.warn('product saved!');
        } else {
          console.warn('cart is empty');
          const newcart = [];
          newcart.push(cartProduct);
          AsyncStorage.setItem('cart', JSON.stringify(newcart));
        }
        console.warn('Add Cart');
      })
      .catch(err => {
        console.warn(err);
      });
    // try {
    //   if (cart !== null) {
    //     console.warn('cart has items');
    //     const newcart = JSON.parse(cart);
    //     newcart.push(cartProduct);
    //     await AsyncStorage.setItem('cart', JSON.stringify(newcart));
    //     console.warn('cart is not null');
    //   } else {
    //     console.warn('cart is empty');
    //   }
    // } catch (e) {
    //   console.warn('cant add to cart', e);
    // }
    ////////////////////
    // try {
    //   const value = JSON.parse(JSON.stringify({data}));
    //   console.log('cant store', value);
    //   setcartItem(value(data));
    // } catch (e) {
    //   console.log('cant store', e);
    // }

    //console.warn(data);
    //const cartProduct = {product: data, quant: quantity};
    //const existingProducts = await AsyncStorage.getItem('Cart');
    // let newProduct = JSON.parse(existingProducts);
    // if (!newProduct) {
    //   newProduct = [];
    //   newProduct.push(cartProduct);
    // }
    // await AsyncStorage.setItem('Cart', JSON.stringify(newProduct))
    //   .then(() => {
    //     console.log('It was saved successfully');
    //   })
    //   .catch(() => {
    //     console.log('There was an error saving the product');
    //   });
    // try {
    //   await AsyncStorage.getItem('Cart').then(cart => {
    //     if (cart != null) {
    //       console.warn('cart has items');
    //       const value = JSON.parse(cart);
    //       value.push(data);
    //       AsyncStorage.setItem('UserCart', JSON.stringify(value));
    //       console.warn('cart is not null');
    //     } else {
    //       console.warn('cart is empty');
    //       const value = [];
    //       value.push(data);
    //       AsyncStorage.setItem('Cart', JSON.stringify(value));
    //       console.warn('cart was null');
    //     }
    //     console.warn('check successfully');
    //   });
    // } catch (error) {
    //   console.warn('error,', error);
    // }
  };
  const getData = async () => {
    try {
      //const value = await AsyncStorage.clear();
      const value = await AsyncStorage.getItem('cart');
      if (value !== null) {
        console.warn('got it', JSON.parse(value));
      } else {
        console.warn('nothing', value);
      }
    } catch (e) {
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
          <Image style={{width: 64, height: 64}} source={{uri: item.uri}} />
        </View>
        {/** product info */}
        <View style={styles.productContainer}>
          {/** product name & price */}
          <View style={styles.name_price}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.size_priceContainer}>
              <Text style={styles.size}>xxxml</Text>
              <View style={styles.priceContainer}>
                <Text
                  style={[
                    styles.defaultPrice,
                    item.saleprice === undefined
                      ? styles.salePrice
                      : styles.oldPrice,
                  ]}>
                  SAR {item.price}
                </Text>
                <Text style={styles.salePrice}>
                  {item.saleprice === undefined ? ' ' : 'SAR ' + item.saleprice}
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
              onPress={() => addToCart(item)}
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
            <Text>{item.info}</Text>
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

export default ProductPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topButtonsContainer: {
    //flex: 0.5,
    width: '100%',
    height: '8%',
    //backgroundColor: 'red',
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
  },
  name_price: {
    paddingHorizontal: 16,
    paddingTop: 16,
    //alignItems: 'center',
    flexDirection: 'column',
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
