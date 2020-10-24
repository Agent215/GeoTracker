import React from 'react';
import { Share, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { IconButton, Colors } from "react-native-paper";

const FeedScreenShare = ({ link , size, color }) => {
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: link,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
       
            <IconButton
                style ={{justifyContent: "center"}}
                icon="share-variant"
                color={color}
                size={size}
                onPress={() => onShare()}
            />
        
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
        padding: 11.9
    },
    countContainer: {
        alignItems: "center",
        padding: 10
    }
});

export default FeedScreenShare;