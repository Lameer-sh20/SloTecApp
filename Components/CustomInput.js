import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import colors from '../assets/colors/Colors';

const CustomInput = ({placeholder, value, onChangeText}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.inputBox}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: 55,
    paddingHorizontal: 10,
  },
  inputBox: {
    backgroundColor: '#F5F5F9',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,

    borderColor: '#E7E7EB',
    borderWidth: 0.5,
  },
});
