import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Dimensions } from 'react-native';
import { IconButton, Colors } from "react-native-paper";
import { Row } from 'native-base';

const { width, height } = Dimensions.get('screen');
const SCREEN_WIDTH = width;
const MODAL_HEIGHT = height / 4;

// modal to cover part of map screen. 
// contains event data
const CustomModal = (props) => {


    return (
        <View style={{ flex: 1 }}>


            <Modal
                isVisible={props.visable}
                onSwipeComplete={() => props.toggleModal()}
                swipeDirection={"down"}
                backdropOpacity={.3}
                backdropColor={'#2c2c54'}
                onBackdropPress={() => props.toggleModal()}
                swipeThreshold={50}
                propagateSwipe
                style={styles.modal}
            >

                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.title}>Title: {props.title}</Text>
                        <View style ={{flexDirection: "row"}}>
                            <IconButton
                                icon="share-variant"
                                color={Colors.white}
                                size={50}
                                onPress={() => { console.log("share button pressed on modal") }}
                            />
                            <IconButton
                                icon="content-save-outline"
                                color={Colors.white}
                                size={50}
                                onPress={() => { console.log("save button pressed on modal") }}
                            />
                        </View>

                        <Button title="Hide modal" onPress={props.toggleModal} />
                    </View >
                </ScrollView>
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