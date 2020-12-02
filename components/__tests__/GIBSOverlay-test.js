import * as React from 'react';
import renderer from 'react-test-renderer';
import GIBSOverlay from '../../components/GIBSOverlay';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

//array of categories to test randomly
const categories = ["clouds", "temp", "precipitation", "wind", "pressure"]

describe('<GIBSOverlay />', () => {

    it(`GIBSOverlay renders Correctly on Load`, () => {

        const GIBSOverlayComponent = renderer.create(<GIBSOverlay />).toJSON()    
        expect(GIBSOverlayComponent).toMatchSnapshot();
        });

    it('GIBSOverlay is null if no weather to be displayed', () => {

        const GIBSOverlayComponent = renderer.create(<GIBSOverlay category={"none"} gibsVisible={true} />).toJSON();
    })

    it(`GIBSOverlay is null if weather to be displayed`, () => {

        const GIBSOverlayComponent = renderer.create(<GIBSOverlay category={ categories[Math.floor(Math.random() * categories.length)] } gibsVisible={false} />).toJSON()   
        expect(GIBSOverlayComponent).toBeNull();
        });

    it('GIBSOverlay is not null if gibs is visible', () => {

        const GIBSOverlayComponent = renderer.create(<GIBSOverlay category={"clouds"} gibsVisible={true} />).toJSON()
        expect(GIBSOverlayComponent).not.toBeNull();
    })
})