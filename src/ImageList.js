import {
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  FlatList,
  StyleSheet,
} from "react-native";

const width = Dimensions.get("screen").width;
const minColumnSize = width >= 500 ? 200 : 130;
const divisor = width / minColumnSize;
const numColumns = Math.floor(divisor);
const columnSize = width / numColumns;

console.log("divisor", divisor);

export default ({
  imagesWithAddButton,
  onPressOpenGallery,
  onPressImage,
  onLongPressImage,
}) => {
  const renderItem = ({ item: image, index }) => {
    const { id, uri } = image;
    if (id === -1) {
      return (
        <TouchableOpacity onPress={onPressOpenGallery} style={styles.button}>
          <Text style={{ fontWeight: "100", fontSize: 50 }}>+</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => onPressImage(image)}
        onLongPress={() => onLongPressImage(id)}
      >
        <Image source={{ uri }} style={styles.image} />
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={imagesWithAddButton}
      renderItem={renderItem}
      numColumns={numColumns}
      style={{ zIndex: -1 }} //header보다 코드가 밑에 있어 헤더위에 보여지는 것을 방지
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: columnSize,
    height: columnSize,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: columnSize,
    height: columnSize,
  },
});
