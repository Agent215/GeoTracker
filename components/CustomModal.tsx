import React, { useRef } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CustomToast from '../components/CustomToast';
import Modal from 'react-native-modal';
import { Dimensions } from 'react-native';
import * as actions from '../store/actions/actions';
import { IconButton, Colors } from "react-native-paper";
import { Row } from 'native-base';
import FeedScreenShare from './ShareFeat';
import { useDispatch, useSelector } from 'react-redux';


const { width, height } = Dimensions.get('screen');
const SCREEN_WIDTH = width;
const MODAL_HEIGHT = height / 4;

// modal to cover part of map screen. 
// contains event data
const CustomModal = (props) => {

    const dispatch = useDispatch();
    const toastRef = useRef(CustomToast.prototype);


    const onSave = (disaster) => {

        dispatch(actions.saveDisaster(disaster));
        toastRef.current.show(`EventSaved`, 500);

    }
    return (
        <View style={{ flex: 1 }}>

            <CustomToast ref={toastRef} />
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
                        <View style={{ flexDirection: "row" }}>
                            <FeedScreenShare sourceLink={props.sourceLink} color="white" size={50} />
                            <IconButton
                                icon="content-save-outline"
                                color={Colors.white}
                                size={50}
                                onPress={() => { onSave(props.disaster); console.log("save button pressed on modal") }}
                            />
                        </View>


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