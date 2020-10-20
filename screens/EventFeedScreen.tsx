import * as React from 'react';
import { ScrollView, View } from 'react-native';

import DisasterCard from '../components/DisasterCard';
import { events } from '../assets/Mocked_Data';

export default function EventFeedScreen() {

  return (

    <ScrollView>
      <View>
        {events.map(function (data ,index) {
          return (<DisasterCard
            key = {index}
            event={data} />)
        })}

      </View>
    </ScrollView>
  );
}

