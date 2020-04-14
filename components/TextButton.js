import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {purple} from "../utils/colors";

function TextButton({children, onPress, style}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.reset, style]}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    reset: {
        textAlign: "center",
        color: purple
    }
});

export default TextButton;
