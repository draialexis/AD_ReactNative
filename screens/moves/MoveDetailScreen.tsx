// screens/moves/MoveDetailScreen.tsx

import React, { useEffect } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from "../../navigation/navigationTypes";
import TypeTacticsInfoList from "../../components/TypeTacticsInfoList"
import { StackNavigationProp } from "@react-navigation/stack";
import { MOVE_DETAIL, MOVE_FORM } from '../../navigation/constants';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Move } from "../../entities/Move";


type MoveDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, typeof MOVE_DETAIL>;
type MoveDetailScreenRouteProp = RouteProp<RootStackParamList, typeof MOVE_DETAIL>;

type Props = {
    navigation: MoveDetailScreenNavigationProp;
    route: MoveDetailScreenRouteProp;
};

const MoveDetailScreen = ({ navigation, route }: Props) => {
    const move =
        useSelector(
            (state: RootState) => state.move.moves.find(
                (m: Move) => m.id === route.params.move.id
            )
        );


    useEffect(() => {
        navigation.setOptions({ title: move?.name });
    }, [move]);

    return (
        <ScrollView style={styles.container}>
            <Button
                title="Edit Move"
                color={styles.updateButton.backgroundColor}
                onPress={() => navigation.navigate(MOVE_FORM, { move: move })}/>
            <Text style={styles.title}>Name: {move?.name}</Text>
            <Text style={styles.detail}>Category: {move?.category}</Text>
            <Text style={styles.detail}>Power: {move?.power}</Text>
            <Text style={styles.detail}>Accuracy: {move?.accuracy}</Text>
            <Text style={styles.detail}>Type: {move?.type.name}</Text>
            <View style={styles.typeListsContainer}>
                <TypeTacticsInfoList isWeakness={true} types={move?.type.weakAgainst || []}/>
                <TypeTacticsInfoList isWeakness={false} types={move?.type.effectiveAgainst || []}/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    updateButton: {
        backgroundColor: '#BA22DA',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detail: {
        fontSize: 18,
        marginBottom: 5,
    },
    typeListsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 10,
    },
});

export default MoveDetailScreen;
