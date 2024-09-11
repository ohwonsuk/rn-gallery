import { View, Text, TouchableOpacity } from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const headerHeight = 50;

export default ({
  onPressAddAlbum,
  isDropdownOpen,
  onPressHeader,
  albums,
  onPressAlbum,
  selectedAlbum,
  onLongPressAlbum,
}) => {
  // console.log("drop_selectedAlbum", selectedAlbum);
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressHeader}
        style={{
          height: headerHeight,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{selectedAlbum.title}</Text>
        <SimpleLineIcons
          name={isDropdownOpen ? "arrow-up" : "arrow-down"}
          size={12}
          color="black"
          style={{ marginLeft: 8 }}
        />
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
      </TouchableOpacity>
      {isDropdownOpen && (
        <View
          style={{
            position: "absolute",
            top: headerHeight,
            width: "100%",
            height: 100,
            borderTopColor: "lightgrey",
            borderTopWidth: 0.5,
            borderBottomColor: "lightgrey",
            borderBottomWidth: 0.5,
          }}
        >
          {albums.map((album, index) => {
            const isSelectedAlbum = album.id === selectedAlbum.id;
            return (
              <TouchableOpacity
                key={`album-${index}`}
                activeOpacity={1}
                style={{
                  paddingVertical: 12,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                }}
                onPress={() => onPressAlbum(album)}
                onLongPress={() => onLongPressAlbum(album.id)}
              >
                <Text
                  style={{ fontWeight: isSelectedAlbum ? "bold" : undefined }}
                >
                  {album.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};
