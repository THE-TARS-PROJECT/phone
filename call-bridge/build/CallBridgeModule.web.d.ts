import { NativeModule } from 'expo';
import { CallBridgeModuleEvents } from './CallBridge.types';
declare class CallBridgeModule extends NativeModule<CallBridgeModuleEvents> {
    PI: number;
    setValueAsync(value: string): Promise<void>;
    hello(): string;
}
declare const _default: typeof CallBridgeModule;
export default _default;
//# sourceMappingURL=CallBridgeModule.web.d.ts.map