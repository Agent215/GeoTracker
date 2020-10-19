import * as React from 'react';
import renderer from 'react-test-renderer';

import { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native'
import  MapScreen  from '../../screens/SettingsScreen';

/**
 * 
 * Test that MapScreen function returns a non null value
 */
it(`signOut should return not null`, () => {
  
    expect(MapScreen).toBeTruthy();
});
