import React from 'react';
import { Share, View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FeedScreenShare =({link}) => {
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
        <View>
            <TouchableOpacity
                style={styles.button} onPress={onShare}>
                <Text style={{fontWeight: "bold"}}> Share</Text>
            </TouchableOpacity>
        </View>
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