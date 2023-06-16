// screens/moves/MoveFormScreen.tsx

import React, { useEffect, useState } from 'react';
import {
    Button,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../navigation/navigationTypes";
import { useDispatch, useSelector } from 'react-redux';
import { createMove, updateMove } from '../../redux/actions/moveActions';
import { AppDispatch, RootState } from "../../redux/store";
import { Move } from "../../entities/Move";
import { RouteProp } from "@react-navigation/native";
import { MOVE_FORM } from "../../navigation/constants";
import { Picker } from "@react-native-community/picker";
import { ItemValue } from "@react-native-community/picker/typings/Picker";
import { MoveCategoryName } from "../../entities/MoveCategoryName";
import { TypeName } from "../../entities/TypeName";
import MultiSelect from "react-native-multiple-select";
import AlertModal from "../../components/AlertModal";
import { MOVE_ERROR } from "../../redux/constants";

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

    const [isModalVisible, setModalVisible] = useState(false);
    const [currentMultiSelect, setCurrentMultiSelect] = useState<'weakAgainst' | 'effectiveAgainst'>('weakAgainst');

    const handleOpenModal = (multiSelect: 'weakAgainst' | 'effectiveAgainst') => {
        setCurrentMultiSelect(multiSelect);
        setModalVisible(true);
    };

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
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <AlertModal
                    visible={!!error}
                    message={error || ''}
                    onClose={() => dispatch({ type: MOVE_ERROR, payload: null })}
                />
                <View style={styles.row}>
                    <Text style={styles.label}>Name: </Text>
                    <TextInput
                        value={move.name}
                        onChangeText={(text) => setMove({ ...move, name: text })}
                        style={styles.input}
                    />
                </View>
                <View style={styles.row}>
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
                </View>
                <View style={styles.row}>
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
                </View>
                <View style={styles.row}>
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
                </View>
                <View style={styles.row}>
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
                </View>
                <Text>Weak Against: {selectedWeakAgainst.join(', ')}</Text>
                <View style={styles.buttonContainer}>
                    <Button title="Select Weak Against" onPress={() => handleOpenModal('weakAgainst')}/>
                </View>
                <Text>Effective Against: {selectedEffectiveAgainst.join(', ')}</Text>
                <View style={styles.buttonContainer}>
                    <Button title="Select Effective Against" onPress={() => handleOpenModal('effectiveAgainst')}/>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Save" onPress={handleSave} color={styles.saveButton.backgroundColor}/>
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setModalVisible(!isModalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <MultiSelect
                            items={
                                Object.values(TypeName).map((value) => ({ id: value, name: value }))
                            }
                            uniqueKey="id"
                            onSelectedItemsChange={
                                (selectedItems) => handleSelectType(selectedItems, currentMultiSelect === 'weakAgainst' ? setSelectedWeakAgainst : setSelectedEffectiveAgainst, currentMultiSelect === 'weakAgainst' ? selectedEffectiveAgainst : selectedWeakAgainst)
                            }
                            selectedItems={currentMultiSelect === 'weakAgainst' ? selectedWeakAgainst : selectedEffectiveAgainst}
                            displayKey="name"
                        />
                        <Button title="Close" onPress={() => setModalVisible(false)}/>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        marginRight: 8,
    },
    input: {
        backgroundColor: '#CEC',
        borderRadius: 8,
        minHeight: 32,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 8,
        flexWrap: 'wrap',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonContainer: {
        margin: 8,
    },
    saveButton: {
        backgroundColor: '#BADA55',
    },
});

export default MoveFormScreen;
