import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

// import components
import colors from '../assets/colors/Colors';
import SignHeader from '../Components/SignHeader';
import LongButton from '../Components/LongButton';

function UserCart() {
  //parameters
  const navigation = useNavigation();
  const [token, setToken] = useState('');

  const [cartProducts, setCartProducts] = useState([]);
  let [cartTotal, setcartTotal] = useState();
  const [checkoutEnabled, setCheckoutEnabled] = useState(false);

  //functions

  //get user Token(user is signedup/in), other wise is null
  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (!value.match(/null/)) {
          setToken(JSON.parse(value));
          console.log('token is not null,', value);
        } else {
          setToken(JSON.parse(null));
          console.log('token is null,', value);
        }
      } catch (e) {
        console.error('error', e);
      }
    };
    getToken();
  }, []);

  //get products user added it to cart from storage
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('CartData');
        if (value !== null) {
          //console.warn('cart is not empty', cartProducts.length);
          setCartProducts(JSON.parse(value));
          if (cartProducts.length === 0) {
            setCheckoutEnabled(false);
          } else {
            setCheckoutEnabled(true);
          }
          //console.warn('cart is not empty', JSON.parse(value));
        } else {
          console.log('cart is empty', value);
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, [cartProducts]);

  //calculate total price for cart
  useEffect(() => {
    const totalCartPrice = async () => {
      // if type == false prod doesn't have sale price
      // if type == false prod doesn't have sale price
      const cartData = cartProducts;
      var total = 0;
      for (var i = 0; i < cartData.length; i++) {
        if (
          Number(cartData[i].product.sellPrice) ===
          Number(cartData[i].product.price)
        ) {
          total +=
            Number(cartData[i].product.price) * Number(cartData[i].quant);
        } else if (
          Number(cartData[i].product.sellPrice) <
          Number(cartData[i].product.price)
        ) {
          total +=
            Number(cartData[i].product.sellPrice) * Number(cartData[i].quant);
        }
      }
      setcartTotal(total);
      //console.warn('total is ', total);
    };
    totalCartPrice();
  }, [cartProducts]);

  //changing quantity for each item in cart
  const ChangeQuan = async (i, type) => {
    //console.log('id is', id);
    const cartData = cartProducts;
    //let prod = cartProducts.find(data => data.product.id === id);
    //let prod = cartData[i].product;
    //console.log('prod ', prod);
    let currentquant = cartData[i].quant;
    //console.warn('current quant ', currentquant);
    if (type === true) {
      //console.log('should increase');
      let newquant = currentquant + 1;
      cartData[i].quant = newquant;
      setCartProducts(cartData);
      //console.warn('new quant ', cartData[i].quant);
      try {
        await AsyncStorage.setItem('CartData', JSON.stringify(cartData));
        //console.warn('update saved!');
      } catch (error) {
        //console.warn('update error,', error);
      }
    } else if (type === false && currentquant >= 2) {
      //console.log('should decrease');
      let newquant = currentquant - 1;
      cartData[i].quant = newquant;
      setCartProducts(cartData);
      //console.warn('new quant ', cartData[i].quant);
      try {
        await AsyncStorage.setItem('CartData', JSON.stringify(cartData));
        //console.warn('update saved!');
      } catch (error) {
        //console.warn('update error,', error);
      }
    } else if (
      (type === false && currentquant === 1) ||
      cartData.lenght === 0
    ) {
      console.log('should delete');
      let deleted = cartData.splice(i, 1);
      //console.warn('deleted prod ', deleted);
      try {
        await AsyncStorage.setItem('CartData', JSON.stringify(cartData));
        //console.warn('update saved!');
      } catch (error) {
        //console.warn('update error,', error);
      }
    }
  };

  //when user clicks checkout 1. check is we have token(user is signedup/in) >> 2.data is saved in storage
  const setData = async () => {
    if (token === null) {
      try {
        Alert.alert('Warning', 'Please SignUp/In to checkout ', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              const purchase = {
                products: cartProducts,
                total: cartTotal,
              };
              try {
                AsyncStorage.setItem('PurchaseData', JSON.stringify(purchase));
                console.log('purchase data saved');
                navigation.navigate('CheckoutPage');
              } catch (e) {
                console.error('purchase data not saved');
              }
              navigation.navigate('SignUpPage');
            },
          },
        ]);
      } catch (e) {
        console.error(e);
      }
    } else {
      console.log('user is autherized');
      const purchase = {
        products: cartProducts,
        total: cartTotal,
      };
      try {
        AsyncStorage.setItem('PurchaseData', JSON.stringify(purchase));
        //console.warn('purchase data saved');
        navigation.navigate('CheckoutPage');
      } catch (e) {
        console.error('purchase data not saved');
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      {/**header */}
      <SignHeader
        text="Cart"
        onPress={() => navigation.navigate('StorePage')}
      />
      <View
        style={{
          flex: 4.5,
          paddingTop: 9,
          backgroundColor: '#F4F4F8',
        }}>
        {/**if user has no products in cart show message, if there is products show them*/}
        <ScrollView>
          {cartProducts.length === 0 ? (
            <View style={styles.warningContainer}>
              <MaterialCommunityIcons
                name="alert-circle"
                size={160}
                color="#c4c4c4"
              />
              <Text style={styles.text}>Your cart is empty</Text>
            </View>
          ) : (
            cartProducts.map((item, i) => {
              return (
                <View key={item.product.id} style={styles.listContainer}>
                  <View style={styles.productContainer}>
                    <View style={styles.name__size_priceContainer}>
                      <View style={styles.name_sizeContainer}>
                        <Image
                          style={{width: 40, height: 40, marginRight: 9}}
                          source={{
                            uri:
                              'http://192.168.8.111:3000//' +
                              item.product.image.replace(/\\/g, '//'),
                          }}
                        />
                        <Text style={styles.name}>{item.product.name}</Text>
                      </View>
                      <View style={styles.priceContainer}>
                        <Text
                          style={[
                            Number(item.product.sellPrice) <
                            Number(item.product.price)
                              ? styles.oldPrice
                              : styles.sellPrice,
                          ]}>
                          SAR {item.product.price}
                        </Text>
                        <Text style={styles.sellPrice}>
                          {Number(item.product.sellPrice) ===
                          Number(item.product.price)
                            ? ' '
                            : 'SAR ' + item.product.sellPrice}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: '#E7E7EB',
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                    />
                    <View style={styles.quant_totalContainer}>
                      <View style={styles.quantCounter}>
                        <TouchableOpacity
                          style={styles.plusMinusButtons}
                          onPress={() => ChangeQuan(i, false)}>
                          <Feather name="minus" size={20} color="#484038" />
                        </TouchableOpacity>
                        <Text style={styles.quantText}>{item.quant}</Text>
                        <TouchableOpacity
                          style={styles.plusMinusButtons}
                          onPress={() => ChangeQuan(i, true)}>
                          <Feather name="plus" size={20} color="#484038" />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.itemTotal}>
                        {item.product.sellPrice === undefined
                          ? 'SAR ' + item.product.price * item.quant
                          : 'SAR ' + item.product.sellPrice * item.quant}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
      {/**checkout button, total cart*/}
      <View style={styles.checkoutContainer}>
        <View style={styles.totalCartContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalCartText}>SAR {cartTotal}</Text>
        </View>
        <TouchableOpacity
          style={
            checkoutEnabled ? styles.buttonActivated : styles.buttonUnactivated
          }
          onPress={() => setData()}
          disabled={!checkoutEnabled}>
          <Text style={styles.buttonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default UserCart;

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
  productContainer: {
    backgroundColor: 'white',
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 10,
    width: '100%',
    //height: '100%',
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
  name__size_priceContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name_sizeContainer: {
    flexDirection: 'row',
  },
  name: {
    fontFamily: 'Nunito-Bold',
    color: '#212429',
    fontSize: 16,
  },
  size: {
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
  },
  priceContainer: {
    //add if needed
  },
  defaultPrice: {
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
  },
  oldPrice: {
    fontFamily: 'Nunito-Regular',
    color: 'grey',
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  sellPrice: {
    fontFamily: 'Nunito-SemiBold',
    color: '#212429',
    fontSize: 16,
  },
  quant_totalContainer: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantCounter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantText: {
    paddingHorizontal: 10,
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
  },
  plusMinusButtons: {
    backgroundColor: '#FFEB83',
    width: 25,
    height: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTotal: {
    fontFamily: 'Nunito-SemiBold',
    color: colors.blue,
    fontSize: 16,
  },
  checkoutContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1.2,
    borderColor: '#E7E7EB',
  },
  totalCartContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonActivated: {
    backgroundColor: '#FFEB83',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  buttonUnactivated: {
    backgroundColor: colors.gray2,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    fontFamily: 'Nunito-Bold',
    color: '#484038',
    //fontWeight: '700',
    fontSize: 17,
  },
  totalText: {
    fontFamily: 'Nunito-Bold',
    color: '#212429',
    fontSize: 17,
  },
  totalCartText: {
    fontFamily: 'Nunito-SemiBold',
    color: colors.blue,
    fontSize: 17,
  },
});
