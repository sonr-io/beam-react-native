import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BlurView from "./BlurView";

const ios = Platform.OS === "ios";

interface Props {
  title: string;
  onClose: () => void;
}

const TransparentModal: React.FC<Props> = ({ children, title, onClose }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={[styles.transparentHeader, { height: insets.top }]} />
      <View style={styles.modalContainer}>
        <BlurView intensity={100} style={styles.blur}>
          <View style={styles.headerWithButton}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          {children}
        </BlurView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  transparentHeader: {
    width: "100%",
    backgroundColor: "transparent",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: ios ? "rgba(255, 255, 255, 0.5)" : "#FFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  blur: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },

  headerWithButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    flex: 1,
    fontSize: 28,
    lineHeight: 36,
    fontFamily: "THICCCBOI_ExtraBold",
    color: "#5E5B71",
  },
  cancelText: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: "THICCCBOI_ExtraBold",
    color: "#88849C",
  },
});

export default TransparentModal;
