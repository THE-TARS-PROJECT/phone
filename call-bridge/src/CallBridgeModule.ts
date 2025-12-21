import { NativeModule, requireNativeModule } from 'expo';

import { CallBridgeModuleEvents } from './CallBridge.types';

declare class CallBridgeModule extends NativeModule<CallBridgeModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<CallBridgeModule>('CallBridge');
