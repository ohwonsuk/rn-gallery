import {
  StyleSheet,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useGallery } from "./src/use-gallery";
import MyDropDownPicker from "./src/MyDropDownPicker";
import TextInputModal from "./src/TextInputModal";

const width = Dimensions.get("screen").width;
const columnSize = width / 3;

export default function App() {
  const {
    imagesWithAddButton,
    pickImage,
    deleteImage,
    selectedAlbum,
    modalVisible,
    openModal,
    closeModal,
  } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  };

  const onLongPressImage = (imageId) => deleteImage(imageId);
  const onPressAddAlbum = () => {
    openModal();
  };

  const renderItem = ({ item: { id, uri }, index }) => {
    if (id === -1) {
      return (
        <TouchableOpacity onPress={onPressOpenGallery} style={styles.button}>
          <Text style={{ fontWeight: "100", fontSize: 50 }}>+</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onLongPress={() => onLongPressImage(id)}>
        <Image source={{ uri }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 앨범 DropDown, 앨범 추가 버튼 */}
      <MyDropDownPicker
        selectedAlbumTitle={selectedAlbum.title}
        onPressAddAlbum={onPressAddAlbum}
      />

      {/* 앨범을 추가하는 TextInputModal */}
      <TextInputModal modalVisible={modalVisible} />

      {/* 이미지 리스트 */}
      <FlatList
        data={imagesWithAddButton}
        renderItem={renderItem}
        numColumns={3}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: Platform.OS === "android" ? 40 : 0,
  },
  image: {
    width: columnSize,
    height: columnSize,
  },
  button: {
    width: columnSize,
    height: columnSize,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
  },
});
