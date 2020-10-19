import * as React from 'react';
import renderer from 'react-test-renderer';

import EventFeedScreen from '../../screens/EventFeedScreen';

it(`EventFeedScreen renders correctly`, () => {
  const tree = renderer.create(<EventFeedScreen/>).toJSON();

  expect(tree).toMatchSnapshot();
});
