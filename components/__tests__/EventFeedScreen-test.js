import * as React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import MockedNavigator from '../MockedNavigator'
import EventFeedScreen from '../../screens/EventFeedScreen';



describe('Testing eventfeedscreen Component', () => {
  const initialState = { output: "null" }
  const mockStore = configureStore()
  let store, wrapper

  it(`EventFeedScreen renders correctly`, () => {
    store = mockStore(initialState)

    const comp = <Provider store={store}><MockedNavigator component={EventFeedScreen} /></Provider>
    const tree = renderer.create().toJSON(comp);

    expect(tree).toMatchSnapshot();
  });
})
