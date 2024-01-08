import { Modal, TouchableOpacity, View, Text, Pressable } from "react-native"

interface PopUpModalProps {
    visible : boolean,
    message : string,
    agreeText : string,
    closeModal : () => void
}

export const PopUpModal = (props : PopUpModalProps) => {
    return (
        <Modal
            className="flex-1 justify-center items-center"
            animationType="fade"
            transparent={true}
            visible={props.visible}
            onRequestClose={props.closeModal}
        >
            <TouchableOpacity
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.32)',
                }}
                onPress={props.closeModal}
            >
                <View className="flex-1 justify-center items-center">
                    <View className="flex-col rounded-2xl items-center bg-white shadow-sm">
                        <Text className="text-center text-xl font-medium py-5 px-10">{props.message}</Text>
                        <View className="border-t-[0.5px] border-t-gray-100 px-20">
                            <View className="flex flex-row ">
                                <View>
                                    <Pressable onPress={props.closeModal}>
                                        <Text className="text-xl text-blue-700 text-center py-2.5">{props.agreeText}</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}