import React from "react";
import {StyleSheet, View, Text, ScrollView} from "react-native";

type TypeListProps = {
    isWeakness: boolean;
    types: string[];
};

const TypeTacticsInfoList = ({isWeakness, types}: TypeListProps) => {
    if (!types || types.length === 0) {
        types = ['Nothing'];
    }

    return (
        <ScrollView style={isWeakness ? styles.weakAgainst : styles.effectiveAgainst}>
            <View style={styles.list}>
                <Text>{isWeakness ? 'weak against' : 'effective against'}:</Text>
                {types.map((type, index) => (
                    <Text key={index}>{type}</Text>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    list: {
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    weakAgainst: {
        backgroundColor: '#FF6961',
    },
    effectiveAgainst: {
        backgroundColor: '#77DD77',
    },
});

export default TypeTacticsInfoList;
