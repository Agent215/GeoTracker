import * as React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import CustomToast from '../../components/CustomToast';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


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
// mock of a prop to pass customToast
const mockProp = "";


describe('Testing customToast  Component', () => {
    const initialState = { output: "null" }
    const mockStore = configureStore()
    let store
    /*
    Check disaster card against snapshot. run jest -u to update snapshot
    */
    it(`customToast renders correctly`, () => {
        store = mockStore(initialState)

        const comp = <Provider store={store}><CustomToast event={mockProp} /></Provider>
        const tree = renderer.create(comp).toJSON();

        expect(tree).toMatchSnapshot();
    });


})
