import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '../assets/colors/Colors';
import {useNavigation} from '@react-navigation/native';

function MainPage() {
  const navigation = useNavigation();
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
        <TouchableOpacity style={styles.rightButton}>
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
    backgroundColor: colors.mainYellow,
    width: '45%',
    height: '70%',
    borderRadius: 10,
    borderColor: colors.mainYellow,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftText: {
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    fontSize: 20,
  },
  rightButton: {
    backgroundColor: '#FFFFFF',
    width: '45%',
    height: '70%',
    borderRadius: 10,
    borderColor: colors.mainYellow,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightText: {
    fontFamily: 'Nunito-Bold',
    color: colors.mainYellow,
    fontSize: 20,
  },
  mainimage: {
    flex: 6,
  },
});
export default MainPage;
