import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import colors from '../assets/colors/Colors';

//same as signHeader but without back button
const GreyHeader = ({text}) => {
  return (
    <View style={styles.header}>
      {/*back icon container */}
      <View style={styles.leftContainer} />
      {/*label */}
      <Text style={styles.text}>{text}</Text>
      {/*extra container */}
      <View style={styles.rightContainer} />
    </View>
  );
};

export default GreyHeader;

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
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
