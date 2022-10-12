import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import colors from '../assets/colors/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserHeader from '../Components/UserHeader';

function Home_xStorePage({navigation}) {
  //const navigation = useNavigation();
  //const route = useRoute();
  const [name, setName] = useState('');
  const [storeProducts, setStoreProducts] = useState([]);
  //const [productId, setproductId] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserData');
      const storedata = await AsyncStorage.getItem('StoreData');
      if (value !== null) {
        //console.warn(JSON.parse(value).name);
        setName(JSON.parse(value).name);
      } else if (storedata !== null) {
        //console.warn(JSON.parse(storedata).storeID);
        //console.warn(JSON.parse(storedata).storeProducts);
        setStoreProducts(JSON.parse(storedata).storeProducts);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const productsMenu = ({item}) => {
    const handleOnPress = () => navigation.navigate('ProductPage', {item});
    return (
      <TouchableOpacity style={styles.product} onPress={handleOnPress}>
        {/**product image */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.productImage}
            resizeMode="contain"
            source={{uri: item.uri}}
          />
        </View>
        {/**line */}
        <View style={{height: 1.2, backgroundColor: '#E7E7EB'}} />
        {/**info */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text
            style={[
              styles.defaultPrice,
              item.saleprice === undefined ? styles.salePrice : styles.oldPrice,
            ]}>
            SAR {item.price}
          </Text>
          <Text style={styles.salePrice}>
            {item.saleprice === undefined ? ' ' : 'SAR ' + item.saleprice}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.pageContainer}>
      <UserHeader name={name}> </UserHeader>
      <View style={styles.Container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Latest Offers</Text>
        </View>
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
    backgroundColor: '#F4F4F8',
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
});
export default Home_xStorePage;
