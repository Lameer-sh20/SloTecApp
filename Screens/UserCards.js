import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

//import componants
import {REACT_APP_address} from '@env';
import colors from '../assets/colors/Colors';
import YellowHeader from '../Components/YellowHeader';
import LongButton from '../Components/LongButton';

function UserCards() {
  const navigation = useNavigation();
  //parameters
  const [creditCards, setCreditCards] = useState([]);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  //functions
  //get user id
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('UserData');
        if (value !== null) {
          setUserId(JSON.parse(value).id);
          //console.warn(value);
        } else {
          console.log('UserData is null');
        }
      } catch (e) {
        console.error('no UserData in storage');
      }
    };
    getData();
  }, []);

  //get user Token(user is signedup/in), other wise is null
  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          setToken(JSON.parse(value));
          console.log('token is not null');
        } else {
          console.warn('token is null');
        }
      } catch (e) {
        console.error('error', e);
      }
    };
    getToken();
  }, []);

  //get user cards from DB
  useEffect(() => {
    const getCards = async () => {
      fetch('http:/' + REACT_APP_address + ':3000/card/getUserCards', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({userId}),
      })
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          if (data.cards.length !== 0) {
            setCreditCards(JSON.parse(JSON.stringify(data.cards)));
          } else {
            console.log('user has no cards');
          }
        })
        .catch(error => {
          //console.error('Error: ', error);
        });
    };
    getCards();
  }, [userId, token, creditCards]);

  //delete card from DB
  const deleteCard = async item => {
    //console.log('delete', item);
    let id = item.id;
    //console.log('delete number', id);
    fetch('http:/' + REACT_APP_address + ':3000/card/deleteCard', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({id}),
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        Toast.show({
          type: 'success',
          text1: data.message,
          visibilityTime: 4000,
        });
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  };

  return (
    <View style={{flex: 1}}>
      {/*header*/}
      <YellowHeader
        text="Credit Cards"
        onPress={() => navigation.navigate('StorePage')}
      />
      <View
        style={{
          flex: 4.5,
          paddingTop: 9,
          //backgroundColor: '#F4F4F8',
        }}>
        {/*reference to show toast message*/}
        <ScrollView>
          {/*show if user has no credit cards*/}
          {creditCards.length === 0 ? (
            <View style={styles.warningContainer}>
              <MaterialCommunityIcons
                name="alert-circle"
                size={160}
                color="#c4c4c4"
              />
              <Text style={styles.text}>You do not have any credit cards</Text>
            </View>
          ) : (
            //{/*show if user has credit cards*/}
            creditCards.map((item, i) => {
              return (
                <View key={item.id} style={styles.listContainer}>
                  <Toast
                    ref={ref => {
                      Toast.setRef(ref);
                    }}
                  />
                  <View style={styles.cardContainer}>
                    <View style={styles.name__number_dataContainer}>
                      <Text style={styles.cardText}>{item.cardHolderName}</Text>
                      <Text style={styles.cardText}>
                        ************
                        {JSON.stringify(item.cardNum).substring(13, 17)}
                      </Text>
                      <Text style={styles.cardText}>
                        {JSON.stringify(item.expiresDate).substring(1, 8)}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => deleteCard(item)}>
                      <AntDesign name="delete" size={22} color="#E75555" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
          <View style={styles.buttonContainer}>
            <LongButton
              text="Add Card"
              onPress={() => navigation.navigate('AddCard')}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  warningContainer: {
    marginTop: 150,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 5,
    fontFamily: 'Nunito-Regular',
    color: colors.default,
    fontSize: 16,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  listContainer: {
    paddingHorizontal: 9,
    paddingBottom: 9,
  },
  cardContainer: {
    backgroundColor: '#F4F4F8',
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 10,
    width: '100%',
    borderColor: colors.borderColor,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  name__number_dataContainer: {
    marginTop: 9,
    marginBottom: 9,
  },
  cardText: {
    fontFamily: 'Nunito-Regular',
    color: colors.default,
    fontSize: 16,
  },
});
export default UserCards;

// const deleteCard = async item => {
//   console.log('card is', i);
//   const cardData = creditCards;
//   if (cardData.length === 0) {
//     console.log('empty');
//   } else {
//     //setStatus(true);
//     let card = cardData[i].cardNumber;
//     //console.error('the card ', card);
//     //console.warn('before deleting', cardData);
//     let deleted = cardData.splice(i, 1);
//     try {
//       await AsyncStorage.setItem('CardsData', JSON.stringify(cardData));
//       //console.warn('update saved!');
//     } catch (error) {
//       //console.warn('update error,', error);
//     }
//     //console.warn('after delete ', cardData);
//   }
// };
