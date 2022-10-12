import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../assets/colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';

// import components
import SignHeader from '../Components/SignHeader';
import LongButton from '../Components/LongButton';

function UserCart() {
  const navigation = useNavigation();
  //parameters
  const [cartProducts, setCartProducts] = useState([]);
  let [status, setStatus] = useState(0);

  useEffect(() => {
    getData();
  });

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('cart');
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

  const changeQuantity = async (id, type) => {
    //console.log('id is', id);
    const dataCar = cartProducts;
    //let prod = cartProducts.find(data => data.product.id === id);
    let currentquant = dataCar[id - 1].quant;
    //console.error('quant ', currentquant);
    //let prod = dataCar[id - 1].product;
    //console.error('prod ', prod);
    if (type === true) {
      console.log('should increase');
      let newquant = currentquant + 1;
      dataCar[id - 1].quant = newquant;
      setCartProducts(dataCar);
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(dataCar));
        //console.warn('update saved!');
      } catch (error) {
        //console.warn('update error,', error);
      }
    } else if (type === false && currentquant >= 2) {
      console.log('should decrease');
      let newquant = currentquant - 1;
      dataCar[id - 1].quant = newquant;
      setCartProducts(dataCar);
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(dataCar));
        //console.warn('update saved!');
      } catch (error) {
        //console.warn('update error,', error);
      }
    } else if (type === false && currentquant === 1) {
      console.log('should delete');
      let deleted = dataCar.splice(id - 1, 1);
      console.error('deleted prod ', deleted);
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(dataCar));
        //console.warn('update saved!');
      } catch (error) {
        //console.warn('update error,', error);
      }
    }
  };

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
        await AsyncStorage.setItem('cart', JSON.stringify(cartData));
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
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cartData));
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
        await AsyncStorage.setItem('cart', JSON.stringify(cartData));
        //console.warn('update saved!');
      } catch (error) {
        //console.warn('update error,', error);
      }
    }
  };

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

  return (
    <View style={styles.pageContainer}>
      <SignHeader
        text="Cart"
        onPress={() => navigation.navigate('StorePage')}
      />
      {/* <TouchableOpacity onPress={() => getData()}>
        <Text>click me</Text>
      </TouchableOpacity> */}
      {status == 0 ? (
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
      )}
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
    flexDirection: 'row',
    backgroundColor: '#F4F4F8',
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
  itemsTotal: {
    fontFamily: 'Nunito-SemiBold',
    color: colors.blue,
    fontSize: 16,
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
