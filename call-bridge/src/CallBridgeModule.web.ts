import { registerWebModule, NativeModule } from 'expo';

import { CallBridgeModuleEvents } from './CallBridge.types';

class CallBridgeModule extends NativeModule<CallBridgeModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(CallBridgeModule, 'CallBridgeModule');
