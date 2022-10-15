import * as React from 'react';
//import {View, Text} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import NormalPage from './Screens/NormalPage';
import RandomPage from './Screens/RandomPage';
import MarketsPage from './Screens/MarketsPage';

import MainPage from './Screens/MainPage';
import SignUpPage from './Screens/SignUpPage';
import SignInPage from './Screens/SignInPage';
import ResetPassPage from './Screens/ResetPassPage';
import VerficationPage from './Screens/VerficationPage';
import Home_noStorePage from './Screens/Home-noStorePage';
import StoresMenu from './Screens/StoresMenu';
import Home_xStorePage from './Screens/Home_xStorePage';
import StorePage from './Screens/StorePage';
import PersonalMenu from './Screens/PersonalMenu';
import UserInfo from './Screens/UserInfo';
import UserCards from './Screens/UserCards';
import AddCard from './Screens/AddCard';
import UserInvoices from './Screens/UserInvoices';
import UserCart from './Screens/UserCart';
import CameraPage from './Screens/Camera';
import Location from './Screens/Location';
import ProductPage from './Screens/ProductPage';

const Stack = createNativeStackNavigator();

function App() {
  const navTheme = {
    colors: {
      background: '#FCFDFF',
    },
  };
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUpPage"
          component={SignUpPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignInPage"
          component={SignInPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerficationPage"
          component={VerficationPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPassPage"
          component={ResetPassPage}
          options={{headerShown: false}}
        />
       <Stack.Screen
          name="Location"
          component={Location}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CameraPage"
          component={CameraPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home_noStorePage"
          component={Home_noStorePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StoresMenu"
          component={StoresMenu}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home_xStorePage"
          component={Home_xStorePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductPage"
          component={ProductPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StorePage"
          component={StorePage}
          options={{headerShown: false}}
        />*/}
        <Stack.Screen
          name="PersonalMenu"
          component={PersonalMenu}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RandomPage"
          component={RandomPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserInfo"
          component={UserInfo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserCards"
          component={UserCards}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddCard"
          component={AddCard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserInvoices"
          component={UserInvoices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserCart"
          component={UserCart}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    /* <NormalPage> </NormalPage> */
  );
}

export default App;
