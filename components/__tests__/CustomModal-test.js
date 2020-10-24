import * as React from 'react';
import renderer from 'react-test-renderer';
import CustomModal from '../../components/CustomModal';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });
const mockedToggle = jest.fn();
// mock of a prop to pass CustomModal
const mockProp =  {
    title: "title",
    visable: true,
    disaster: { title: 'Thirsty Thursday', id: 1, description: 'Draught', LatL: 11, LongL: 12, link: "www.google.com" },
    toggleModal: mockedToggle
};

/*
Check CustomModal against snapshot. run jest -u to update snapshot
*/
it(`DisasterCard renders correctly`, () => {
    const tree = renderer.create(<CustomModal event={mockProp} />).toJSON();

    expect(tree).toMatchSnapshot();
});
/**
 * CustomModal should not be null
 */
it(`DisasterCard should not be null`, () => {
    const tree = renderer.create(<CustomModal event={mockProp} />).toJSON();

    expect(tree).toBeTruthy();
});

/**
 * try and press all buttons in modal
 */

it('calls actions as expected when pressing buttons', () => {
    const wrapper = shallow(
        <CustomModal event={mockProp} />
    );
    const render = wrapper.dive();
    render.find('TouchableOpacity').forEach(child => {
        child.simulate('press');
    });
});

