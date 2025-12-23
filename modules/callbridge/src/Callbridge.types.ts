import type { StyleProp, ViewStyle } from 'react-native';

export type OnLoadEventPayload = {
  url: string;
};

export type CallbridgeModuleEvents = {
  onRoleResult: (granted: RoleRequestEventPayload) => void;
  onCallStateChanged: (data: onCallStateChangeEventPayload) => void;
};

export type RoleRequestEventPayload = {
  granted: boolean
}

export type onCallStateChangeEventPayload = {
  isActive: boolean
  number: string
}

export type CallbridgeViewProps = {
  url: string;
  onLoad: (event: { nativeEvent: OnLoadEventPayload }) => void;
  style?: StyleProp<ViewStyle>;
};
