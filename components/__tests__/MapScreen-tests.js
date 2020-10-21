import * as React from 'react';
import renderer from 'react-test-renderer';

import { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native'
import MapScreen , {animateToUser}from '../../screens/SettingsScreen';

/**
 * 
 * Test that MapScreen function returns a non null value
 */
it(`MapScreen should return not null`, () => {

    expect(MapScreen).toBeTruthy();
});

/**
 * try to press the map go to button
 */

it('calls actions as expected when pressing map go to button', () => {
    const wrapper = shallow(
        <MapScreen />
    );

    const render = wrapper.dive();
    render.find('IconButton').forEach(child => {
        child.simulate('Press');
    });
});


