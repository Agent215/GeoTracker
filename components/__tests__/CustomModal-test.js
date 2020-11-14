import * as React from 'react';
import renderer from 'react-test-renderer';
import CustomModal from '../../components/CustomModal';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'


enzyme.configure({ adapter: new Adapter() });
const mockedToggle = jest.fn();
// mock of a prop to pass CustomModal
const mockProp = {
    startDate : "10/20/2020",
    title: "title",
    sourceLink : "www.google.com",
    visable: true,
    disaster: { title: 'Thirsty Thursday', id: 1, description: 'Draught', LatL: 11, LongL: 12, sourceLink: "www.google.com" , currentDate: "10/20/2020"},
    toggleModal: mockedToggle
};




describe('Testing Custom Modal  Component', () => {
    const initialState = { output: "null" }
    const mockStore = configureStore()
    let store, wrapper
    /*
    Check CustomModal against snapshot. run jest -u to update snapshot
    */
    it(`Custom Modal renders correctly`, () => {
        store = mockStore(initialState)
        const comp = <Provider store={store}><CustomModal event={mockProp} /></Provider>
        const tree = renderer.create().toJSON(comp);

        expect(tree).toMatchSnapshot();
    });
    /**
     * CustomModal should not be null
     */
    it(`Custom Modal should not be null`, () => {
        store = mockStore(initialState)
        const comp = <Provider store={store}><CustomModal event={mockProp} /></Provider>
        const tree = renderer.create(comp).toJSON();

        expect(tree).toBeTruthy();
    });

    /**
     * try and press all buttons in modal
     */

    it('calls actions as expected when pressing buttons', () => {
        store = mockStore(initialState)
        const comp = <Provider store={store}><CustomModal event={mockProp} /></Provider>
        const wrapper = shallow(
            comp
        );
        const render = wrapper.dive();
        render.find('TouchableOpacity').forEach(child => {
            child.simulate('press');
        });
    });

})