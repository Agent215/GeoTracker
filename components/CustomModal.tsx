import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CustomToast from '../components/CustomToast';
import Modal from 'react-native-modal';
import { Dimensions } from 'react-native';
import * as actions from '../store/actions/actions';
import { IconButton, Colors } from "react-native-paper";
import { Row } from 'native-base';
import FeedScreenShare from './ShareFeat';
import { useDispatch, useSelector } from 'react-redux';
import useTwitterTweetsResults from "../hooks/useTwitterTweetsResult";


const { width, height } = Dimensions.get('screen');
const SCREEN_WIDTH = width;
const MODAL_HEIGHT = height / 2;


// modal to cover part of map screen. 
// contains event data
const CustomModal = (props) => {
    let properDate = new Date(props.startDate)
    const dispatch = useDispatch();
    const toastRef = useRef(CustomToast.prototype);
    let hasTweets = false;
    const currentDisaster = useSelector((state) => state.disaster.currentDisaster);
    const [tweetApi, tweetResults, tweetErrorMessage] = useTwitterTweetsResults();
    let [tweets, setTweets] = useState([]);
    const onSave = (disaster) => {

        dispatch(actions.saveDisaster(disaster));
        toastRef.current.show(`EventSaved`, 500);

    }

    const checkTweets = () => {
        if ((tweets.response_size != 0) && (tweets.response_size != undefined)) { hasTweets = true }
    }
    const runTweetsApi = () => {
        try {
            tweetApi(
                currentDisaster.title,
                currentDisaster.currentLat,
                currentDisaster.currentLong,
                400
            );
        } catch (err) {

            alert(err + " " + tweetErrorMessage)
        }
    }

    useEffect(() => {
        if (tweetResults != undefined) {

            if (tweetResults[0] = undefined) {
                tweetResults.shift();

            }
            setTweets(tweetResults);
        }
    }, [tweetResults]);

    useEffect(() => {
        if (currentDisaster != "") {

            runTweetsApi();
        }
    }, [currentDisaster.title, dispatch]);



    return (
        <View style={{ flex: 1 }}>

            {checkTweets()}
            <CustomToast ref={toastRef} />
            <Modal
                isVisible={props.visable}
                onSwipeComplete={() => props.toggleModal()}
                backdropOpacity={.3}
                backdropColor={'#2c2c54'}
                onBackdropPress={() => props.toggleModal()}
                propagateSwipe={true}
                style={styles.modal}
            >


                <View style={styles.container}>
                    <Text 
                        adjustsFontSizeToFit
                        numberOfLines={3}
                        style={styles.title}>Title: {props.title}</Text>
                    <ScrollView>
                        <View style={{ flexDirection: "row" }}>
                            <FeedScreenShare sourceLink={props.sourceLink} color="white" size={50} />
                            <IconButton
                                icon="content-save-outline"
                                color={Colors.white}
                                size={50}
                                onPress={() => { onSave(props.disaster); console.log("save button pressed on modal") }}
                            />
                        </View>

                        <Text style={styles.title}> Start Date: {properDate.toDateString()}</Text>
                        {hasTweets ?
                            tweets.tweets.map((tweet) => {
                                return (
                                    <View>
                                        <Text style={styles.user} >

                                            {tweet.user}
                                        </Text>
                                        <Text style={styles.tweets}>

                                            {tweet.text}
                                        </Text>
                                    </View>
                                )
                            }) : <Text style={styles.title}>

                                No tweets found for this disaster
                            </Text>

                        }
                    </ScrollView>
                </View >

            </Modal>

        </View>
    );

}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 100,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH,
        height: MODAL_HEIGHT,
        padding: 10
    },
    title: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        padding: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    tweets: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        padding: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    user: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        padding: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    modal: {
        flex: 1,
        marginTop: height / 2,
        marginLeft: 0,
        marginRight: 0,


    }
    ,
    eventData: {
        color: 'white',
        fontSize: 20
    }
});

export default CustomModal; 