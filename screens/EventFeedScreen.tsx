import * as React from 'react';
import { ScrollView, View,Dimensions } from 'react-native';
import { Text } from "../components/Themed";
import DisasterCard from '../components/DisasterCard';
import { useSelector } from "react-redux";


export default function EventFeedScreen({ navigation }) {

  const savedDisaters = useSelector((state) => state.disaster.savedDisasters);
  const { width } = Dimensions.get("window");
  let hasSaved = false;
  // check if we have any saved disasters
  if (savedDisaters.length > 0) { hasSaved = true }
  return (

    <ScrollView>
      <View>

        {
          hasSaved ?
            savedDisaters.map(function (data, index) {
              return (<DisasterCard
                key={index}
                event={data}
              />)
            }) :

            <Text style={{marginTop:30, fontSize:25, width:width  }}>
              User has no saved disasters
            </Text>


        }

      </View>
    </ScrollView>
  );
}

