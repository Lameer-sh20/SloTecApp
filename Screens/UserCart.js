import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

// import components
import colors from '../assets/colors/Colors';
import SignHeader from '../Components/SignHeader';
import LongButton from '../Components/LongButton';

function UserCart() {
  const navigation = useNavigation();
  //parameters
  const [cartProducts, setCartProducts] = useState([]);
  let [status, setStatus] = useState('');
  let [cartTotal, setcartTotal] = useState();

  //functions
  useEffect(() => {
    getData();
    totalCartPrice();
  });

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('CartData');
      if (value !== null) {
        //console.warn('cart is not empty', JSON.parse(value));
        setCartProducts(JSON.parse(value));
        setStatus(JSON.stringify(1));
      } else {
        //console.warn('cart is empty', value);
        setStatus(JSON.stringify(0));
      }
    } catch (e) {
      // error reading value
    }
  };

  // const changeQuantity = async (id, type) => {
  //   //console.log('id is', id);
  //   const dataCar = cartProducts;
  //   //let prod = cartProducts.find(data => data.product.id === id);
  //   let currentquant = dataCar[id - 1].quant;
  //   //console.error('quant ', currentquant);
  //   //let prod = dataCar[id - 1].product;
  //   //console.error('prod ', prod);
  //   if (type === true) {
  //     console.log('should increase');
  //     let newquant = currentquant + 1;
  //     dataCar[id - 1].quant = newquant;
  //     setCartProducts(dataCar);
  //     try {
  //       await AsyncStorage.setItem('CartData', JSON.stringify(dataCar));
  //       //console.warn('update saved!');
  //     } catch (error) {
  //       //console.warn('update error,', error);
  //     }
  //   } else if (type === false && currentquant >= 2) {
  //     console.log('should decrease');
  //     let newquant = currentquant - 1;
  //     dataCar[id - 1].quant = newquant;
  //     setCartProducts(dataCar);
  //     try {
  //       await AsyncStorage.setItem('CartData', JSON.stringify(dataCar));
  //       //console.warn('update saved!');
  //     } catch (error) {
  //       //console.warn('update error,', error);
  //     }
  //   } else if (type === false && currentquant === 1) {
  //     console.log('should delete');
  //     let deleted = dataCar.splice(id - 1, 1);
  //     console.error('deleted prod ', deleted);
  //     try {
  //       await AsyncStorage.setItem('cart', JSON.stringify(dataCar));
  //       //console.warn('update saved!');
  //     } catch (error) {
  //       //console.warn('update error,', error);
  //     }
  //   }
  // };

  // const cartList = ({item}) => {
  //   return (
  //     <View style={styles.listContainer}>
  //       {/**info */}
  //       <View style={styles.productContainer}>
  //         <View style={styles.name__size_priceContainer}>
  //           <View style={styles.name_sizeContainer}>
  //             <Text style={styles.name}>
  //               {item.product.name} and {item.product.id}
  //             </Text>
  //             <Text style={styles.size}>size</Text>
  //           </View>
  //           <View style={styles.priceContainer}>
  //             <Text
  //               style={[
  //                 styles.defaultPrice,
  //                 item.product.saleprice === undefined
  //                   ? styles.salePrice
  //                   : styles.oldPrice,
  //               ]}>
  //               SAR {item.product.price}
  //             </Text>
  //             <Text style={styles.salePrice}>
  //               {item.product.saleprice === undefined
  //                 ? ' '
  //                 : 'SAR ' + item.product.saleprice}
  //             </Text>
  //           </View>
  //         </View>
  //         {/**line */}
  //         <View
  //           style={{
  //             height: 1,
  //             backgroundColor: '#E7E7EB',
  //             marginLeft: 10,
  //             marginRight: 10,
  //           }}
  //         />
  //         <View style={styles.quant_totalContainer}>
  //           <View style={styles.quantCounter}>
  //             <TouchableOpacity
  //               style={styles.plusMinusButtons}
  //               onPress={() => changeQuantity(item.product.id, false)}>
  //               <Feather name="minus" size={20} color="#484038" />
  //             </TouchableOpacity>
  //             <Text style={styles.quantText}>{item.quant}</Text>
  //             <TouchableOpacity
  //               style={styles.plusMinusButtons}
  //               onPress={() => changeQuantity(item.product.id, true)}>
  //               <Feather name="plus" size={20} color="#484038" />
  //             </TouchableOpacity>
  //           </View>
  //           <Text style={styles.itemsTotal}>
  //             {item.product.saleprice === undefined
  //               ? 'SAR ' + item.product.price * item.quant
  //               : 'SAR ' + item.product.saleprice * item.quant}
  //           </Text>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };

  const ChangeQuan = async (i, type) => {
    //console.log('id is', id);
    const cartData = cartProducts;
    //let prod = cartProducts.find(data => data.product.id === id);
    let prod = cartData[i].product;
    console.log('prod ', prod);
    let currentquant = cartData[i].quant;
    console.warn('current quant ', currentquant);
    if (type === true) {
      console.log('should increase');
      let newquant = currentquant + 1;
      cartData[i].quant = newquant;
      setCartProducts(cartData);
      console.warn('new quant ', cartData[i].quant);
      try {
        await AsyncStorage.setItem('CartData', JSON.stringify(cartData));
        //console.warn('update saved!');
      } catch (error) {
        //console.warn('update error,', error);
      }
    } else if (type === false && currentquant >= 2) {
      console.log('should decrease');
      let newquant = currentquant - 1;
      cartData[i].quant = newquant;
      setCartProducts(cartData);
      console.warn('new quant ', cartData[i].quant);
      setStatus(JSON.stringify(1));
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
      setStatus(JSON.stringify(0));
      try {
        await AsyncStorage.setItem('CartData', JSON.stringify(cartData));
        //console.warn('update saved!');
      } catch (error) {
        //console.warn('update error,', error);
      }
    }
  };
  const totalCartPrice = () => {
    // if type == false prod doesn't have sale price
    // if type == false prod doesn't have sale price
    const cartData = cartProducts;
    var total = 0;
    for (var i = 0; i < cartData.length; i++) {
      if (
        Number(cartData[i].product.saleprice) ===
        Number(cartData[i].product.price)
      ) {
        total += Number(cartData[i].product.price) * Number(cartData[i].quant);
      } else if (
        Number(cartData[i].product.saleprice) <
        Number(cartData[i].product.price)
      ) {
        total +=
          Number(cartData[i].product.saleprice) * Number(cartData[i].quant);
      }
    }
    setcartTotal(total);
    //console.warn('total is ', total);
  };

  return (
    <View style={{flex: 1}}>
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
        <ScrollView>
          {cartTotal === 0 ? (
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
                <View style={styles.listContainer}>
                  <View style={styles.productContainer}>
                    <View style={styles.name__size_priceContainer}>
                      <View style={styles.name_sizeContainer}>
                        <Text style={styles.name}>{item.product.name}</Text>
                      </View>
                      <View style={styles.priceContainer}>
                        <Text
                          style={[
                            Number(item.product.saleprice) <
                            Number(item.product.price)
                              ? styles.oldPrice
                              : styles.salePrice,
                          ]}>
                          SAR {item.product.price}
                        </Text>
                        <Text style={styles.salePrice}>
                          {Number(item.product.saleprice) ===
                          Number(item.product.price)
                            ? ' '
                            : 'SAR ' + item.product.saleprice}
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
                        {item.product.saleprice === undefined
                          ? 'SAR ' + item.product.price * item.quant
                          : 'SAR ' + item.product.saleprice * item.quant}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
      <View style={styles.checkoutContainer}>
        <View style={styles.totalCartContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalCartText}>SAR {cartTotal}</Text>
        </View>
        <LongButton text="Checkout" onPress={() => '...'} />
      </View>
    </View>
  );
}

export default UserCart;

const styles = StyleSheet.create({
  pagecontainer: {
    flex: 1,
    //justifyContent: 'center',
  },
  warningContainer: {
    marginTop: 150,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 5,
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
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
  name__size_priceContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name_sizeContainer: {
    //add if needed
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
  salePrice: {
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

// return this.state.laps.map((data) => {
//   return (
//     <View><Text>{data.time}</Text></View>
//   )
// })
{
  /* <View style={{}}>
          <FlatList
            data={cartProducts}
            keyExtractor={item => item.product.id}
            renderItem={cartList}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          />
        </View> */
}
{
  /**
        cartProducts.map((item, i) => {
          return (
            <View style={styles.listContainer}>
              <View style={styles.productContainer}>
                <View style={styles.name__size_priceContainer}>
                  <View style={styles.name_sizeContainer}>
                    <Text style={styles.name}>{item.product.name}</Text>
                    <Text style={styles.size}>size</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text
                      style={[
                        styles.defaultPrice,
                        item.product.saleprice === undefined
                          ? styles.salePrice
                          : styles.oldPrice,
                      ]}>
                      SAR {item.product.price}
                    </Text>
                    <Text style={styles.salePrice}>
                      {item.product.saleprice === undefined
                        ? ' '
                        : 'SAR ' + item.product.saleprice}
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
                  <Text style={styles.itemsTotal}>
                    {item.product.saleprice === undefined
                      ? 'SAR ' + item.product.price * item.quant
                      : 'SAR ' + item.product.saleprice * item.quant}
                  </Text>
                </View>
              </View>
            </View>
          );
        })
*/
}
