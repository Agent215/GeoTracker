import React, { useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";

export const CustomAlert = (alertText, alertType) =>{

    Alert.alert(
        alertType,
        alertText,
        [
         
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
}
  