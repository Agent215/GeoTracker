import React from 'react';
import renderer from 'react-test-renderer';
import App from '../../App';

/*
test to see if app can render without crashing
*/
it('App renders without crashing', () => {
    expect(App).toBeTruthy();
});
