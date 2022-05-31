import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Props = {
  onPress: (value: string) => void;
};
export const StartNewChat = (props: Props) => {
  const ref = React.useRef<TextInput>(null);
  const [value, setValue] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>TO</Text>
      <TouchableWithoutFeedback onPress={() => ref.current?.focus()}>
        <View style={[styles.inputContainer]}>
          <TextInput
            ref={ref}
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            value={value}
            onChangeText={(value) => setValue(value)}
          />
          <Text style={styles.inputSuffix}>:matrix.sonr.network</Text>
          <TouchableOpacity onPress={() => props.onPress(value)}>
            <Text style={{ color: "#5E5B71" }}>GO</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: "THICCCBOI_Medium",
    color: "#5E5B71",
    marginRight: 8,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#B7B4C7",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  input: {
    fontSize: 16,
    fontFamily: "THICCCBOI_Medium",
    color: "#5E5B71",
  },
  inputSuffix: {
    flex: 1,
    fontSize: 16,
    fontFamily: "THICCCBOI_Medium",
    color: "#B7B4C7",
    lineHeight: 18,
  },
});
