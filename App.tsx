import './global.css'
import CButton from './src/components/Button';
import { requestRole } from './src/DialerUtils';
import { Text, View, PermissionsAndroid } from 'react-native';
import { useEffect } from 'react';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';

import { BackHandler } from 'react-native';
import DialPad from './src/components/DialPad';

function App() {

  useEffect(() => {
    askPerm();
  }, [])

  const askPerm = async () => {
    let perm = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE, {
      title: "App Requires Permission",
      message: "Allow Phone State Permission",
      buttonPositive: 'Grant',
      buttonNegative: 'Deny'
    }
    )

    await requestRole();

    if (perm == PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Granted")
    }

    else {
      return (
        <View className={'flex-1 p-10 bg-black justify-center jusitfy-between items-center'}>
          <View className={'gap-16'}>
            <Text className={'text-white text-2xl'}>Permission Not Granted</Text>
            <CButton minHeight={40} minWidth={60} title={'Close App'} onPress={() => {
              BackHandler.exitApp();
            }}></CButton>
          </View>
        </View>
      )
    }
  }

  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  

  return (
    <View className={'flex-1 p-10 bg-black justify-end items-center'}>
      <DialPad />
    </View>
  );
}

export default App;
