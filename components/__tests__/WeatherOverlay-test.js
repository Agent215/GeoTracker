import * as React from 'react';
import renderer from 'react-test-renderer';
import WeatherOverlay from '../../components/WeatherOverlay';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

enzyme.configure({ adapter: new Adapter() });

//array of categories to test randomly
const categories = ["clouds", "temp", "precipitation", "wind", "pressure"]

describe('<WeatherOverlay />', () => {
    it(`WeatherOverlay renders Correctly`, () => {

        const weatherOverlayComponent = renderer.create(<WeatherOverlay />).toJSON()    
        expect(weatherOverlayComponent).toMatchSnapshot();
        });

    it(`WeatherOverlay is not null if weather to be displayed`, () => {

        const weatherOverlayComponent = renderer.create(<WeatherOverlay category={"clouds"} gibsVisible={false} />).toJSON()   
        expect(weatherOverlayComponent).not.toBeNull();
        });

    it('WeatherOVerlay is null if gibs is visible', () => {

        const weatherOverlayComponent = renderer.create(<WeatherOverlay category={"none"} />).toJSON()
        expect(weatherOverlayComponent).toBeNull();
    })
})