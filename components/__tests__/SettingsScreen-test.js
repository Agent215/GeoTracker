import * as React from 'react';
import renderer from 'react-test-renderer';

import { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native'
import  signOut  from '../../screens/SettingsScreen';


it(`renders correctly`, () => {
  

    expect(signOut).toBeTruthy();
});
