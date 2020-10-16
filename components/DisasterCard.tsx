import React, { Component, useState, createContext } from "react";
import { Container, Header, Content, Card, CardItem, Text, Body, Footer } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from 'react-native-elements'



const DisasterCard = (event) => {
  console.log(event.title);
  console.log(event.description);
  return (
    <Card>
      <CardItem header bordered>
        <Grid>
          <Col size={2}>
            <Text>
              {event.title}
                  </Text>
          </Col>
          <Col>
            <Icon
              name='rowing' />
          </Col>
        </Grid>
      </CardItem>
      <Body>
        {event.description}
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
            style={styles.button}>
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