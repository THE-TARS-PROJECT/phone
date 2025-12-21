import * as React from 'react';

import { CallBridgeViewProps } from './CallBridge.types';

export default function CallBridgeView(props: CallBridgeViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
