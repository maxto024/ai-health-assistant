import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { COLORS, SPACING } from '../theme';

interface Props {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<Props> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = useCallback(() => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  }, [text, onSend]);

  return (
    <View style={styles.wrapper}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type a symptom or question…"
        placeholderTextColor={COLORS.textMuted}
        style={styles.input}
        multiline
      />
      <TouchableOpacity
        style={[styles.button, !text.trim() && styles.buttonDisabled]}
        onPress={handleSend}
        disabled={!text.trim()}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    padding: SPACING.sm,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 20,
    fontSize: 16,
    maxHeight: 120,
  },
  button: {
    marginLeft: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  buttonDisabled: {
    backgroundColor: COLORS.primaryDark,
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});

export default React.memo(ChatInput);
