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

import YellowHeader from '../Components/YellowHeader';
import LongButton from '../Components/LongButton';

function UserCards() {
  const navigation = useNavigation();
  //parameters
  const [creditCards, setCreditCards] = useState([]);
  //let [status, setStatus] = useState(false);

  //functions
  useEffect(() => {
    getData();
  });

  const deleteCard = async i => {
    //console.log('card is', i);
    const cardData = creditCards;
    if (cardData.length === 0) {
      console.log('empty');
    } else {
      //setStatus(true);
      let card = cardData[i].cardNumber;
      //console.error('the card ', card);
      //console.warn('before deleting', cardData);
      let deleted = cardData.splice(i, 1);
      try {
        await AsyncStorage.setItem('CardsData', JSON.stringify(cardData));
        //console.warn('update saved!');
      } catch (error) {
        //console.warn('update error,', error);
      }
      //console.warn('after delete ', cardData);
    }
  };

  const getData = async () => {
    try {
      //console.warn('delete');
      //const value = await AsyncStorage.clear();
      const value = await AsyncStorage.getItem('CardsData');
      if (value !== null) {
        //console.warn('saved cards', value);
        setCreditCards(JSON.parse(value));
      } else {
        //console.warn('no saved cards', value);
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View style={{flex: 1}}>
      {/*header*/}
      <YellowHeader
        text="Credit Cards"
        onPress={() => navigation.navigate('PersonalMenu')}
      />
      <View
        style={{
          flex: 4.5,
          paddingTop: 9,
          //backgroundColor: '#F4F4F8',
        }}>
        <ScrollView>
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
            creditCards.map((item, i) => {
              return (
                <View style={styles.listContainer}>
                  <View style={styles.productContainer}>
                    <View style={styles.name__number_dataContainer}>
                      <Text style={styles.cardText}>{item.holderName}</Text>
                      <Text style={styles.cardText}>
                        ************
                        {JSON.stringify(item.cardNumber).substring(12, 16)}
                      </Text>
                      <Text style={styles.cardText}>
                        {item.expDate.substring(0, 2)}/
                        {item.expDate.substring(2, 4)}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => deleteCard(i)}>
                      <AntDesign name="delete" size={28} color="#E75555" />
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
{
  /* <Text>card is {typeof creditCards}</Text>
      <Text>card holder name is {creditCards.holderName}</Text>
      {creditCards.map(card => {
          return <Text> card is {card.holderName + card.cardNumber}</Text>;
        })} */
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
    color: '#212429',
    fontSize: 16,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  listContainer: {
    paddingHorizontal: 9,
    paddingBottom: 9,
  },
  productContainer: {
    backgroundColor: '#F4F4F8',
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 10,
    width: '100%',
    borderColor: '#E7E7EB',
    borderWidth: 1.2,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  name__number_dataContainer: {
    marginTop: 9,
    marginBottom: 9,
  },
  Container: {
    marginTop: 90,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  cardText: {
    fontFamily: 'Nunito-Regular',
    color: '#212429',
    fontSize: 16,
  },
});
export default UserCards;
