import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox} from 'react-native';
//LogBox.ignoreLogs(['new NativeEventEmitter']);

import MainPage from './Screens/MainPage';
import SignUpPage from './Screens/SignUpPage';
import SignInPage from './Screens/SignInPage';
import ResetPassPage from './Screens/ResetPassPage';
import VerficationPage from './Screens/VerficationPage';
import VerficationPage2 from './Screens/VerficationPage2';
import ResetPassPage2 from './Screens/ResetPassPage2';
//import Home_noStorePage from './Screens/Home-noStorePage';
import StoresMenu from './Screens/StoresMenu';
//import Home_xStorePage from './Screens/Home_xStorePage';
import StorePage from './Screens/StorePage';
import PersonalMenu from './Screens/PersonalMenu';
import UserInfo from './Screens/UserInfo';
import UserCards from './Screens/UserCards';
import AddCard from './Screens/AddCard';
import UserInvoices from './Screens/UserInvoices';
import InvoiceDetails from './Screens/InvoiceDetails';
import UserCart from './Screens/UserCart';
import CameraPage from './Screens/Camera';
import ProductPage from './Screens/ProductPage';
import ScannedProductPage from './Screens/ScannedProductPage';
import CheckoutPage from './Screens/CheckoutPage';
import CashPaymentPage from './Screens/CashPaymentPage';
import CardPaymentPage from './Screens/CardPaymentPage';

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
        {/**/}
        <Stack.Screen
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
          name="VerficationPage2"
          component={VerficationPage2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPassPage2"
          component={ResetPassPage2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StoresMenu"
          component={StoresMenu}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StorePage"
          component={StorePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CameraPage"
          component={CameraPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductPage"
          component={ProductPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScannedProductPage"
          component={ScannedProductPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PersonalMenu"
          component={PersonalMenu}
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
          name="InvoiceDetails"
          component={InvoiceDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserCart"
          component={UserCart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CheckoutPage"
          component={CheckoutPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CashPaymentPage"
          component={CashPaymentPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CardPaymentPage"
          component={CardPaymentPage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
