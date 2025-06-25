# 🩺 SovereignFemininity AI — Women’s Health Chat Assistant

An AI-powered mobile app that provides intelligent, compassionate women's health guidance through natural language conversation.  
Built with **React Native (Expo)** for the frontend and **OpenAI + Express** for the backend.

---

## 🗂 Project Structure

```
aichat/
├── frontend/   # Mobile app (Expo + React Native)
├── backend/    # API server (Express + OpenAI)
```

---

## ✅ Features

- 🧠 AI chat powered by GPT-4 or GPT-3.5
- 👩🏽‍⚕️ Profile-specific tone: teen, pregnancy, menopause
- 📱 Clean, modern mobile UI
- 🔐 Secure OpenAI key usage (via backend proxy)
- 🌱 Extensible prompt configuration

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/ai-health-assistant.git
cd ai-health-assistant
```

---

### 2️⃣ Frontend Setup (Expo App)

```bash
cd frontend
yarn install
yarn start
```

- Runs the app in Expo Go or Simulator
- Modify profile setting in:  
  `app/screens/ChatScreen.tsx`

```ts
const PROFILE = 'pregnancy'; // 'default', 'teen', 'menopause'
```

---

### 3️⃣ Backend Setup (OpenAI Proxy)

```bash
cd backend
yarn install
cp .env.example .env
```

Update `.env` with your OpenAI credentials:

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
OPENAI_MODEL=gpt-3.5-turbo
PORT=3001
```

Start the server:

```bash
yarn dev
```

It runs at: `http://localhost:3001`

Health check:
```bash
curl http://localhost:3001/
# → { "status": "online" }
```

---

## 🧠 Prompt Profiles

Located in: `backend/prompts/womensHealth.json`

Example profiles:

- `default`
- `teen`
- `pregnancy`
- `menopause`

Backend will inject the correct system prompt based on the `profile` sent by the frontend:

```json
{
  "messages": [...],
  "profile": "pregnancy"
}
```

If no profile is provided, it falls back to `default`.

---

## 📌 Tech Stack

| Layer     | Tech                                |
|-----------|--------------------------------------|
| Mobile    | React Native + Expo                 |
| Backend   | Express + OpenAI SDK                |
| AI Model  | GPT-3.5 or GPT-4 via OpenAI API     |
| Styling   | StyleSheet with theme tokens        |
| Routing   | expo-router                         |
| Prompting | Dynamic JSON-based system prompts   |

---

## 🛡️ License

MIT — open source and free to build upon.

---

## 👩‍💻 Maintained by

**Mohamed Elmi**  
🔗 [LinkedIn](https://www.linkedin.com/in/mohamed-elmi-hassan-55bb49104)