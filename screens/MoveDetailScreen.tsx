import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from "../navigation/navigationTypes";
import TypeTacticsInfoList from "../components/TypeTacticsInfoList"

type MoveDetailScreenRouteProp = RouteProp<RootStackParamList, 'MoveDetail'>;

type Props = {
    route: MoveDetailScreenRouteProp;
};

const MoveDetailScreen = ({route}: Props) => {
    const {move} = route.params;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{move.name}</Text>
            <Text>Name: {move.name}</Text>
            <Text>Category: {move.category}</Text>
            <Text>Power: {move.power}</Text>
            <Text>Accuracy: {move.accuracy}</Text>
            <Text>Type: {move.type.name}</Text>
            <View style={styles.typeListsContainer}>
                <TypeTacticsInfoList isWeakness={true} types={move.type.weakAgainst}/>
                <TypeTacticsInfoList isWeakness={false} types={move.type.effectiveAgainst}/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    list: {
        backgroundColor: '#F0F0F0',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    typeListsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default MoveDetailScreen;
