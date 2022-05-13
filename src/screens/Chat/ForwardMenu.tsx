import { StackScreenProps } from "@react-navigation/stack";
import React from "react";

import { Params } from ".";

import TransparentModal from "../../components/TransparentModal";
import UserSelector from "../../components/UserSelector";

type Props = StackScreenProps<Params, "ForwardMenu">;

const ForwardMenu: React.FC<Props> = ({ navigation }) => {
  return (
    <TransparentModal
      title="Forward"
      onClose={() => {
        navigation.goBack();
      }}
    >
      <UserSelector onPressGo={() => {}} onUserSelected={() => {}} />
    </TransparentModal>
  );
};

export default ForwardMenu;
