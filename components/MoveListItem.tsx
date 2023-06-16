// components/MoveListItem.test.ts

import { Move } from "../entities/Move";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

type MoveListItemProps = {
    move: Move;
    onPress: () => void;
    style?: ViewStyle;
};

const MoveListItem: React.FC<MoveListItemProps> = ({ move, onPress, style }) => (
    <TouchableOpacity style={[styles.listItem, style]} onPress={onPress}>
        <Text style={styles.listItemText} numberOfLines={1}
              ellipsizeMode="tail">{move.name}, {move.type.name}: {move.power}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: '#DDD',
        padding: 8,
        borderRadius: 8,
    },
    listItemText: {
        color: '#333',
        fontSize: 18,
    },
});

export default MoveListItem;
