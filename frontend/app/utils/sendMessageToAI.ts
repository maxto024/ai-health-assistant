export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * @param profile  one of "default" | "teen" | "pregnancy" | "menopause" …
 */
export async function sendMessageToAI(
  messages: ChatMessage[],
  profile: string = 'default',        // ⬅️ NEW
  baseURL = 'http://localhost:3001'
): Promise<ChatMessage> {
  try {
    const res = await fetch(`${baseURL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, profile }),   // ⬅️ pass profile
    });

    if (!res.ok) throw new Error('AI call failed');
    return await res.json(); // { role, content }
  } catch (err) {
    console.error('AI call error:', err);
    return {
      role: 'assistant',
      content: '⚠️ Sorry, something went wrong.',
    };
  }
}
