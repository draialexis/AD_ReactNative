// screens/moves/MoveListScreen.tsx

import React from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../navigation/navigationTypes";
import { useDispatch, useSelector } from 'react-redux';
import { deleteMove, getMoves } from '../../redux/actions/moveActions';
import { MoveState } from "../../redux/reducers/moveReducer";
import { AppDispatch } from "../../redux/store";
import MoveListItem from "../../components/MoveListItem";
import { MOVE_DETAIL, MOVE_FORM, MOVE_LIST } from "../../navigation/constants";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import AlertModal from "../../components/AlertModal";
import { MOVE_ERROR } from "../../redux/constants";

type MoveListScreenNavigationProp = StackNavigationProp<RootStackParamList, typeof MOVE_LIST>;
type MoveListScreenRouteProp = RouteProp<RootStackParamList, typeof MOVE_LIST>;

type Props = {
    navigation: MoveListScreenNavigationProp;
    route: MoveListScreenRouteProp;
};
type RootState = {
    move: MoveState;
};

const MoveListScreen = ({ navigation }: Props) => {
    const error = useSelector((state: RootState) => state.move.error);
    const dispatch: AppDispatch = useDispatch();
    const moves = useSelector((state: RootState) => state.move.moves);

    useFocusEffect(
        React.useCallback(() => {
            const loadMoves = async () => {
                await (dispatch as AppDispatch)(getMoves());
            };
            loadMoves();
        }, [dispatch])
    );

    return (
        <>
            <AlertModal
                visible={!!error}
                message={error || ''}
                onClose={() => dispatch({ type: MOVE_ERROR, payload: null })}
            />
            <FlatList
                data={moves}
                ListHeaderComponent={
                    <Button
                        title="Add Move"
                        color={styles.addButton.backgroundColor}
                        onPress={() => navigation.navigate(MOVE_FORM, { move: undefined })}/>
                }
                renderItem={({ item }) => (
                    <View style={styles.listItemContainer}>
                        <MoveListItem
                            move={item}
                            style={styles.moveListItem}
                            onPress={() => navigation.navigate(MOVE_DETAIL, { move: item })}
                        />
                        <Button title="X"
                                color={styles.deleteButton.backgroundColor}
                                onPress={() => {
                                    if (item.id) {
                                        dispatch(deleteMove(item.id))
                                    }
                                }}/>
                    </View>
                )}
                keyExtractor={(item) => item.name}
            />
        </>
    );
};

const styles = StyleSheet.create({
    deleteButton: {
        backgroundColor: '#FF6961',
    },
    addButton: {
        backgroundColor: '#BADA55',
    },
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 8,
    },
    moveListItem: {
        flex: 1,
        marginRight: 8
    }
});

export default MoveListScreen;
