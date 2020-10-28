import * as React from 'react';
import renderer from 'react-test-renderer';

import { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native'
import signOut from '../../screens/SettingsScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
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

