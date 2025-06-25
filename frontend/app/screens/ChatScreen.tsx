import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
} from 'react-native';

import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { sendMessageToAI, ChatMessage as MessageType } from '../utils/sendMessageToAI';
import { COLORS, SPACING } from '../theme';

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      role: 'assistant',
      content: '👋 Hi! I’m your women’s health assistant. How can I help today?',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // 🔁 Set this to dynamically control tone and behavior
  const PROFILE: 'default' | 'teen' | 'pregnancy' | 'menopause' = 'teen';

  const handleSend = useCallback(
    async (userText: string) => {
      const updatedMessages: MessageType[] = [
        ...messages,
        { role: 'user', content: userText },
      ];

      setMessages(updatedMessages);
      setIsTyping(true);

      const aiReply = await sendMessageToAI(updatedMessages, PROFILE);
      setMessages([...updatedMessages, aiReply]);
      setIsTyping(false);
    },
    [messages, PROFILE]
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <ChatMessage role={item.role} content={item.content} />
        )}
        contentContainerStyle={styles.chat}
      />
      {isTyping && <Text style={styles.typing}>Assistant is typing…</Text>}
      <ChatInput onSend={handleSend} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  chat: {
    padding: SPACING.md,
    paddingBottom: 60,
  },
  typing: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.xs,
    fontStyle: 'italic',
    color: COLORS.textMuted,
  },
});

export default ChatScreen;
