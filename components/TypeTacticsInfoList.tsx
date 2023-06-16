// components/TypeTacticsInfoList.ts

import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type TypeListProps = {
    isWeakness: boolean;
    types: string[];
};

const TypeTacticsInfoList = ({ isWeakness, types }: TypeListProps) => {
    if (!types || types.length === 0) {
        types = ['NOTHING'];
    }

    return (
        <View style={isWeakness ? styles.weakAgainst : styles.effectiveAgainst}>
            <Text style={styles.title}>{isWeakness ? 'Weak Against' : 'Effective Against'}:</Text>
            <ScrollView>
                <View style={styles.list}>
                    {types.map((type, index) => (
                        <Text key={index} style={styles.type}>{type}</Text>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    type: {
        fontSize: 16,
        marginBottom: 5,
    },
    weakAgainst: {
        backgroundColor: '#FF6961',
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
    },
    effectiveAgainst: {
        backgroundColor: '#77DD77',
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
    },
});

export default TypeTacticsInfoList;
