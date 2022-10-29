import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import colors from '../assets/colors/Colors';

const LongButton = ({text, onPress}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LongButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: 55,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: colors.Yellow,
    padding: 15,
    borderRadius: 10,

    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonText: {
    fontFamily: 'Nunito-Bold',
    color: '#484038',
    fontSize: 17,
  },
});
