import * as React from 'react';
import renderer from 'react-test-renderer';
import CustomModal from '../../components/CustomModal';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'


enzyme.configure({ adapter: new Adapter() });

// mock of a prop to pass WeatherOverlay on Load
const mockPropLoad = {
    category: '',
    gibsVisible: false,
};

//array to test category
const categoryToggle = []

//array to test gibsVisible
const gibsVisibleToggle = [true, false];




describe('Testing WeatherOverlay Component', () => {
    const initialState = { output: "null" }
    const mockStore = configureStore()
    let store

    //check that WeatherOverlay renders null on load
    it(`WeatherOverlay renders correctly on load`, () => {
        store = mockStore(initialState)
        const comp = <Provider store={store}><CustomModal category={mockPropLoad.category} gibsVisible={mockPropLoad.gibsVisible} /></Provider>
        const tree = renderer.create().toJSON(comp);

        expect(tree).toBeNull();
    });

    //check that WeatherOverlay changes

    //test random toggle of gibsVisible
})