import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../assets/colors/Colors';

const InputBox = ({placeholder, value, onChangeText, secureTextEntry}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.inputBox}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default InputBox;

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
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    fontWeight: '400',
  },
});
