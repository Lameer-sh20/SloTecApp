import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../assets/colors/Colors';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import {Icon as MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';

import Info from '../Screens/UserInfo';
import Cards from '../Screens/UserCards';
import Invoices from '../Screens/UserInvoices';

const Tab = createBottomTabNavigator();

function TabBar() {
  return (
    <View>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            /*if route name is home, some effect happens */
            if (rn === Info) {
              iconName = focused ? 'md-home-sharp' : 'home-outline';
            } else if (rn === Cards) {
              iconName = focused ? 'radio-button-on-sharp' : 'md-camera';
            } else if (rn === Invoices) {
              iconName = focused ? 'md-person' : 'md-person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.mainYellow,
          tabBarInactiveTintColor: '#c4c4c4',
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 70,
            backgroundColor: 'white',
            //width: '100%',
            borderTopColor: '#E7E7EB',
            borderTopWidth: 1.5,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          },
        })}>
        <Tab.Screen
          name="info"
          component={Info}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="cards"
          component={Cards}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="invoices"
          component={Invoices}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </View>
  );
}

export default TabBar;
