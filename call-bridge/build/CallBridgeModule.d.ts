import { NativeModule } from 'expo';
import { CallBridgeModuleEvents } from './CallBridge.types';
declare class CallBridgeModule extends NativeModule<CallBridgeModuleEvents> {
    PI: number;
    hello(): string;
    setValueAsync(value: string): Promise<void>;
}
declare const _default: CallBridgeModule;
export default _default;
//# sourceMappingURL=CallBridgeModule.d.ts.map