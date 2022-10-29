import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import {Icon as MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';

//import componants
import colors from '../assets/colors/Colors';
//import pages
import StorePage from '../Screens/Home_xStorePage';
import PersonalMenu from '../Screens/PersonalMenu';
import Camera from '../Screens/Camera';

const storePage = 'StorePage';
const personalMenu = 'PersonalMenu';
const camera = 'Camera';

const Tab = createBottomTabNavigator();

function BottomBar() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          /*if route name is home, some effect happens */
          if (rn === storePage) {
            iconName = focused ? 'md-home-sharp' : 'home-outline';
          } else if (rn === camera) {
            iconName = focused ? 'barcode-outline' : 'md-camera';
          } else if (rn === personalMenu) {
            iconName = focused ? 'md-person' : 'md-person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.Yellow,
        tabBarInactiveTintColor: colors.gray2,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: '#FCFDFF',
          width: '100%',
          borderTopColor: colors.borderColor,
          borderTopWidth: 1,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
      })}>
      <Tab.Screen
        name={storePage}
        component={StorePage}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={camera}
        component={Camera}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={personalMenu}
        component={PersonalMenu}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

export default BottomBar;
