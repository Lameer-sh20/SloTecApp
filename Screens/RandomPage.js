import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RandomPage() {
  const [barcodeNum, setbarcodeNum] = useState('');
  const [storeId, setstoreId] = useState('');
  const [scannedProduct, setScannedProduct] = useState([]);
  //const [storeProducts, setStoreProducts] = useState([]);

  useEffect(() => {
    getData();
  });

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Barcode');
      //const value = JSON.stringify(6164001011534);
      if (value !== null) {
        setbarcodeNum(value);
        setstoreId(JSON.stringify(1));
        //setStoreProducts(JSON.parse(value));
        //console.warn('from scanning', value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const submitData = () => {
    console.warn('in submitt data');
    fetch('http://172.20.10.7:3000/product/FindProductByBarcode', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({barcodeNum, storeId}),
    })
      .then(response => response.json())
      .then(data => {
        console.log('respond is:', data);
        setScannedProduct(JSON.parse(JSON.stringify(data.Product)));
      })
      .catch(error => {
        console.error('Error:', error);
      });
    console.warn('in submitt data2');
  };
  return (
    <View>
      <TouchableOpacity onPress={() => submitData()}>
        <Text style={{fontSize: 20}}>click here</Text>
      </TouchableOpacity>
      <Text>in Random Page {typeof scannedProduct}</Text>
      <Text>
        product data is {scannedProduct.name}, {scannedProduct.barcodeNum}
      </Text>
    </View>
  );
}

export default RandomPage;
{
  /* {storeProducts.map(products => {
        return (
          <View>
            <Text>{products.name}</Text>
          </View>
        );
      })} */
}
