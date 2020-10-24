import * as React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import DisasterCard from '../../components/DisasterCard';
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
// mock of a prop to pass disaster card
const mockProp = { title: 'Thirsty Thursday', id: 1, description: 'Draught', LatL: 11, LongL: 12, link: "www.google.com" };


describe('Testing Disaster Card Component', () => {
  const initialState = { output: "null" }
  const mockStore = configureStore()
  let store, wrapper
  /*
  Check disaster card against snapshot. run jest -u to update snapshot
  */
  it(`DisasterCard renders correctly`, () => {
    store = mockStore(initialState)

    const comp = <Provider store={store}><DisasterCard event={mockProp} /></Provider>
    const tree = renderer.create(comp).toJSON();

    expect(tree).toMatchSnapshot();
  });
  /**
   * Disaster card should not be null
   */
  it(`DisasterCard should not be null`, () => {
    const comp = <Provider store={store}><DisasterCard event={mockProp} /></Provider>
    const tree = renderer.create(comp).toJSON();

    expect(tree).toBeTruthy();
  });

  /**
   * try and press all buttons in card
   */

  it('calls actions as expected when pressing buttons', () => {
    const wrapper = shallow(
      <Provider store={store}><DisasterCard event={mockProp} /></Provider>
    );
    const render = wrapper.dive();
    render.find('TouchableOpacity').forEach(child => {
      child.simulate('press');
    });
  });
})
