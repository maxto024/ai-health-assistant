import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ChatScreen from './app/screens/ChatScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <ChatScreen />
    </SafeAreaProvider>
  );
}
