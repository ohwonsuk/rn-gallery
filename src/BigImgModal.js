import { Modal, Pressable, Image } from "react-native";

export default ({ modalVisible, onPressBackdrop, selectedImage }) => {
  console.log("selectedImage", selectedImage);
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <Pressable
        onPress={onPressBackdrop}
        style={{
          flex: 1,
          // backgroundColor: "lightblue",
          // opacity: 0.5,
          backgroundColor: `rgba(115,115,115,0.5)`,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 이미지를 클릭해도 모달이 닫히지 않도록 Pressable로 감싸기 */}
        <Pressable>
          <Image
            source={{ uri: selectedImage?.uri }}
            style={{ width: 280, height: 280, backgroundColor: "white" }}
            resizeMode="contain"
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};
