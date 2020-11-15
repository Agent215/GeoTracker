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
const MODAL_HEIGHT = height / 4;

// modal to cover part of map screen. 
// contains event data
const CustomModal = (props) => {



    const dispatch = useDispatch();
    const toastRef = useRef(CustomToast.prototype);
    let hasTweets = false;

    const onSave = (disaster) => {

        dispatch(actions.saveDisaster(disaster));
        toastRef.current.show(`EventSaved`, 500);

    }

    const checkTweets = () => {
        if ((props.tweets.response_size != 0) && (props.tweets.response_size != undefined)) { hasTweets = true }


    }

    return (
        <View style={{ flex: 1 }}>
            {console.log(props.tweets)}
            {console.log("passed tweets")}
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
                    <Text style={styles.title}>Title: {props.title}</Text>
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


                        {hasTweets ?
                            props.tweets.tweets.map((tweet) => {
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