import {Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

function MarketsPage() {
  const navigation = useNavigation();

  return (
    <View style={styles.pagecontainer}>
      <TouchableOpacity onPress={() => navigation.navigate('.....')}>
        <Text>this is markets page</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  pagecontainer: {
    flex: 1,
  },
});
export default MarketsPage;
