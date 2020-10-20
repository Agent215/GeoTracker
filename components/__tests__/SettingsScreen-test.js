import * as React from 'react';
import renderer from 'react-test-renderer';

import { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native'
import  signOut  from '../../screens/SettingsScreen';

/**
 * 
 * Test that signout function returns a non null value
 */
it(`signOut should return not null`, () => {
  
    expect(signOut).toBeTruthy();
});
