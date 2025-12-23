import { NativeModule, requireNativeModule } from 'expo';

import { CallbridgeModuleEvents } from './Callbridge.types';

declare class CallbridgeModule extends NativeModule<CallbridgeModuleEvents> {
  isRoleHeld(): boolean;
  requestRole(): (void);
  answerCall(): (void);
  hangUpCall(): (void);
}

// This call loads the native module object from the JSI.
export default requireNativeModule<CallbridgeModule>('Callbridge');
