// screens/moves/MoveFormScreen.tsx

import React, { useEffect, useState }          from 'react';
import { Button, StyleSheet, Text, TextInput } from 'react-native';
import { StackNavigationProp }                 from '@react-navigation/stack';
import { RootStackParamList }                  from "../../navigation/navigationTypes";
import { useDispatch, useSelector }            from 'react-redux';
import { createMove, updateMove }              from '../../redux/actions/moveActions';
import { AppDispatch, RootState }              from "../../redux/store";
import { Move }                                from "../../entities/Move";
import { RouteProp }                           from "@react-navigation/native";
import { MOVE_FORM }                           from "../../navigation/constants";
import { Picker }                              from "@react-native-community/picker";
import { ItemValue }                           from "@react-native-community/picker/typings/Picker";
import { MoveCategoryName }                    from "../../entities/MoveCategoryName";
import { TypeName }                            from "../../entities/TypeName";
import MultiSelect                             from "react-native-multiple-select";
import { KeyboardAwareScrollView }             from "react-native-keyboard-aware-scroll-view";
import AlertModal                              from "../../components/AlertModal";
import { MOVE_ERROR }                          from "../../redux/constants";

type MoveFormScreenNavigationProp = StackNavigationProp<RootStackParamList, typeof MOVE_FORM>;
type MoveFormScreenRouteProp = RouteProp<RootStackParamList, typeof MOVE_FORM>;

type Props = {
    navigation: MoveFormScreenNavigationProp;
    route: MoveFormScreenRouteProp
};

const MoveFormScreen = ({ navigation, route }: Props) => {
    const error = useSelector((state: RootState) => state.move.error);
    const dispatch = useDispatch();
    const [move, setMove] = useState<Move>(route.params?.move || {
        id: null,
        name: '',
        category: MoveCategoryName.PHYSICAL,
        power: 0,
        accuracy: 0,
        type: {
            name: TypeName.NORMAL,
            weakAgainst: [],
            effectiveAgainst: [],
        },
        schemaVersion: 2
    });

    useEffect(() => {
        navigation.setOptions({
            title: route.params?.move ? route.params.move.name : 'New move',
        });
    }, [navigation, route.params?.move]);

    const [selectedWeakAgainst, setSelectedWeakAgainst] = useState<string[]>(move.type.weakAgainst);
    const [selectedEffectiveAgainst, setSelectedEffectiveAgainst] = useState<string[]>(move.type.effectiveAgainst);

    const handleSelectType = (selectedTypes: string[], setTypes: React.Dispatch<React.SetStateAction<string[]>>, otherSelectedTypes: string[]) => {
        const uniqueSelectedTypes = Array.from(new Set(selectedTypes));
        const withoutDuplicatesFromOtherColumn = uniqueSelectedTypes.filter(type => !otherSelectedTypes.includes(type));
        setTypes(withoutDuplicatesFromOtherColumn);
    };

    const handleSave = () => {
        if (route.params?.move) {
            (dispatch as AppDispatch)(updateMove(route.params.move.id!, {
                ...move,
                type: { ...move.type, weakAgainst: selectedWeakAgainst, effectiveAgainst: selectedEffectiveAgainst }
            }));
        }
        else {
            (dispatch as AppDispatch)(createMove({
                ...move,
                type: { ...move.type, weakAgainst: selectedWeakAgainst, effectiveAgainst: selectedEffectiveAgainst }
            }));
        }
        navigation.goBack();
    };

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <AlertModal
                visible={!!error}
                message={error || ''}
                onClose={() => dispatch({ type: MOVE_ERROR, payload: null })}
            />
            <Text style={styles.label}>Name: </Text>
            <TextInput
                value={move.name}
                onChangeText={(text) => setMove({ ...move, name: text })}
                style={styles.input}
            />
            <Text style={styles.label}>Category: </Text>
            <Picker
                selectedValue={move.category}
                style={styles.input}
                onValueChange={(itemValue: ItemValue) =>
                    setMove({ ...move, category: itemValue as MoveCategoryName })
                }>
                {Object.values(MoveCategoryName).map((value) =>
                    <Picker.Item key={value} label={value} value={value}/>
                )}
            </Picker>
            <Text style={styles.label}>Power: </Text>
            <TextInput
                value={move.power.toString()}
                onChangeText={(text) => {
                    if (!isNaN(Number(text))) {
                        setMove({ ...move, power: Number(text) });
                    }
                }}
                style={styles.input}
                keyboardType="numeric"
            />
            <Text style={styles.label}>Accuracy: </Text>
            <TextInput
                value={move.accuracy.toString()}
                onChangeText={(text) => {
                    if (!isNaN(Number(text))) {
                        setMove({ ...move, accuracy: Number(text) });
                    }
                }}
                style={styles.input}
                keyboardType="numeric"
            />
            <Text style={styles.label}>Type: </Text>
            <Picker
                selectedValue={move.type.name}
                style={styles.input}
                onValueChange={(itemValue: ItemValue) =>
                    setMove({ ...move, type: { ...move.type, name: itemValue as TypeName } })
                }>
                {Object.values(TypeName).map((value) =>
                    <Picker.Item key={value} label={value} value={value}/>
                )}
            </Picker>
            <Text style={styles.label}>Weak Against: </Text>
            <MultiSelect
                items={
                    Object.values(TypeName).map((value) => ({ id: value, name: value }))
                }
                uniqueKey="id"
                onSelectedItemsChange={
                    (selectedItems) => handleSelectType(selectedItems, setSelectedWeakAgainst, selectedEffectiveAgainst)
                }
                selectedItems={selectedWeakAgainst}
                displayKey="name"
            />
            <Text style={styles.label}>Effective Against: </Text>
            <MultiSelect
                items={
                    Object.values(TypeName).map((value) => ({ id: value, name: value }))
                }
                uniqueKey="id"
                onSelectedItemsChange={
                    (selectedItems) => handleSelectType(selectedItems, setSelectedEffectiveAgainst, selectedWeakAgainst)
                }
                selectedItems={selectedEffectiveAgainst}
                displayKey="name"
            />
            <Button title="Save" onPress={handleSave}/>

        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        backgroundColor: '#CEC',
        borderRadius: 8,
        height: 32,
    },
    label: {
        margin: 8,
    }
});

export default MoveFormScreen;
