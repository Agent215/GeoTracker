import React from "react";
import { Card, CardItem, Text, Body } from "native-base";
import { Col, Grid } from "react-native-easy-grid";
import { useDispatch } from 'react-redux';
import { StyleSheet, Image, Share } from "react-native";
import * as actions from '../store/actions/actions';
import { useNavigation } from '@react-navigation/native';
import FeedScreenShare from '../components/ShareFeat';
import { IconButton } from "react-native-paper";
import DisasterIcon from '../components/CustomIcon';
import { accessibilityProps } from "react-native-paper/lib/typescript/src/components/MaterialCommunityIcon";
import { TouchableOpacity } from "react-native-gesture-handler";

// DisasterCard holds the layout to each feed card.
// The Card uses <Grid> to space objects out in header, and footer. 2/3 of header is description 1/3 is icon
const DisasterCard = (props) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const goToDisaster = (event) => {
    //set current disaster in store
    console.log(event.title)
    console.log(event.currentLat)
    console.log(event.currentLong)
    dispatch(actions.setCurrentDisaster(event));
    navigation.navigate("Map");
  };

  return (
    <Card>
      <CardItem header bordered>
        <Grid>
          <Col size={2}>
            <Text style={{ fontSize: 25 }}>
              {props.event.title}
            </Text>
          </Col>
          <Col style={styles.iconStyle}>
            <DisasterIcon 
              size={50}
              event={props.event}
            />
          </Col>
        </Grid>
      </CardItem>
      <CardItem footer>
        <Col>
          <FeedScreenShare sourceLink={props.event.sourceLink} color="black" size={50} />
          <Text style={styles.share}>Share</Text>
        </Col>
        <Col>

          <IconButton
            icon="crosshairs-gps"
            color={"black"}
            size={50}

            onPress={() => goToDisaster(props.event)}
          />
          <Text style={styles.go}>Go</Text>

        </Col>
        <Col>
          <TouchableOpacity
          onPress={() => { 
            dispatch(actions.unSaveDisaster(props.event));
          console.log("you are at line 71 of DisasterCard"); 
        }}
          >
            <IconButton
              icon="trash-can"
              color={"black"}
              size={50}
              
            />
          </TouchableOpacity>
          <Text style={styles.remove}>Remove</Text>
        </Col>
      </CardItem>
    </Card>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 0,
    margin: 0
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  },
  share: {
    marginLeft: 25
  },
  go: {
    marginLeft: 33
  },
  remove: {
    marginLeft: 13
  },
  iconStyle: {
    marginLeft: 60,
    marginTop: 5
  
  }
});

export default DisasterCard;