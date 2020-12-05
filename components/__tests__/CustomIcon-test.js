import * as React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import CustomIcon from '../../components/CustomIcon';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockedNavigator from '../MockedNavigator'


const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

enzyme.configure({ adapter: new Adapter() });
// mock of props to pass disaster card
const size= 22;
const event =   { title: 'Lava', id: 5, category: 'clouds', currentLat: 40.059813, currentLong: -75.190574, sourceLink: 'https://eonet.sci.gsfc.nasa.gov/', date: "" }


describe('Testing CustomIcon Component', () => {
  const initialState = { output: "null" }
  const mockStore = configureStore()
  let store, wrapper
  /*
  Check CustomIcon against snapshot. run jest -u to update snapshot
  */
  it(`CustomIcon renders correctly`, () => {
    store = mockStore(initialState)

    const comp = <Provider store={store}><CustomIcon size={size} event={event} /></Provider>
    const tree = renderer.create(comp).toJSON();

    expect(tree).toMatchSnapshot();
  });

 
})
