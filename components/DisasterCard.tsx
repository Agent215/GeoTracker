import React from "react";
import { Card, CardItem, Text, Body } from "native-base";
import { Col, Grid } from "react-native-easy-grid";
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import * as actions from '../store/actions/actions';
// DisasterCard holds the layout to each feed card.
// The Card uses <Grid> to space objects out in header, and footer. 2/3 of header is description 1/3 is icon
const DisasterCard = (props) => {

  const dispatch = useDispatch();

  const goToDisaster =( event) => {

    dispatch(actions.setCurrentDisaster(event)) ;
  };
  
  return (
    <Card>
      <CardItem header bordered>
        <Grid>
          <Col size={2}>
            <Text>
              {props.event.description}
            </Text>
          </Col>
          <Col>
            <Image source={require('../assets/Icons/Iceberg.png')} />
          </Col>
        </Grid>
      </CardItem>
      <Body>
        <Text>
          {props.event.title}
        </Text>
      </Body>
      <CardItem footer bordered>
        <Col>
          <TouchableOpacity
            style={styles.button}>
            <Text>Share</Text>
          </TouchableOpacity>
        </Col>
        <Col>
          <TouchableOpacity
            style={styles.button}
            onPress ={ () =>goToDisaster(props.event)}
            
          >
            <Text>Go</Text>
          </TouchableOpacity>
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
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});

export default DisasterCard;