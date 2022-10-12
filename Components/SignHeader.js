import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import colors from '../assets/colors/Colors';
import {useNavigation} from '@react-navigation/native';

const SignHeader = ({text, onPress}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/*back icon container */}
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require('../assets/Images/back-icon.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      {/*label */}
      <Text style={styles.text}>{text}</Text>
      {/*extra container */}
      <View style={styles.rightContainer} />
    </View>
  );
};

export default SignHeader;

const styles = StyleSheet.create({
  header: {
    height: 95,
    width: '100%',
    backgroundColor: '#FCFDFF',
    borderBottomColor: '#E7E7EB',
    borderBottomWidth: 1,
    //elevation: 4, // is it a shadow ??
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Nunito-Bold',
    color: colors.blackFont,
    fontSize: 24,
  },
  image: {
    width: 21,
    height: 26.7,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 16,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
