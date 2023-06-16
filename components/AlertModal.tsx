// components/AlertModal.tsx
import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';

type AlertModalProps = {
    visible: boolean;
    message: string;
    onClose: () => void;
};

const AlertModal = ({ visible, message, onClose }: AlertModalProps) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{message}</Text>

                    <Button
                        title="Close"
                        onPress={onClose}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16
    },
    modalView: {
        margin: 16,
        backgroundColor: "white",
        borderRadius: 16,
        padding: 32,
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
    modalText: {
        marginBottom: 16,
        textAlign: "center"
    }
});

export default AlertModal;
