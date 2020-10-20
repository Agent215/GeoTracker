import * as React from 'react';
import renderer from 'react-test-renderer';

import CustomModal from '../../components/CustomModal';

// mock of a prop to pass CustomModal
const mockProp = { title: 'Thirsty Thursday', id: 1, description: 'Draught', LatL: 11, LongL: 12, icon: '../assets/Icons/Draught.png' };

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
