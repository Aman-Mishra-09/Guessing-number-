# 🎯 Number Guessing Game - Full Stack Application

A full-stack web application for a number guessing game where the player tries to guess a randomly generated number between 1 and 50 within 5 attempts.

## 📋 Features

- **Modern Web Interface**: Clean, responsive design with gradient background
- **REST API Backend**: Node.js/Express server handling game logic
- **Real-time Feedback**: Instant hints (too high, too low, very close)
- **Attempt Tracking**: Visual display of remaining attempts
- **Guess History**: See all your previous guesses
- **Game Session Management**: Multiple games can be played
- **Original Console Version**: Java command-line implementation included

## 🏗️ Architecture

### Backend (Node.js + Express)
- RESTful API endpoints for game operations
- In-memory game state management
- CORS enabled for frontend communication

### Frontend (HTML + CSS + JavaScript)
- Modern, responsive UI
- Vanilla JavaScript (no frameworks needed)
- Real-time API communication using Fetch API

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Aman-Mishra-09/Guessing-number-.git
cd Guessing-number-
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 🎮 How to Play

1. Click "Start New Game" to begin
2. Enter a number between 1 and 50
3. Click "Guess" or press Enter
4. Follow the hints:
   - **Too Low**: Your guess is lower than the target
   - **Too High**: Your guess is higher than the target
   - **Very Close**: You're within 3 numbers of the target
5. You have 5 attempts to guess correctly
6. Win by guessing the correct number or lose when attempts run out

## 📡 API Endpoints

### Create New Game
```
POST /api/game/new
Response: { gameId, maxAttempts, attemptsLeft, status }
```

### Make a Guess
```
POST /api/game/:gameId/guess
Body: { guess: number }
Response: { gameId, guess, message, hint, attemptsLeft, status, correctNumber }
```

### Get Game Status
```
GET /api/game/:gameId
Response: { gameId, attemptsLeft, guesses, status }
```

## 🎨 Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with gradients and animations
- **API Communication**: Fetch API

## 📂 Project Structure

```
Guessing-number-/
├── public/
│   ├── index.html          # Frontend HTML
│   ├── styles.css          # Styling
│   └── app.js              # Frontend JavaScript
├── server.js               # Backend API server
├── NumberGuessingGame.java # Original console version
├── NumberGuessingGame.class # Compiled Java class
├── package.json            # Node.js dependencies
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🔧 Development

### Running the Java Console Version

If you want to try the original console version:

```bash
javac NumberGuessingGame.java
java NumberGuessingGame
```

## 🌟 Future Enhancements

- Difficulty levels (easy, medium, hard)
- Leaderboard with best scores
- Multiplayer mode
- Database persistence
- User authentication
- Sound effects and animations

## 📝 License

ISC

## 👤 Author

Aman Mishra

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
