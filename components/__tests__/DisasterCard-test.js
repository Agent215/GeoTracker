import * as React from 'react';
import renderer from 'react-test-renderer';

import DisasterCard from '../../components/DisasterCard';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });
// mock of a prop to pass disaster card
const mockProp = { title: 'Thirsty Thursday', id: 1, description: 'Draught', LatL: 11, LongL: 12, icon: '../assets/Icons/Draught.png' };

/*
Check disaster card against snapshot. run jest -u to update snapshot
*/
it(`DisasterCard renders correctly`, () => {
  const tree = renderer.create(<DisasterCard event={mockProp} />).toJSON();

  expect(tree).toMatchSnapshot();
});
/**
 * Disaster card should not be null
 */
it(`DisasterCard should not be null`, () => {
  const tree = renderer.create(<DisasterCard event={mockProp} />).toJSON();

  expect(tree).toBeTruthy();
});

/**
 * try and press all buttons in card
 */

it('calls actions as expected when pressing buttons', () => {
  const wrapper = shallow(
    <DisasterCard event={mockProp} />
  );
  const render = wrapper.dive();
  render.find('TouchableOpacity').forEach(child => {
    child.simulate('press');
  });
});

