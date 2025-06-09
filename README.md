# Bali Rakshak

**Bali Rakshak** is an AI-powered platform to help Nepali farmers diagnose crop diseases, get expert advice, and connect with the farming community. It features instant photo-based diagnosis, an AI chat assistant, and a community forum for sharing experiences and solutions.

---

## Features

- **AI Crop Disease Diagnosis:**  
  Upload a photo of your crop and get instant AI-powered diagnosis and treatment suggestions.

- **AI Assistant (Rakshak AI):**  
  Chat with an AI trained to answer farming questions, provide recommendations, and explain best practices.

- **Community Forum:**  
  Share posts, ask questions, and discuss with other farmers and agricultural experts.

- **User Authentication:**  
  Secure signup and login with JWT-based authentication.

- **Expert Tagging:**  
  Experts are highlighted in discussions and comments.

---

## Tech Stack

- **Frontend:** React (Vite), React Router, CSS Modules
- **Backend:** Node.js, Express, Prisma ORM
- **Database:** PostgreSQL
- **AI Integration:** Google Gemini API (for diagnosis and chat)
- **Authentication:** JWT (JSON Web Tokens)
- **File Uploads:** Multer (for crop images and post images)

---

## Project Structure

```
backend/
  controllers/
  db/
  middleware/
  routes/
  utils/
  app.js
  prisma/
frontend/
  src/
    Components/
      AskAi/
      CommunityPage/
      CommunityPagePosts/
      CreatePost/
      Diagnose/
      Footer/
      HomePage/
      LoginPage/
      Navbar/
      PostDetail/
      SignUpPage/
    App.jsx
    main.jsx
  public/
  index.html
```

---

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/Bali-Rakshak.git
cd Bali-Rakshak
```

### 2. Backend Setup

```bash
cd backend
npm install
```

- Create a `.env` file in `/backend` with:

  ```
  DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<dbname>"
  GEMINI_API_KEY=<your_google_gemini_api_key>
  JWT_SECRET_KEY=<your_jwt_secret>
  ```

- Setup the database:

  ```bash
  npx prisma generate
  npx prisma db push
  ```

- Start the backend server:

  ```bash
  npm start
  ```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

- Create a `.env` file in `/frontend` with:

  ```
  VITE_BACKEND_SERVER_URL=http://localhost:3000
  ```

- Start the frontend dev server:

  ```bash
  npm run dev
  ```

---

## Usage

- Visit [http://localhost:5173](http://localhost:5173) to access the app.
- Sign up or log in.
- Use the Diagnose page to upload crop images and get AI-powered results.
- Chat with Rakshak AI for farming advice.
- Visit the Community section to read, create, and comment on posts.

---

## Development Notes

- **Streaming:** Both AI diagnosis and chat responses are streamed chunk-by-chunk for a responsive UI.
- **SPA Navigation:** Uses React Router `<Link>` for client-side navigation.
- **Image Uploads:** Images are stored in the backend `/postImages` directory.
- **Security:** All post/comment creation routes require a valid JWT token.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

MIT

---

## Credits

- [Google Gemini API](https://ai.google.dev/)
- [Prisma ORM](https://www.prisma.io/)
- [React](https://react.dev/)