import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../assets/colors/Colors';
import {useNavigation} from '@react-navigation/native';

function YellowHeader({text, onPress}) {
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
      {/*back icon container */}
      <Text style={styles.text}>{text}</Text>
      {/*extra container */}
      <View style={styles.rightContainer} />
    </View>
  );
}
export default YellowHeader;

const styles = StyleSheet.create({
  header: {
    height: 95,
    width: '100%',
    backgroundColor: '#FFEB83',
    borderColor: '#FFEB83',
    //elevation: 4, // is it a shadow ??
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftWidth: 1.5,
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
