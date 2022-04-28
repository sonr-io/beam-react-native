import React from "react";
import { Button } from "react-native";

interface Props {
  onPress: () => void;
}

const FAB: React.FC<Props> = ({ onPress }) => {
  return <Button title="New Chat" onPress={onPress} />;
};

export { FAB };
