import { requireNativeView } from 'expo';
import * as React from 'react';

import { CallBridgeViewProps } from './CallBridge.types';

const NativeView: React.ComponentType<CallBridgeViewProps> =
  requireNativeView('CallBridge');

export default function CallBridgeView(props: CallBridgeViewProps) {
  return <NativeView {...props} />;
}
