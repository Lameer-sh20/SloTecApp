import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

import colors from '../assets/colors/Colors';

//same as grayheader but with back button
const SignHeader = ({text, onPress}) => {
  //params
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/*back icon container */}
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={onPress}>
          <AntDesign name="left" size={30} color="#212429" />
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
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Nunito-Bold',
    color: colors.default,
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
