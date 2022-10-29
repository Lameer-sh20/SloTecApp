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
import AsyncStorage from '@react-native-async-storage/async-storage';

//import componant
import colors from '../assets/colors/Colors';
import {REACT_APP_address} from '@env';
import UserHeader from '../Components/UserHeader';

function Home_xStorePage({navigation}) {
  //params
  const [name, setName] = useState('');
  const [storeProducts, setStoreProducts] = useState([]);
  const [storeID, setStoreID] = useState('');
  const [storeName, setStoreName] = useState('');

  //functions
  //calls getdata function
  useEffect(() => {
    getData();
  }, []);

  //to get user and store data from storage
  const getData = async () => {
    try {
      const storedata = await AsyncStorage.getItem('StoreData');
      const value = await AsyncStorage.getItem('UserData');
      if (value !== null || storedata !== null) {
        //console.warn(JSON.parse(value));
        //console.warn(JSON.parse(storedata));
        //console.warn('store data are ', JSON.parse(storedata));
        setStoreName(JSON.parse(storedata).storeName);
        setStoreProducts(JSON.parse(storedata).storeProducts);
        setStoreID(JSON.parse(storedata).storeID);
        setName(JSON.parse(value).name);
      } else if (storedata == null || value == null) {
        console.warn('StoreData is null');
      }
    } catch (e) {
      console.error(e);
    }
  };

  //to render products list
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
        <View style={{height: 1, backgroundColor: '#E7E7EB'}} />
        {/**info */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text
            style={[
              Number(item.sellPrice) !== Number(item.price)
                ? styles.oldPrice
                : styles.sellPrice,
            ]}>
            {item.price} SAR
          </Text>
          <Text style={styles.sellPrice}>
            {Number(item.sellPrice) === Number(item.price)
              ? ' '
              : item.sellPrice + ' SAR'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.pageContainer}>
      {/**header*/}
      <UserHeader name={name} storename={storeName} />
      {/**latest offers*/}
      <View style={styles.Container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Latest Offers</Text>
        </View>
        {/**products list*/}
        <View style={styles.menuContainer}>
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
    backgroundColor: colors.Yellow,
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
    color: '#484038',
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
    borderWidth: 1,
    borderRadius: 15,
    marginLeft: 5,
    marginBottom: 5,
    borderColor: colors.borderColor,
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
    width: '95%',
    height: '80%',
    backgroundColor: 'transparent',
  },
  infoContainer: {
    paddingLeft: 9,
  },
  productName: {
    fontFamily: 'Nunito-SemiBold',
    color: colors.default,
    fontSize: 14,
    paddingVertical: 3,
  },
  defaultPrice: {
    fontFamily: 'Nunito-SemiRegular',
    color: colors.default,
    fontSize: 14,
  },
  oldPrice: {
    fontFamily: 'Nunito-Regular',
    color: colors.gray2,
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  sellPrice: {
    fontFamily: 'Nunito-SemiBold',
    color: colors.blue,
    fontSize: 14,
  },
});
export default Home_xStorePage;
