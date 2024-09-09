import { View, Text, TouchableOpacity } from "react-native";

const headerHeight = 50;

export default ({ selectedAlbumTitle, onPressAddAlbum }) => {
  return (
    <View
      style={{
        height: headerHeight,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{selectedAlbumTitle}</Text>
      <TouchableOpacity
        onPress={onPressAddAlbum}
        style={{
          position: "absolute",
          right: 0,
          height: headerHeight,
          paddingHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 12 }}>앨범추가</Text>
      </TouchableOpacity>
    </View>
  );
};
