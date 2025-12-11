/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './global.css'
import CButton from './components/Button';
import { Text, View} from 'react-native';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';

function App() {

  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <View className={'flex-1 p-10 bg-black'}>
      <Text className={'text-white'}>Hello, World</Text>
      <CButton title={"Click Me"}></CButton>
    </View>
  );
}

export default App;
