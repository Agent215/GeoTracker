import * as React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Legend from '../../components/Legend';
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
const category = "clouds"


describe('Testing Legend Component', () => {
  const initialState = { output: "null" }
  const mockStore = configureStore()
  let store, wrapper
  /*
  Check Legend against snapshot. run jest -u to update snapshot
  */
  it(`Legend renders correctly`, () => {
    store = mockStore(initialState)

    const comp = <Provider store={store}><Legend size={size} category={category} /></Provider>
    const tree = renderer.create(comp).toJSON();

    expect(tree).toMatchSnapshot();
  });
  /**
   * Legend should not be null
   */
  it(`Legend should not be null`, () => {
    const comp = <Provider store={store}><Legend size={size} category={category}/></Provider>
    const tree = renderer.create(comp).toJSON();

    expect(tree).toBeTruthy();
  });

 
})
