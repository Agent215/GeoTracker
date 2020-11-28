import * as React from 'react';
import renderer from 'react-test-renderer';
import WeatherOverlay from '../../components/WeatherOverlay';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

//array of categories to test randomly
const categories = ["clouds", "temp", "precipitation", "wind", "pressure"]

describe('<WeatherOverlay />', () => {

    it(`WeatherOverlay renders Correctly on Load`, () => {

        const weatherOverlayComponent = renderer.create(<WeatherOverlay />).toJSON()    
        expect(weatherOverlayComponent).toMatchSnapshot();
        });

    it('WeatherOverlay is null if no weather to be displayed', () => {

        const weatherOverlayComponent = renderer.create(<WeatherOverlay category={"none"} gibsVisible={true} />).toJSON();
    })

    it(`WeatherOverlay is not null if weather to be displayed`, () => {

        const weatherOverlayComponent = renderer.create(<WeatherOverlay category={ categories[Math.floor(Math.random() * categories.length)] } gibsVisible={false} />).toJSON()   
        expect(weatherOverlayComponent).not.toBeNull();
        });

    it('WeatherOVerlay is null if gibs is visible', () => {

        const weatherOverlayComponent = renderer.create(<WeatherOverlay category={"clouds"} gibsVisible={true} />).toJSON()
        expect(weatherOverlayComponent).toBeNull();
    })
})