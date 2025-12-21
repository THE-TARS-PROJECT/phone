// Reexport the native module. On web, it will be resolved to CallBridgeModule.web.ts
// and on native platforms to CallBridgeModule.ts
export { default } from './CallBridgeModule';
export { default as CallBridgeView } from './CallBridgeView';
export * from './CallBridge.types';
//# sourceMappingURL=index.js.map