import React from 'react';
import {
   AsyncStorage,
   Button,
   Text,
   View,
} from 'react-native';

import { config } from '../config/config';

export default class HomeScreen extends React.Component {
   static navigationOptions = {
      title: 'Welcome to the app!',
   };

   constructor(props) {
      super(props);

      this.state = {
         currentUser: {}
      };
      let currentUser = this._getCurrentUserAsync();
   }

   render() {
      return (
         <View>
            <Button title="Show me more of the app" onPress={this._showMoreApp} />
            <Text></Text>
            <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
            <Text>{JSON.stringify(this.state.currentUser, null, 2)}</Text>
         </View>
      );
   }

   _getCurrentUserAsync = async () => {
      try {
         let userToken = await AsyncStorage.getItem('access_token');

         let response = await fetch(`${config.apiUrl}/currentuser/token`, {
            method: 'GET',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               'Authorization': userToken,
            }
         });

         let responseJson = await response.json();
         this.setState({ currentUser: responseJson });
         return responseJson;
      } catch (error) {
         console.error(error);
      }
   };

   _showMoreApp = () => {
      this.props.navigation.navigate('Other');
   };

   _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
   };
}
