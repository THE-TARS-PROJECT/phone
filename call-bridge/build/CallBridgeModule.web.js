import { registerWebModule, NativeModule } from 'expo';
class CallBridgeModule extends NativeModule {
    PI = Math.PI;
    async setValueAsync(value) {
        this.emit('onChange', { value });
    }
    hello() {
        return 'Hello world! 👋';
    }
}
export default registerWebModule(CallBridgeModule, 'CallBridgeModule');
//# sourceMappingURL=CallBridgeModule.web.js.map