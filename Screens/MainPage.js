import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import componants
import colors from '../assets/colors/Colors';

function MainPage() {
  //params
  const navigation = useNavigation();
  const [token, setToken] = useState('');

  //functions

  //check if we have token in storage
  const checkToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      //token doesnexists => user can go if he closed app before
      if (value === null) {
        console.log('token is null,', value);
        try {
          const user = JSON.stringify({
            name: 'Guest',
          });
          await AsyncStorage.setItem('UserData', user);
          await AsyncStorage.setItem('token', JSON.stringify(null));
          console.log('Temp data is saved');
          navigation.navigate('StoresMenu');
        } catch (er) {
          console.error('error setting temp user data', er);
        }
      } else if (value.match(/null/)) {
        console.log('token null,', value);
        try {
          const user = JSON.stringify({
            name: 'Guest',
          });
          await AsyncStorage.setItem('UserData', user);
          await AsyncStorage.setItem('token', JSON.stringify(null));
          console.log('Temp data is saved');
          navigation.navigate('StoresMenu');
        } catch (er) {
          console.error('error setting temp user data', er);
        }
      } else {
        console.log('token is not null, please sign in/up,', value);
      }
    } catch (e) {
      console.log('No token in Storage ', e);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Images/homeBG.jpg')}
        resizeMode="cover"
        style={styles.mainimage}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={() => navigation.navigate('SignUpPage')}>
          <Text style={styles.leftText}>SignUp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rightButton}
          onPress={() => checkToken()}>
          <Text style={styles.rightText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FCFDFF',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  leftButton: {
    backgroundColor: colors.darkYellow,
    width: '45%',
    height: '70%',
    borderRadius: 10,
    borderColor: colors.darkYellow,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftText: {
    fontFamily: 'Nunito-Bold',
    color: 'white',
    fontSize: 20,
  },
  rightButton: {
    backgroundColor: '#FCFDFF',
    width: '45%',
    height: '70%',
    borderRadius: 10,
    borderColor: colors.darkYellow,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightText: {
    fontFamily: 'Nunito-Bold',
    color: colors.darkYellow,
    fontSize: 20,
  },
  mainimage: {
    flex: 6,
  },
});
export default MainPage;
