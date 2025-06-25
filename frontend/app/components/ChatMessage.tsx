import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../theme';
import { ChatMessage } from '../utils/sendMessageToAI';

interface Props extends ChatMessage {}

const ChatMessageComponent: React.FC<Props> = ({ role, content }) => {
  const isUser = role === 'user';

  return (
    <View style={[styles.container, isUser ? styles.user : styles.assistant]}>
      <Text style={styles.text}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.sm,
    marginVertical: SPACING.xs,
    borderRadius: 16,
    maxWidth: '85%',
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.userBubble,
  },
  assistant: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.assistantBubble,
  },
  text: {
    fontSize: 16,
    color: COLORS.text,
  },
});

export default React.memo(ChatMessageComponent);
