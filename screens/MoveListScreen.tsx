import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from "../navigation/navigationTypes";
import {Move} from "../entities/Move";

type MoveListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MoveList'>;

type Props = {
    navigation: MoveListScreenNavigationProp;
};

const MoveListScreen = ({navigation}: Props) => {
    const [moves, setMoves] = useState<Move[]>([]);

    // FIXME LATER use a redux store to fetch the data
    useEffect(() => {
        fetch('http://localhost:8080/move')
            .then(response => response.json())
            .then(data => setMoves(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <ScrollView>
            <View>
                <FlatList
                    data={moves}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => navigation.navigate('MoveDetail', {move: item})}>
                            <Text>{item.name}, {item.type.name}: {item.power}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.name}
                />
            </View>
        </ScrollView>
    );
};

export default MoveListScreen;
