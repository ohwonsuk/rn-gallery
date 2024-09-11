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
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isDropdownOpen,
    openDropDown,
    closeDropDown,
    albums,
    selectAlumb,
  } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  };

  const onLongPressImage = (imageId) => deleteImage(imageId);
  const onPressAddAlbum = () => {
    openModal();
  };

  const onSubmitEditing = () => {
    if (!albumTitle) return;
    // 1. 앨범에 타이틀 추가
    addAlbum();
    // 2. 모달닫기 TextInput에 value 초기화
    closeModal();
    resetAlbumTitle();
  };

  const onPressBackdrop = () => closeModal();

  const onPressHeader = () => {
    if (isDropdownOpen) {
      closeDropDown();
    } else {
      openDropDown();
    }
  };

  const onPressAlbum = (album) => {
    selectAlumb(album);
    closeDropDown();
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

  // console.log("selectedAlbum", selectedAlbum);
  return (
    <SafeAreaView style={styles.container}>
      {/* 앨범 DropDown, 앨범 추가 버튼 */}
      <MyDropDownPicker
        selectedAlbum={selectedAlbum}
        onPressAddAlbum={onPressAddAlbum}
        isDropdownOpen={isDropdownOpen}
        onPressHeader={onPressHeader}
        albums={albums}
        onPressAlbum={onPressAlbum}
      />

      {/* 앨범을 추가하는 TextInputModal */}
      <TextInputModal
        modalVisible={modalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={onPressBackdrop}
      />

      {/* 이미지 리스트 */}
      <FlatList
        data={imagesWithAddButton}
        renderItem={renderItem}
        numColumns={3}
        style={{ zIndex: -1 }} //header보다 코드가 밑에 있어 헤더위에 보여지는 것을 방지
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
