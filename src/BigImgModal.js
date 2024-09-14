import { Modal, Pressable, Image, View, TouchableOpacity } from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const ArrowButton = ({ iconName, onPress, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        justifyContent: "center",
        paddingHorizontal: 20,
        height: "100%",
      }}
    >
      <SimpleLineIcons
        name={iconName}
        size={20}
        color={disabled ? "transparent" : "black"}
      />
    </TouchableOpacity>
  );
};

export default ({
  modalVisible,
  onPressBackdrop,
  selectedImage,
  onPressLeftArrow,
  onPressRightArrow,
  showPreviousArrow,
  showNextArrow,
}) => {
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* < 화살표 */}
          <ArrowButton
            iconName="arrow-left"
            onPress={onPressLeftArrow}
            disabled={!showPreviousArrow}
          />
          {/* 이미지를 클릭해도 모달이 닫히지 않도록 Pressable로 감싸기 */}
          <Pressable>
            <Image
              source={{ uri: selectedImage?.uri }}
              style={{ width: 280, height: 280, backgroundColor: "white" }}
              resizeMode="contain"
            />
          </Pressable>
          {/* > 화살표 */}
          <ArrowButton
            iconName="arrow-right"
            onPress={onPressRightArrow}
            disabled={!showNextArrow}
          />
        </View>
      </Pressable>
    </Modal>
  );
};
