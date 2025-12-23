// Reexport the native module. On web, it will be resolved to CallbridgeModule.web.ts

import CallbridgeModule from './src/CallbridgeModule';

// and on native platforms to CallbridgeModule.ts
export * from './src/Callbridge.types';
export { default } from './src/CallbridgeModule';

export async function isRoleHeld(){
    return await CallbridgeModule.isRoleHeld();
}

export async function requestRole(){
    return await CallbridgeModule.requestRole();
}
