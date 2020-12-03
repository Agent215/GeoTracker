import React from "react";
import { Card, CardItem, Text } from "native-base";
import { Col, Grid } from "react-native-easy-grid";
import { StyleSheet, Linking } from "react-native";
import { View } from "./Themed";
import { format, } from "date-fns/esm";

const TweetCard = (props) => {

    const _handleOpenWithWebBrowser = (link) => {
        Linking.openURL(link);
    };

    return (
        <Card>
            <CardItem header bordered>
                <Grid>
                    <Col style={{ backgroundColor: 'white' }} size={2}>
                        <View style={{ backgroundColor: 'white' }}>
                            <Text style={styles.user} >
                                User Name: {props.user}
                            </Text>
                            {props.date ? <Text style={styles.date}>
                                Date Posted: {format(new Date(props.date), "yyyy-MM-dd")}
                            </Text> : null}
                            <Text style={styles.tweets}>
                                {props.text}
                            </Text>
                            {props.url ? <Text onPress={() => _handleOpenWithWebBrowser(props.url)} style={styles.link}>
                                {props.url}
                            </Text> : null}
                        </View>
                    </Col>
                </Grid>
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
    tweets: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        padding: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    user: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        paddingLeft: 20,
        alignItems: "center",
        justifyContent: "center"
    },

    date: {
        color: 'black',
        fontSize: 20,
        paddingLeft: 20
    },
    link: {
        color: 'blue',
        fontSize: 20,
        paddingLeft: 20
    }

});

export default TweetCard;