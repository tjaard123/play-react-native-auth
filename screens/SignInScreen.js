import React from 'react';
import {
  AsyncStorage,
  Button,
  View,
} from 'react-native';

import { config } from '../config/config';

export default class SignInScreen extends React.Component {
   static navigationOptions = {
      title: 'Please sign in',
   };

   render() {
      return (
         <View>
            <Button title="Sign in!" onPress={this._signInAsync} />
         </View>
      );
   }

   _signInAsync = async () => {
      try {
         var body = JSON.stringify({ Username: config.credentials.username, Password: config.credentials.password });

         let response = await fetch(`${config.apiUrl}/session/token`, {
            method: 'POST',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: body,
         });

         let responseJson = await response.json();
         await AsyncStorage.setItem('access_token', responseJson.access_token);

         this.props.navigation.navigate('App');
      } catch (error) {
         console.error(error);
      }
   }
}