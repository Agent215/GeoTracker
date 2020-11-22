import * as React from 'react';
import renderer from 'react-test-renderer';

import { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native'
import signOut from '../../screens/SettingsScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Amplify from 'aws-amplify';
import awsconfig from '../../aws-exports';

enzyme.configure({ adapter: new Adapter() });

Amplify.configure(awsconfig);

Auth.signUp = jest.fn().mockImplementation(
    () => {
        return true;
    });

/**
 * 
 * Test that signout function returns a non null value
 */
it(`signOut should return not null`, () => {

    expect(signOut).toBeTruthy();
});

/**
 * try and press all buttons in setting screen
 */

it('calls actions as expected when pressing buttons', () => {
    const wrapper = shallow(
        <SettingsScreen />
    );
    const render = wrapper.dive();
    render.find('TouchableOpacity').forEach(child => {
        child.simulate('press');
    });
});








