const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Game state storage (in-memory for simplicity)
const games = new Map();

// Generate a random number between 1 and 50
function generateRandomNumber() {
    return Math.floor(Math.random() * 50) + 1;
}

// Create a new game
app.post('/api/game/new', (req, res) => {
    const gameId = Date.now().toString();
    const game = {
        id: gameId,
        numberToGuess: generateRandomNumber(),
        maxAttempts: 5,
        attemptsLeft: 5,
        guesses: [],
        status: 'playing' // playing, won, lost
    };
    
    games.set(gameId, game);
    
    res.json({
        gameId: game.id,
        maxAttempts: game.maxAttempts,
        attemptsLeft: game.attemptsLeft,
        status: game.status
    });
});

// Make a guess
app.post('/api/game/:gameId/guess', (req, res) => {
    const { gameId } = req.params;
    const { guess } = req.body;
    
    const game = games.get(gameId);
    
    if (!game) {
        return res.status(404).json({ error: 'Game not found' });
    }
    
    if (game.status !== 'playing') {
        return res.status(400).json({ error: 'Game is already finished' });
    }
    
    if (typeof guess !== 'number' || guess < 1 || guess > 50) {
        return res.status(400).json({ error: 'Invalid guess. Please enter a number between 1 and 50.' });
    }
    
    game.guesses.push(guess);
    game.attemptsLeft--;
    
    let message = '';
    let hint = '';
    
    if (guess === game.numberToGuess) {
        game.status = 'won';
        message = 'Congratulations! You guessed the number!';
    } else {
        if (game.attemptsLeft === 0) {
            game.status = 'lost';
            message = `Game Over! The number was ${game.numberToGuess}.`;
        } else {
            if (guess < game.numberToGuess) {
                hint = 'too_low';
                message = 'Too low! Try again.';
            } else {
                const difference = Math.abs(guess - game.numberToGuess);
                if (difference <= 3) {
                    hint = 'very_close';
                    message = 'You are very close to the number!';
                } else {
                    hint = 'too_high';
                    message = 'Too high! Try again.';
                }
            }
        }
    }
    
    res.json({
        gameId: game.id,
        guess: guess,
        message: message,
        hint: hint,
        attemptsLeft: game.attemptsLeft,
        status: game.status,
        correctNumber: game.status !== 'playing' ? game.numberToGuess : null
    });
});

// Get game status
app.get('/api/game/:gameId', (req, res) => {
    const { gameId } = req.params;
    const game = games.get(gameId);
    
    if (!game) {
        return res.status(404).json({ error: 'Game not found' });
    }
    
    res.json({
        gameId: game.id,
        attemptsLeft: game.attemptsLeft,
        guesses: game.guesses,
        status: game.status
    });
});

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
